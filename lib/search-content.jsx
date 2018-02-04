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

class Searchcontent extends React.Component {

	constructor(props){
		super(props);
		if(props.match.params.term && props.match.params.number){		
			this.state = {
				pagenum: props.match.params.number,
				term: props.match.params.term,
				allposts: [],
				loading:true
			}
		}else if(props.match.params.term){
			this.state = {
				pagenum: 1,
				term: props.match.params.term,
				allposts: [],
				loading:true,
				maxpagin:0,
				error:false
			}
		}
		else{
			this.state = {
				pagenum: 1,
				term: '',
				allposts: [],
				loading:true,
				maxpagin:0,
				error:false
			}
		}
		this.ajaxCall = this.ajaxCall.bind(this);
	}

	ajaxCall(sterm, pagin){
		$.ajax({
	      url: baseURL+"/wp-json/wp/v2/posts?search="+sterm+"&per_page=6&page="+pagin,
	      dataType: 'json',
	      cache: false,
	      success: function(data, textStatus, request) {
	      	if(data.length){
	        	this.setState({allposts: data, loading:false, maxpagin: request.getResponseHeader('X-Wp-Totalpages'),error:false});
	        	document.title = sterm;
	      	}else{
	      		this.setState({error:true, loading:false, });
	      	}
	      }.bind(this),
	      error: function(xhr, status, err) {
	        this.setState({error:true, loading:false});
	      }.bind(this)
		});
	}
	
	componentWillReceiveProps(nextProps) {
	  if(nextProps.match.params.term !== this.props.match.params.term) {
	    this.setState({term: nextProps.match.params.term, loading:true});
	    this.ajaxCall(nextProps.match.params.term.replace(/-/g, ' '), this.state.pagenum);
	  }
	  if(nextProps.match.params.number !== this.props.match.params.number) {
	  	if(typeof nextProps.match.params.number !== "undefined"){
	    	this.setState({pagenum: nextProps.match.params.number, loading:true});
	    	this.ajaxCall(this.state.term.replace(/-/g, ' '), nextProps.match.params.number);
		}else{
		    this.setState({pagenum: 1, loading:true});
		    this.ajaxCall(this.state.term.replace(/-/g, ' '), 1);
		}
	  }
	}

	componentDidMount(){
		this.setState({loading:true});
		this.ajaxCall(this.state.term.replace(/-/g, ' '), this.state.pagenum);
	}

  render () {
	const displayposts = this.state.allposts.map((post) =>
			<div className="col-md-4" key={post.id}>
				<div className="card">
				  <img className="card-img-top" src={post.featured_image_src} alt="Card image cap"/>
				  <div className="card-block">
				    <Link to={"/"+post.slug}><h2 className="card-title" dangerouslySetInnerHTML={ {__html: post.title.rendered} } /></Link>
					<div className="content" dangerouslySetInnerHTML={{
					    __html: post.excerpt.rendered
					}} />
				  </div>
				</div>
			</div>
	);
	let nexturl = "/search/"+this.state.term+"/page/"+(parseInt(this.state.pagenum, 10)+1);
	let prevurl = "/search/"+this.state.term+"/page/"+parseInt(this.state.pagenum-1);
	let prevbtn = parseInt(this.state.pagenum, 10) <= 1 ? null : <Link className="btn btn-outline-primary btn-lg" to={prevurl}>Previous</Link>;
	let nextbtn = this.state.pagenum >= this.state.maxpagin ? null : <Link className="btn btn-outline-primary btn-lg float-right" to={nexturl}>Next</Link>;
    return (
			<section className="maincontent">
				<div className="container">
					{this.state.loading ? <div className="spinner"> <div className="rect1"></div> <div className="rect2"></div> <div className="rect3"></div> <div className="rect4"></div> <div className="rect5"></div> </div> : this.state.error ? <Forzerofour/> : <div className="row">{displayposts}</div>}
					
					<div className="pager">
					  {prevbtn}
					  {nextbtn}
					</div>
				</div>
			</section>
    	);
  }
}

export default Searchcontent;
