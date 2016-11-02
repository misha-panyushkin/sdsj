import * as d3 from "d3"

export default class LineChart {
    constructor (root, hub) {
        this.svg = d3.select(root)
        this.hub = hub
        this.margin = {top: 10, right: 0, bottom: 20, left: 50}
        
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom
        
        this.focus = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

        this.clipPath = this.svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", this.width).attr("height", this.height)

        this.x = d3.scaleLinear().range([0, this.width])
        this.y = d3.scaleLinear().range([this.height, 0])
        
        this.z = d3.scaleOrdinal(d3.schemeCategory10)

        this.axisX = d3.axisBottom(this.x).ticks(10)
        this.axisY = d3.axisLeft(this.y).tickFormat(n => this.formatNumber(n))

        this.line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(d => this.x(d.x) || 0)
            .y(d => this.y(d.y) || 0)

        this.hub.push(this)
        this.isBuilt = false
    }

    formatNumber (n) {
        return n.toPrecision(2)
        const s = parseInt(n).toString()
        
        if (s.length > 6) {
            return s.slice(0,-6) + 'm'
        
        } else if (s.length > 3) {
            return s.slice(0,-3) + 'k'
        
        }
        
        return s
    }

    update (data) {
        this.data = data
        
        if (this.isBuilt) {
            this.updateWithData()
        } else {
            this.buildWithData()
        }
    }

    buildWithData () {
        this.x.domain([0, d3.max(this.data, d => d.points.length)])        
        this.y.domain([
            d3.min(this.data, d => d3.min(d.points, p => p.y)),
            d3.max(this.data, d => d3.max(d.points, p => p.y))
        ])
        
        this.z.domain(this.data.map(d => d.id))
        
        this.focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.axisX)
        
        this.focus.append("g")
            .attr("class", "axis axis--y")
            .call(this.axisY)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Amount, UE")
        
        this.customer = this.focus.selectAll(".customer")
            .data(this.data)
            .enter().append("g")
            .attr("class", "customer")

        this.customer.append("path")
            .attr("class", "line")
            .attr("clip-path", "url(#clip)")
            .attr("d", d => this.line(d.points))
            .style("stroke", d => this.z(d.id))

        this.isBuilt = true
    }

    updateWithData () {
        this.x.domain([0, d3.max(this.data, d => d.points.length)])        
        this.y.domain([
            d3.min(this.data, d => d3.min(d.points, p => p.y)),
            d3.max(this.data, d => d3.max(d.points, p => p.y))
        ])

        this.z.domain(this.data.map(d => d.id))

        this.focus.selectAll(".customer").remove()
        this.customer = this.focus.selectAll(".customer")
            .data(this.data)
            .enter().append("g")
            .attr("class", "customer")

        this.customer.append("path")
            .attr("class", "line")
            .attr("clip-path", "url(#clip)")
            .attr("d", d => this.line(d.points))
            .style("stroke", d => this.z(d.id))
        
        this.focus.select(".axis--x")
            .call(this.axisX)

        this.focus.select(".axis--y")
            .call(this.axisY)
    }
}