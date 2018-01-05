class LithFunctions {
	constructor(data){
		console.log('From LithFunctions')
		this.stuff = data;
	}

	formatLithData(liths) {

		var lithArr = [];

		// var lithData = lith.forEach(function(d){
		// 	lithArr.push(formatLithData(d))
		// })
	}

	toLithArray(lithology) {

		var lithArray = [];

		lithology.forEach(function(d){
			var percents = [];
			// console.log(d)
			for (const sym in d) {
				percents = [
					d.felsite,
					d.blueschist,
					d.greenstone,
					d.chert,
					d.peridotite,
					d.mum,
					d.silicic_graywacke,
					d.lithic_graywacke,
					d.argillite,
					d.serpentine,
					d.clay,
					d.blank
				]
			}
				lithArray.push([d.depth, percents])
		});

		return lithArray
	}

	avgLithArray(arr) {
		console.log("In get avgLithArr")
		// console.log(arr)
		var percentTotal = [];
		var avg = [];
		var numOfRecords = 0;
		var depth = 0;
		var avgLithArr = [];
		var syms = ['F', 'X', 'G', 'C', 'T', 'D', 'I', 'L', 'A', 'S', 'Y', 'B'];

		arr.forEach(function(d){
			// console.log(d)
			depth = d[0];
			// console.log(depth)
			var percents = d[1];

			// console.log(percents);
			var i = 0;
			percents.forEach(function(d1){
				// console.log(depth, 'd1', d1)
				if (percentTotal[i]) {
					percentTotal[i] += d1
				} else {
					percentTotal[i] = d1
				}
				i++;
			});

			if (depth % 100 === 0 || i === arr.length - 1) {

				percentTotal.forEach(function(d2){
					// console.log(depth, d2)
					avg.push( d2 / ( numOfRecords ))
				});

				avgLithArr.push([depth, syms, avg])
				percentTotal = [];
				avg = [];
				numOfRecords = 0;
			}
				numOfRecords++;
		})
		return avgLithArr
	}

	avgLithObj(arr) {
		// console.log(arr)
		var summaryLiths = []
		var syms = ['F', 'X', 'G', 'C', 'T', 'D', 'I', 'L', 'A', 'S', 'Y', 'B'];

		arr.forEach(function(d){
			var obj = 	{
			"depth": 0,
			"felsite": 0,
			"blueschist": 0,
			"greenstone": 0,
			"chert": 0,
			"peridotite": 0,
			"mum": 0,
			"silicic_graywacke": 0,
			"lithic_graywacke": 0,
			// "hornfelsic": 0,
			// "strongly_hornfelsic": 0,
			// "altered": 0,
			// "strongly_altered": 0,
			"argillite": 0,
			"serpentine": 0,
			"clay": 0,
			"blank": 0
		};
			obj.depth = d[0]

			obj['F'] = d[2][0];
			obj['X'] = d[2][1];
			obj['G'] = d[2][2];
			obj['C'] = d[2][3];
			obj['T'] = d[2][4];
			obj['D'] = d[2][5];
			obj['I'] = d[2][6];
			obj['L'] = d[2][7];
			obj['A'] = d[2][8];
			obj['S'] = d[2][9];
			obj['Y'] = d[2][10];
			obj['B'] = d[2][11];


			summaryLiths.push(obj)

		})

		return summaryLiths;
	}

	drawLith(svg, scale, lithData){

		var lithSymbols = {
			"G": {
				name: "greenstone",
				symbol: "G",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: 'rgb(80,210,141)',
				lineColor: 'yellow',
				lineThickness: 2,
				borderColor: "yellow",
				borderWidth: 0
			},
			"A": {
				name: "argillite",
				symbol: "A",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: '#C7CEDB',
				lineColor: 'blue',
				lineThickness: 2,
				borderColor: "blue",
				borderWidth: 0
			},
			"I": {
				name: "graywacke",
				symbol: "I",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: '#DEE181',
				lineColor: 'red',
				lineThickness: 2,
				borderColor: "red",
				borderWidth: 1
			},
			"T": {
				name: "???",
				symbol: "T",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: 'green',
				lineColor: 'red',
				lineThickness: 4,
				borderColor: "red",
				borderWidth: 0
			},
			"S": {
				name: "serpentine",
				symbol: "S",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: '#ADEEE3',
				lineColor: 'green',
				lineThickness: 5,
				borderColor: "red",
				borderWidth: 0
			},
			"D": {
				name: "MUM",
				symbol: "D",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: '#004323',
				lineColor: 'green',
				lineThickness: 5,
				borderColor: "black",
				borderWidth: .1
			},
			"Y": {
				name: "clay",
				symbol: "D",
				pattern: `M0,10 L100,10
									M0,30 L100,30
									M0,50 L100,50
									M0,70 L100,70
									M0,90 L100,90`,
				fill: 'lightgray',
				lineColor: 'black',
				lineThickness: 2,
				borderColor: "black",
				borderWidth: 0
			},
			"C": {
				name: "chert",
				symbol: "C",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: 'yellow',
				lineColor: 'black',
				lineThickness: 2,
				borderColor: "black",
				borderWidth: .1
			},
			"B": {
				name: "blank",
				symbol: "C",
				pattern: 'M10,50 L90,50 M30,75 L20,25 M55,75 L45,25 M80,75 L70,25',
				fill: 'white',
				lineColor: 'black',
				lineThickness: 2,
				borderColor: "black",
				borderWidth: .1
			},
			"default": {
				name: "default",
				symbol: "0",
				pattern: `M0 ,-5 L100,98
									M20,-5 L100,80
									M40,-5 L100,60
									M60,-5 L100,40
									M80,-5 L100,20
									M0,20 L80,98
									M0,40 L60,98
									M0,60 L40,98
									M0,80 L20,98`,
				fill: '#E3B23C',
				lineColor: 'red',
				lineThickness: 3,
				borderColor: "black",
				borderWidth: 0
			}
		}

		// console.log(lithData[0], lithData[1], lithData[2])

		var svgWidth = svg.attr('width');
		var xScale = scale.x;
		var yScale = scale.y;
		var yOffset = .5;
		const depth = yScale(lithData[0] - 100)
		var symbol = lithData[1];
		var percents = lithData[2];
		let lithName = 'default'
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
			let x1 = xScale(xOffset);
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




}

export default LithFunctions;






