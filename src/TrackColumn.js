import React, { Component } from 'react';
import './styles/App.css';
// import { scaleLinear } from 'd3-scale';
// import { axisRight } from 'd3-axis';
// import { max } from 'd3-array';
// import { select, selectAll } from 'd3-selection';
import * as d3 from "d3v4";

class DepthColumn extends Component {
	constructor(props) {
		super(props);

		console.log('In depthColumn:', this.props)
		this.createChart = this.createChart.bind(this);

		this.state = {
			columnWidth: this.props.data.pageWidth * 0.020,
			columnHeight: this.props.data.chartHeight
		}

	}

	componentDidMount(){
		this.createChart()
	}

	componentDidUpdate() {
		this.createChart()
	}

	createChart() {
		var depthDataUrl = 'http://localhost:3001/wells/well_data?well_num=1';

		const node = this.node;
		// const dataMax = max(this.props.data)


			var depthColumn = d3.select(node)
				.append('svg')
					.attr("height", this.state.columnHeight)
					.attr('width', this.state.columnWidth)
					.attr('x', 0)
					.attr('y', 0)
					.attr('class', 'col depthCol')
					.attr('id', 'depth');

			d3.json(depthDataUrl, d => {

				// let depthData = d['data'].attributes['depth-data']);
				// console.log(d.data.attributes['depth-data']);
				// const depthData = d.data.attributes["depth-data"]);

				var maxDepth = d3.max(d['data'].attributes['depth-data'], d => { return d.depth })
				console.log(maxDepth)

				const yScale = d3.scaleLinear()
					.domain([0, maxDepth + 100])
					.range([0, this.state.columnHeight]);

				// Write depth labels
				// console.log('Lith Column width =', lithColDimension.width)
				depthColumn.append('g')
					.attr('class', 'depth-label')
					.call(createYGridlines(yScale, 0, this.state.columnHeight))
				.selectAll("text")
					.attr("y", -this.state.columnWidth/2 )
					.attr("x", 0)
					.attr("transform", "rotate(90)")
					.style("text-anchor", "middle");

				// Only show depth labels at 500 ft intervals and greater than 0.
				d3.selectAll(".tick text")
					.attr("visibility", function(d){ return (d % 500 === 0 && d > 0)  ?  "visible" : "hidden" })


			});

			function createYGridlines(yScale, tickSize, height){
				return d3.axisRight(yScale)
					.tickSize(tickSize)
					.ticks(height/10);
			}

	}

	render() {
			return (
				<svg
					className='depth-column chart col'
					ref={node => this.node = node}
					width={this.state.columnWidth} height={this.props.height}>
				</svg>
			)
	}
}

export default DepthColumn;


