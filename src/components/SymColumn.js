import React, { Component } from 'react';
import '../styles/App.css';
import * as d3 from "d3v4";
import GridFunctions from './GridFunctions';

class SymColumn extends Component {
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

		const ntry = { sym: 'steam',    shape: 'M0,-10 L10,0 L0,10 Z' };
		const svy  = { sym: 'survey',   shape: 'M0,-2  L10,0 L0,2  L-10,0 Z'};
		const trip = { sym: 'tripLine', shape: 'M0,-1  L10,-1 L10,1 L0,1 Z'};


		var symColumn = d3.select(node)

		let grid = new GridFunctions();

		d3.json(depthDataUrl, d => {

			const symbolData = d.data.attributes["well-symbols"];

			const maxDepth = d3.max(d['data'].attributes['depth-data'], d => { return d.depth })
			// console.log(maxDepth)

			const yScale = d3.scaleLinear()
				.domain([0, maxDepth + 100])
				.range([0, this.state.columnHeight]);

			// Add grid lines
			grid.addHorizontalGridlines(symColumn, yScale, this.state.columnWidth, this.state.columnHeight)

			// Emphasize tick lines at 500 ft and de-emphasize all others
			d3.selectAll(".y-axis .tick line")
				.attr("opacity",      function(d){ return (d % 500 === 0)  ?  "0.75" : ".25" })
				.attr("stroke-width", function(d){ return (d % 500 === 0 ) ?  "1.00" : ".25" })

			// Add steam entry symbol to page
			symbolData.forEach(d => {
				if(d.symbol === 'trip') {
					this.addSymbol(symColumn, trip, d.depth, yScale)
				}
			})
		});

	}

	addSymbol(svg, shapeData, depth, scale) {
		svg.append('path')
			.attr('d', shapeData.shape)
			.attr('class', 'shape')
		  .attr('transform', `translate(${0}, ${scale(depth)})scale(1.46)`)
			.style("fill",  () => {
				if      (shapeData.sym == 'steam')    { return 'red'}
				else if (shapeData.sym == 'survey')   { return 'blue' }
				else if (shapeData.sym == 'tripLine') { return 'red' }
			})
			.style('opacity', .6);
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

export default SymColumn;


