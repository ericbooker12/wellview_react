import React, { Component } from 'react';
import '../styles/App.css';

import * as d3 from "d3v4";

class DescriptionColumn extends Component {
	constructor(props) {
		super(props);

		this.createChart = this.createChart.bind(this);

		this.state = {
			columnWidth: 440,
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


			var minColumn = d3.select(node)
				.append('svg')
					.attr("height", this.state.columnHeight)
					.attr('width', this.state.columnWidth)
					.attr('x', 0)
					.attr('y', 0)
					.attr('class', 'col descCol')
					.attr('id', 'depth');

			d3.json(depthDataUrl, d => {

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
					className='desc-column chart col'
					ref={node => this.node = node}
					width={this.state.columnWidth} height={this.props.height}>
					Description Column
				</svg>
			)
	}
}

export default DescriptionColumn;


