import * as d3 from "d3v4";

class GridFunctions {
	constructor(data){
		console.log('From GridFunctions')
		this.stuff = data;
	}

	addHorizontalGridlines(column, yScale, width, height) {
		column.append('g')
			.attr('class', 'y-axis')
			.call(this.createYGridlines(yScale, width, height))
	}



	createYGridlines(yScale, tickSize, height){
		return d3.axisRight(yScale)
				.tickSize(tickSize)
				.ticks(height/20);
	}

}

export default GridFunctions;






