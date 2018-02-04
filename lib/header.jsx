import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { Link } from 'react-router-dom';
import Forzerofour from './fourzerofour.jsx';

var $ = require('jquery');

class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			content:''
		}
	}

	componentDidMount(){
		$.ajax({
	      url: baseURL+"/wp-json/extended/menu",
	      dataType: 'json',
	      contentType: "application/json; charset=UTF-8",
	      cache: false,
	      success: function(data, textStatus, request) {
	        	this.setState({content:data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        this.setState({content:false});
	      }.bind(this)
		});
	}


  render () {
  	let menuitem;
  	if(this.state.content){
  	menuitem = this.state.content.map((item) =>
  			<li className="nav-item" key={item.ID} >
		      	<Link className="nav-link" to={"/p/"+item.url.split('/').filter(function(el){ return !!el; }).pop()+"/"}>{item.title}</Link>
  		  	</li>
		);
  	}
    return (
	    	<header>
				<nav className="navbar navbar-expand-lg navbar-dark bg-light">
				  <div className="container">
				  <Link className="navbar-brand" to="/">{siteTITLE}</Link>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
			      	<input onChange={(event) => this.props.handlesearch(event.target.value)} onFocus={ this.props.handlefocus } onBlur={ this.props.handleblur } className="form-control mr-sm-2 srchbox" type="text" placeholder="Search" value={this.props.currentterm}/>
				  <div className="collapse navbar-collapse col-md-5" id="navbarNavAltMarkup">
				    <ul className="nav navbar-nav ml-auto">
						<li className="nav-item">
					      	<Link className="nav-link" to="/">Home</Link>
			  		  	</li>
				      {menuitem}
				    </ul>
				  </div>
				  </div>
				</nav>
			</header>
    	);
  }
}
export default Header;
