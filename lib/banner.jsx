import React from 'react';
import {render} from 'react-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';

class Banner extends React.Component {
  render () {
  	let showspans;
  	if(this.props.showspan){
  		showspans= <h1 className="display-3"><span>Search result for:</span> {this.props.btitle}</h1>;
  	} 
    else{
      showspans= <h1 className="display-3">ReactJS based WordPress theme</h1>;
    }
    return (
			<div className="jumbotron jumbotron-fluid">
			  <div className="container">
			    {showspans}
			  </div>
			</div>
    	);
  }
}
export default Banner;
