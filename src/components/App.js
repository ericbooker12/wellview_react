import React, { Component } from 'react';
import '../styles/App.css';
import DepthColumn from './DepthColumn';
import LithColumn from './LithColumn';
import MinColumn from './MinColumn';
import DescriptionColumn from './DescriptionColumn';
import SymColumn from './SymColumn'
import TrackColumn	 from './TrackColumn'
// import * as d3 from "d3v4";

class App extends Component {
	constructor(props){
		super(props)

		let margin = 10;
		let pageHeight = 1000;
		let headerHeight = 150;
		let chartHeight = pageHeight - headerHeight - (margin * 2);
		let pageWidth = 750;
		let chartWidth = pageWidth - (margin * 2);
		let pageTextSize = 10;

		// console.log(wellData.data.attributes['depth-data'])

		this.state = {
			isLoaded: false,
			wellData: null,
			margin : margin,
			pageHeight : pageHeight,
			headerHeight : headerHeight,
			chartHeight : chartHeight,
			pageWidth : pageWidth,
			chartWidth : chartWidth,
			pageTextSize : pageTextSize
		}
	}

	componentWillMount(){

	}


	componentDidMount(){

	}

	render() {
		return (
			<div className="App">
				<div className='App-header'>
					<h2>
						d3ia dashboard
					</h2>
				</div>
				<div>
					{/*<DepthColumn
											data={this.state}
											width={this.state.chartWidth}
											height={this.state.chartHeight}
										/>
										<LithColumn
											data={this.state}
											width={this.state.chartWidth}
											height={this.state.chartHeight}
					/>*/}
					<MinColumn
						data={this.state}
						width={this.state.chartWidth}
						height={this.state.chartHeight}
					/>
					{/*<SymColumn
						data={this.state}
						width={this.state.chartWidth}
						height={this.state.chartHeight}
					/>
					<DescriptionColumn
						data={this.state}
						width={this.state.chartWidth}
						height={this.state.chartHeight}
					/>
					<TrackColumn
						data={this.state}
						width={this.state.chartWidth}
						height={this.state.chartHeight}
					/>*/}
				</div>
			</div>
		);
	}
}

export default App;
