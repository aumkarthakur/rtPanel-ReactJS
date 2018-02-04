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

class Innerpost extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			content: '',
			featuredimg: '',
			loading:true,
			date: '',
			fourzerofour:false
		}
	}

	ajaxCall(slug){
		$.ajax({
	      url: baseURL+"/wp-json/wp/v2/posts?slug="+slug,
	      dataType: 'json',
	      contentType: "application/json; charset=UTF-8",
	      cache: false,
	      success: function(data, textStatus, request) {
	      	if(data[0]){
	        	this.setState({title:data[0].title.rendered,content:data[0].content.rendered,featuredimg:data[0].featured_image_src,loading:false,date:data[0].date,fourzerofour:false});
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

	render(){
		let displayposts = <div className="post-inner">
						<div className="title-holder" style={{background: "url("+this.state.featuredimg+")"}}>
							<div className="overlay-rt"></div>
							<div className="makeitrelative">
								<h2 className="card-title" dangerouslySetInnerHTML={ {__html: this.state.title} } />
								<span>{this.state.date}</span>
							</div>
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

export default Innerpost;