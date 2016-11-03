import * as d3 from "d3"

export default class SeasonsSeries {
    constructor ({ 
        root, 
        hub,
        rowsLabels,
        columnsLabels,
    }) {
        this.svg = d3.select(root)
        this.hub = hub

        this.margin = { top: 50, right: 0, bottom: 50, left: 60 }
        
        this.rowsLabels = rowsLabels || []
        this.columnsLabels = columnsLabels || []
        
        this.colors = d3.scaleLinear()
            .range(["#fff", "#656565"])
            .interpolate(d3.interpolateHcl)

        // this.colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"] // alternatively colorbrewer.YlGnBu[9]

        this.focus = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        this.matrix = this.focus.append("g").attr("class", "matrix")
        this.background = this.matrix.append("rect")
            .attr("class", "background")
    }

    update ({ 
        data,
        columnsLabels,
        rowsLabels,
        gridSize,
        eventHandlers,
        smoothTransitions,
        sizes,
     }) {
        this.data = data

        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom
        
        this.rowsLabels = rowsLabels || this.rowsLabels
        this.columnsLabels = columnsLabels || this.columnsLabels

        this.gridSize = gridSize
        this.legendElementWidth = this.gridSize * 2
        this.buckets = 9

        this.background
            .attr("width", sizes.width * this.gridSize)
            .attr("height", sizes.height * this.gridSize)

        this.eventHandlers = eventHandlers

        this.smoothTransitions = smoothTransitions

        this.updateWithData()
    }

    updateWithData () {

        const min = d3.min(this.data, d => d.value)
        const max = d3.max(this.data, d => d.value)
        if (min < 0 || max == 0) {
            this.colors.domain([
                d3.max(this.data, d => d.value),
                d3.min(this.data, d => d.value),
            ])
        } else if (max > 0 || min == 0) {
            this.colors.domain([
                d3.min(this.data, d => d.value),
                d3.max(this.data, d => d.value),
            ])
        }

        // this.focus.selectAll(".yLabel").text(d => d)

        this.dayLabels = this.focus.selectAll(".yLabel")
            .data(this.rowsLabels)
        
        this.dayLabels.enter().append("text")
            .merge(this.dayLabels)
            .text(d => d)
            .attr("x", 0)
            .attr("y", (d, i) => i * this.gridSize)
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + this.gridSize / 1.5 + ")")
            .attr("class", (d, i) => "yLabel mono axis y" + i)

        this.dayLabels.exit().remove()

        // this.focus.selectAll(".xLabel").text(d => d)

        this.timeLabels = this.focus.selectAll(".xLabel")
            .data(this.columnsLabels)
        
        this.timeLabels.enter().append("text")
            .merge(this.timeLabels)
            .text(d => d)
            .attr("x", (d, i) => i * this.gridSize)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + this.gridSize / 2 + ", -6)")
            .attr("class", (d, i) => "xLabel mono axis x" + i)

        this.timeLabels.exit().remove()

        

        this.cards = this.matrix.selectAll(".card").data(this.data, d => d.x + ':' + d.y)
        
        if (this.smoothTransitions) {
            this.cards.exit().transition('fill').duration((d, i) => {
                return 200 * ((Math.abs(d.value) - Math.abs(min)) / Math.abs(min))
            }).style("fill", '#fff').remove()
        } else {
            this.cards.exit().interrupt().remove()
        }

        this.enteredCards = this.cards.enter().append("rect")
            .style("fill", '#fff')
            .style("stroke", '#fff')
            .on("mouseover", d => {
                this.eventHandlers.onMouseOver(d)
            })
            .merge(this.cards)
            .attr("rx", 4)
            .attr("ry", 4)

        this.background.on("mouseleave", d => {
                this.eventHandlers.onMouseOut()
            })

        this.enteredCards.transition('position:size').duration(300)
            .attr("x", d => d.x * this.gridSize + (d.state && d.state.active ? 5 : 0))
            .attr("y", d => d.y * this.gridSize + (d.state && d.state.active ? 5 : 0))
            .attr("width", d => this.gridSize + (d.state && d.state.active ? -10 : 0))
            .attr("height", d => this.gridSize + (d.state && d.state.active ? -10 : 0))
            .attr("class", "card bordered")

        if (this.smoothTransitions) {
            this.enteredCards
                .transition('fill').duration((d, i) => {
                    return 500 * (1 - (Math.abs(d.value) - Math.abs(min)) / Math.abs(min))
                }).style("fill", d => this.colors(d.value))

        } else {
            this.enteredCards
                .interrupt('fill')
                .style("fill", d => this.colors(d.value))
        }

        // this.cards.select("title").text(d => d.value)

        // var legend = svg.selectAll(".legend")
        // .data([0].concat(colorScale.quantiles()), function(d) { return d; });

        // legend.enter().append("g")
        // .attr("class", "legend");

        // legend.append("rect")
        // .attr("x", function(d, i) { return legendElementWidth * i; })
        // .attr("y", height)
        // .attr("width", legendElementWidth)
        // .attr("height", gridSize / 2)
        // .style("fill", function(d, i) { return colors[i]; });

        // legend.append("text")
        // .attr("class", "mono")
        // .text(function(d) { return "≥ " + Math.round(d); })
        // .attr("x", function(d, i) { return legendElementWidth * i; })
        // .attr("y", height + gridSize);

        // legend.exit().remove();
    }
}