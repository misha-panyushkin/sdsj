import * as d3 from "d3"

export default class BarChart {
    constructor (root, hub) {
        this.svg = d3.select(root)
        this.hub = hub
        this.margin = {top: 10, right: 0, bottom: 20, left: 50}
        
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom
        
        this.focus = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

        this.clipPath = this.svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", this.width).attr("height", this.height)

        this.x = d3.scaleBand().range([0, this.width])
        this.y = d3.scaleLinear().range([this.height, 0])
        
        this.z = d3.scaleLinear()
            .range(["#2c7bb6", "#d7191c"])
            .interpolate(d3.interpolateHcl)

        this.axisX = d3.axisBottom(this.x).tickFormat((d,i) => i%10 ? null : d)
        this.axisY = d3.axisLeft(this.y).tickFormat(n => this.formatNumber(n))

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
        this.fusedData = data.reduce((result, v) => {
            for (var i = 0; i < v.points.length; i++) {
                result[i] = result[i] || { x:i, y:0 }
                result[i].y += v.points[i].y || 0
            }
            return result
        }, [])

        const max = d3.max(this.fusedData, d => d.y)
        if (max <= 0) {
            this.y.range([0, this.height])
            this.z.domain([
                d3.max(this.fusedData, d => d.y),
                d3.min(this.fusedData, d => d.y),
            ])
        } else {
            this.z.domain([
                d3.min(this.fusedData, d => d.y),
                d3.max(this.fusedData, d => d.y),
            ])
        }

        if (this.isBuilt) {
            this.updateWithData()
        } else {
            this.buildWithData()
        }
    }

    buildWithData () {
        this.x.domain(this.fusedData.map(d => d.x))

        this.y.domain([
            d3.min(this.fusedData, d => d.y),
            d3.max(this.fusedData, d => d.y),
        ])
        
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
        
        this.bar = this.focus.selectAll(".bar")
            .data(this.fusedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => this.x(d.x))
            .attr("y", d => this.y(d.y))
            .attr("width", this.x.bandwidth())
            .attr("height", d => this.height - this.y(d.y))
            .style("fill", d => this.z(d.y))

        this.isBuilt = true
    }

    updateWithData () {
        this.x.domain(this.fusedData.map(d => d.x))

        this.y.domain([
            d3.min(this.fusedData, d => d.y),
            d3.max(this.fusedData, d => d.y),
        ])
        
        this.z.domain([
            d3.min(this.fusedData, d => d.y),
            d3.max(this.fusedData, d => d.y),
        ])

        this.focus.selectAll(".bar").remove()
        this.bar = this.focus.selectAll(".bar")
            .data(this.fusedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => this.x(d.x))
            .attr("y", d => this.y(d.y))
            .attr("width", this.x.bandwidth())
            .attr("height", d => this.height - this.y(d.y))
            .style("fill", d => this.z(d.y))
        
        this.focus.select(".axis--x")
            .call(this.axisX)

        this.focus.select(".axis--y")
            .call(this.axisY)
    }
}