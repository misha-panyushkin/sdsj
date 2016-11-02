import * as d3 from "d3"

export default class DataHub {
    constructor () {
        this.hub = []
    }

    push (data) {
        this.hub.push(data)
    }

    brushed (brushDomain) {
        this.hub.forEach((data, i) => {
            
            if (data.line) {
                data.x.domain(brushDomain)
                data.focus.selectAll(".customer")
                    .selectAll("path")
                    .attr("d", d => data.line(d.points))
            
            } else if (data.area) {
                data.x.domain(brushDomain)
                data.focus.selectAll(".customer")
                    .selectAll("path")
                    .attr("d", data.area)
            
            } else if (data.bar) {
                const scale = d3.scaleLinear().domain(brushDomain)
                const ticks = scale.ticks(Math.ceil(scale.domain()[1] - scale.domain()[0]))
                const nextDomain = ticks.map(v => v)

                data.x.domain(nextDomain)
                data.focus.selectAll(".bar")
                    .attr("x", d => data.x(d.x))
                    .attr("y", d => data.y(d.y))
                    .attr("width", data.x.bandwidth())
            
            } else if (data.brush) {
                data.x.domain(brushDomain)
                data.focus.selectAll(".customer")
                    .selectAll("path")
                    .attr("d", d => data.line(d.points))
            }

            data.focus.select(".axis--x")
                .call(data.axisX)
        })
    }
}