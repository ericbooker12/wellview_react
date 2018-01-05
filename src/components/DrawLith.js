

class DrawLith(svg, scale, lithData){
	this.svg = svg;
	this.lithData = lithData;

	// console.log(lithData[0], lithData[1], lithData[2])

	var svgWidth = svg.attr('width');
	var xScale = scale.x;
	var yScale = scale.y;
	var yOffset = .5;
	const depth = yScale(lithData[0] - 100)
	var symbol = lithData[1];
	var percents = lithData[2];
	// console.log(percents)

	var borders = {
		on: false,
		width: 2,
		color: 'green'
	}

		var i = 0;
		var xStart = 0;
		percents.forEach(function(percent){
			percent = percent/10
			// console.log(percent)
			if(percent !== 0){

				// lithSymbols defines shape, color, etc of symbol. In 'lithologies.js'
				// if the lith symbol doesnt exist in the library, use 'default'
				if(!lithSymbols.hasOwnProperty(symbol[i])){
					lithName = 'default'
				} else {
					lithName = symbol[i]
					// console.log(lithName)
				}

				drawLithSquare(lithName, xStart, percent);
				xStart += percent * 10;
			}
			i++;
		})

	function drawLithSquare(lithName, xPos, percent){

		var numFloored = Math.floor(percent)
		var numCeiling = Math.ceil(percent)
		var numDecimal = percent - numFloored;

		for(var i = 0; i < numCeiling; i++){
			createSymbol(i * 10, lithSymbols[lithName], xPos, percent);
		}
	}

	// var svg2 = d3.select('#tempSvg').append('svg');
	// console.log(svg)
	function createSymbol(xOffset, lithSymbol, xPos, perc){
		// console.log(perc)
		// console.log(xScale(perc))
		x1 = xScale(xOffset);
		xPos  = xScale(xPos);
		var lithWidth = xScale(perc);

		// Add the background color to lith symbol
		var symbol = svg.append("rect")
			.attr('x', xPos + x1)
			.attr('y', depth + yOffset)
			.attr('width', function(){ return xScale(10)})
			.attr('height', yScale(100))
			.attr('fill', lithSymbol.fill)
			.attr('stroke-width', function(){
				if(borders.on){
					return borders.width
				} else {
					return yScale(lithSymbol.borderWidth);
				}
			})
			.attr('stroke', function(){
				if(borders.on){
					return borders.color;
				} else {
					return lithSymbol.borderColor;
				}
			})
			.attr('opacity', .9)
			// .append('path')
			// .attr('transform', `translate(${(xPos + x1)}, ${depth}) scale(${xScale(.1)}, ${yScale(1)}) translate(0, 10)`)
			// .attr('stroke-width', lithSymbol.lineThickness)
			// .attr("stroke", lithSymbol.lineColor)
			// .attr('d', lithSymbol.pattern );

		// Add the pattern to the symbol
		// Change this to use 'polyline' or 'polygon' instead of 'path'
		var pattern = svg.append('path')
			.attr('width', xScale(svgWidth))
			// .attr('height', yScale(200))
			.attr('transform', `translate(${(xPos + x1)}, ${depth}) scale(${xScale(.1)}, ${yScale(1)}) translate(0, 10)`)
			.attr('stroke-width', lithSymbol.lineThickness)
			.attr("stroke", lithSymbol.lineColor)
			.attr('d', lithSymbol.pattern )
	}
}

