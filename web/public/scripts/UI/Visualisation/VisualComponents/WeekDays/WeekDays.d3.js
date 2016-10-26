import * as d3 from "d3"

export default class WeekDays {
    constructor (root, hub) {
        this.svg = d3.select(root)
        this.hub = hub

        this.margin = { top: 50, right: 0, bottom: 100, left: 30 }
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom
        
        this.gridSize = Math.floor(this.width / 24)
        this.legendElementWidth = this.gridSize * 2
        this.buckets = 9
        
        this.colors = d3.scaleLinear()
            .range(["#2c7bb6", "#d7191c"])
            .interpolate(d3.interpolateHcl)

        // this.colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"] // alternatively colorbrewer.YlGnBu[9]
        this.days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
        this.times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"]

        this.focus = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

        this.dayLabels = this.focus.selectAll(".dayLabel")
            .data(this.days)
            .enter().append("text")
            .text(d => d)
            .attr("x", 0)
            .attr("y", (d, i) => i * this.gridSize)
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + this.gridSize / 1.5 + ")")
            .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"))

        this.timeLabels = this.focus.selectAll(".timeLabel")
            .data(this.times)
            .enter().append("text")
            .text(d => d)
            .attr("x", (d, i) => i * this.gridSize)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + this.gridSize / 2 + ", -6)")
            .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"))

    }

    update (data) {
        this.data = data
        this.updateWithData()
    }

    updateWithData () {
        const min = d3.min(this.data, d => d3.min(d, d => d))
        const max = d3.max(this.data, d => d3.max(d, d => d))
        if (min < 0 || max == 0) {
            this.colors.domain([
                d3.max(this.data, d => d3.max(d, d => d)),
                d3.min(this.data, d => d3.min(d, d => d)),
            ])
        } else if (max > 0 || min == 0) {
            this.colors.domain([
                d3.min(this.data, d => d3.min(d, d => d)),
                d3.max(this.data, d => d3.max(d, d => d)),
            ])
        }

        this.focus.selectAll('.matrix').remove()

        this.matrix = this.focus.append("g").attr("class", "matrix")
        
        this.rows = this.matrix.selectAll(".row")
            .data(this.data, (d, day) => d).enter()
        
        this.cards = this.rows.selectAll(".card")
            .data((times, day) => times.map((value, time) => ({
                value,
                time,
                day,
            })))
            .enter().append("rect")
        
        this.cards
            .attr("x", d => d.time * this.gridSize)
            .attr("y", d => d.day * this.gridSize)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", this.gridSize)
            .attr("height", this.gridSize)
            .style("fill", this.colors(0))

        this.cards.transition().duration(1000)
        .style("fill", d => this.colors(d.value))

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