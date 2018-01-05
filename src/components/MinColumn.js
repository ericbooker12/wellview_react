import React, { Component } from 'react';
import '../styles/App.css';
import GridFunctions from './GridFunctions';

import * as d3 from "d3v4";

class MinColumn extends Component {
	constructor(props) {
		super(props);

		this.createChart     = this.createChart.bind(this);
		this.createMinColumn = this.createMinColumn.bind(this);
		this.drawMinLine     = this.drawMinLine.bind(this);

		this.state = {
			columnWidth: this.props.data.pageWidth * 0.10,
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
		const depthDataUrl = 'http://localhost:3001/wells/well_data?well_num=1';
		const width = this.state.columnWidth
		const height = this.state.columnHeight
		const node = this.node;

		const minColumn = d3.select(node)

		const grid = new GridFunctions();

		d3.json(depthDataUrl, d => {

			const minData = d.data.attributes.mineralogies;

			console.log('minData', minData)

			const maxDepth = d3.max(d['data'].attributes['depth-data'], d => { return d.depth })

			const yScale = d3.scaleLinear()
				.domain([0, maxDepth + 100])
				.range([0, this.state.columnHeight]);

			grid.addHorizontalGridlines(minColumn, yScale, this.state.columnWidth, this.state.columnHeight)

			// Emphasize tick lines at 500 ft and de-emphasize all others
			d3.selectAll(".y-axis .tick line")
				.attr("opacity",      function(d){ return (d % 500 === 0)  ?  "0.75" : ".25" })
				.attr("stroke-width", function(d){ return (d % 500 === 0 ) ?  "1.00" : ".25" })

			// Create columns for min
			// function createMinColumn() args: columnToAppendTo, xLocation, width, height, class(optional)
			var qtz   = this.createMinColumn(minColumn, 0,					 width/9, height, 'min qtz'   )
			var cal   = this.createMinColumn(minColumn, width/9 * 1, width/9, height, 'min cal'   )
			var pyr   = this.createMinColumn(minColumn, width/9 * 2, width/9, height, 'min pyr'   )
			var epid  = this.createMinColumn(minColumn, width/9 * 3, width/9, height, 'min epid'  )
			var pyrh  = this.createMinColumn(minColumn, width/9 * 4, width/9, height, 'min pyrh'  )
			var chl   = this.createMinColumn(minColumn, width/9 * 5, width/9, height, 'min chl'   )
			var axin  = this.createMinColumn(minColumn, width/9 * 6, width/9, height, 'min axin'  )
			var actin = this.createMinColumn(minColumn, width/9 * 7, width/9, height, 'min actin' )
			var tourm = this.createMinColumn(minColumn, width/9 * 8, width/9, height, 'min tourm' )

			minData.forEach(d => {
				this.drawMinLine(qtz,   'quartz',     d, yScale, 'blue')
				this.drawMinLine(cal,   'calcite',    d, yScale, 'black')
				this.drawMinLine(pyr,   'pyrite',     d, yScale, 'gold')
				this.drawMinLine(epid,  'epidote',    d, yScale, 'red')
				this.drawMinLine(pyrh,  'pyrrhotite', d, yScale, 'brown')
				this.drawMinLine(chl,   'chlorite',   d, yScale, 'green')
				this.drawMinLine(axin,  'axinite',    d, yScale, 'pink')
				this.drawMinLine(actin, 'actinolite', d, yScale, '#287458')
				this.drawMinLine(tourm, 'tourmaline', d, yScale, 'gray')
			});
		});
	}

	createMinColumn(svgCol, x, width, height, cl=''){
		return svgCol.append('svg')
					.attr('x', x)
					.attr('y', 0)
					.attr('width', width)
					.attr('height', height)
					.attr('class', `min ${cl}`)
	}

	drawMinLine(svg, mineral, data, yScale, color) {
		// if (!data[mineral]){
		// 	data[mineral] = 0
		// }
		return svg.append('line')
					.attr("x1", svg.attr("width")/2)
					.attr("y1", yScale(data.depth))
					.attr("x2", svg.attr("width")/2)
					.attr("y2", yScale(data.depth + 10.5))
					.attr('stroke-width', data[mineral] * 2)
					.attr('stroke', color);
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

export default MinColumn;


