import React, { Component } from 'react';
import '../styles/App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class Chart1 extends Component {
	constructor(props) {
		super(props);
		this.createBarChart = this.createbarChart.bind(this);
	}

	componentDidMount(){
		this.createBarChart()
	}

	componentDidUpdate() {
		this.createBarChart()
	}

	createbarChart() {
		const node = this.node;
		const dataMax = max(this.props.data)
		const yScale = scaleLinear()
			.domain([0, dataMax])
			.range([0, this.props.size[1]]);

		const barWidth = this.props.width / this.props.data.length;

		select(node)
			.selectAll('rect')
			.data(this.props.data)
			.enter()
			.append('rect');

		select(node)
			.selectAll('rect')
			.data(this.props.data)
			.exit()
			.remove();

		select(node)
			.selectAll('rect')
			.data(this.props.data)
			.style('fill', 'steelblue')
			.attr('x', (d, i) => i * barWidth)
			.attr('y', d => this.props.height - yScale(d))
			.attr('height', d => yScale(d))
			.attr('width', barWidth)
			// .attr('width', this.props.width / this.props.data.length * 2)


	}

	render() {
			return (
				<svg
					className='chart1 chart'
					ref={node => this.node = node}
					width={this.props.width} height={this.props.height}>
				</svg>
			)
	}
}

export default Chart1;