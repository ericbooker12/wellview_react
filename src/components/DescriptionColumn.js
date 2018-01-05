import React, { Component } from 'react';
import '../styles/App.css';
import * as d3 from "d3v4";
import GridFunctions from './GridFunctions';

class DescriptionColumn extends Component {
	constructor(props) {
		super(props);

		this.createChart = this.createChart.bind(this);
		this.drawDescriptions = this.drawDescriptions.bind(this);
		this.writeText = this.writeText.bind(this);

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

		const grid = new GridFunctions();

		var descriptionColumn = d3.select(node)

		d3.json(depthDataUrl, d => {
			const maxDepth = d3.max(d['data'].attributes['depth-data'], d => { return d.depth })
			const descriptionData = d.data.attributes["summary-descriptions"];

			const yScale = d3.scaleLinear()
				.domain([0, maxDepth + 100])
				.range([0, this.state.columnHeight]);


				this.writeText(descriptionColumn, descriptionData, yScale);


		});

	}

	drawDescriptions(data, col, scale, fontSize) {
		// console.log(data)
		return col.selectAll('text')
			// .data(data)
			// .enter()
			.append('text')
			.text((data) => { console.log(data) })
			.attr('y', function(d){ console.log(d) })
			.attr('x', 5)
			.attr('class', 'text des-msg')
			.style('font-size', fontSize)
			.style('fill', 'black')
	}

		writeText(svg, data, yScale) {
			// console.log(data)
			return svg.selectAll('text')
				.data(data)
				.enter()
				.append('text')
					.attr('x', 5 )
					.attr('y', d => { return yScale(d.depth) })
					.text( d => { return ` ${d.content}  (${(d.depth)} ft.)` })
						.attr("font-family", "Times New Roman")
						.attr("font-size", "8px")
						.attr("fill", "black");

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


