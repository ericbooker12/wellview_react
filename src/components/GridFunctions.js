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
			.selectAll(".tick text")
			.attr("visibility", function(d){ return (d % 500 === 0 && d > 0)  ?  "visible" : "hidden" })

	}

				// Only show depth labels at 500 ft intervals and greater than 0.
		// d3.selectAll(".tick text")
		// 	.attr("visibility", function(d){ return (d % 500 === 0 && d > 0)  ?  "visible" : "hidden" })


	createYGridlines(yScale, tickSize, height){
		return d3.axisRight(yScale)
				.tickSize(tickSize)
				.ticks(height/10);
	}

}

export default GridFunctions;






