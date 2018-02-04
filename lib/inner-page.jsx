import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import Forzerofour from './fourzerofour.jsx';


var $ = require('jquery');

class Innerpage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			content: '',
			loading:true,
			fourzerofour:false
		}
	}

	ajaxCall(slug){
		$.ajax({
	      url: baseURL+"/wp-json/wp/v2/pages?slug="+slug,
	      dataType: 'json',
	      contentType: "application/json; charset=UTF-8",
	      cache: false,
	      success: function(data, textStatus, request) {
	      	if(data[0]){
	        	this.setState({title:data[0].title.rendered,content:data[0].content.rendered,loading:false,fourzerofour:false});
        	}else{
        		this.setState({fourzerofour:true, loading:false});
        	}
	      }.bind(this),
	      error: function(xhr, status, err) {
	        this.setState({fourzerofour:true, loading:false});
	      }.bind(this)
		});
	}

	componentDidMount(){
		this.setState({loading:true});
		this.ajaxCall(this.props.match.params.slug);
	}

	componentWillReceiveProps(nextProps) {
	  if(nextProps.match.params.slug !== this.props.match.params.slug) {
	  	if(typeof nextProps.match.params.slug !== "undefined"){
			this.setState({loading:true});
			this.ajaxCall(nextProps.match.params.slug);
		}
	  }
	}





	render(){
		let displayposts = <div className="page-inner">
						<div className="title-holder">
						<h2 className="card-title" dangerouslySetInnerHTML={ {__html: this.state.title} } />
						</div>
						<div className="post-content" dangerouslySetInnerHTML={{
						    __html: this.state.content
						}} />
					</div>;
		document.title = this.state.title;
		return(
			<section className="maincontent">
				<div className="container">
				{this.state.loading ? <div className="spinner"> <div className="rect1"></div> <div className="rect2"></div> <div className="rect3"></div> <div className="rect4"></div> <div className="rect5"></div> </div> : this.state.fourzerofour ? <Forzerofour/> : displayposts}
					
				</div>
			</section>
			);
	}
}

export default Innerpage;