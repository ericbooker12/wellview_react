import React, { Component } from 'react';
import '../styles/App.css';
import * as d3 from "d3v4";
import LithFunctions from './LithFunctions';
import GridFunctions from './GridFunctions';

class LithColumn extends Component {
	constructor(props) {
		super(props);

		console.log('In depthColumn:', this.props)
		this.createChart = this.createChart.bind(this);

		this.state = {
			columnWidth: this.props.data.pageWidth * 0.095,
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

		let lith = new LithFunctions();
		let grid = new GridFunctions();

		var lithColumn = d3.select(node);

		// Draw the horizontal gridlines.

		d3.json(depthDataUrl, d => {

			const maxDepth = d3.max(d['data'].attributes['depth-data'], d => { return d.depth })
			const yScale = d3.scaleLinear()
				.domain([0, maxDepth + 100])
				.range([0, this.state.columnHeight]);

			const lithScale = d3.scaleLinear()
				.range([0, this.state.columnWidth])
				.domain([0, 100]);

			grid.addHorizontalGridlines(lithColumn, yScale, this.state.columnWidth, this.state.columnHeight)

			// Get the lithologies
			console.log(d.data.attributes.lithologies)
			const newLith = lith.toLithArray(d.data.attributes.lithologies);
			const lith100 = lith.avgLithArray(newLith);
			// var obj100 = lith.avgLithObj(lith100);

			const lithScales = {
				x: lithScale,
				y: yScale
			};

			var i = 0;

			var startDraw = setInterval(function(){

				var lithologies = lith.drawLith(lithColumn, lithScales, lith100[i])
				i += 1;
				if(i >= lith100.length){
					clearInterval(startDraw);
				}
			}, 1);




		});

	}

	render() {
			return (
				<svg
					className='lith-column chart col'
					ref={node => this.node = node}
					width={this.state.columnWidth} height={this.props.height}>
				</svg>
			)
	}
}

export default LithColumn;


