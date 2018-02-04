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

class Maincontent extends React.Component {

	constructor(props){
		super(props);
		if(props.match.params.number){		
			this.state = {
				pagenum: props.match.params.number,
				allposts: [],
				loading:true,
				maxpagin:0,
				error:false
			}
		}else{
			this.state = {
				pagenum: 1,
				allposts: [],
				loading:true,
				maxpagin:0,
				error:false
			}
		}
		this.ajaxCall = this.ajaxCall.bind(this);
	}

	componentWillMount() {
      // this.props.toggleLoading();
   }

	ajaxCall(pagin){
		$.ajax({
	      url: baseURL+"/wp-json/wp/v2/posts?per_page=6&page="+pagin,
	      dataType: 'json',
	      contentType: "application/json; charset=UTF-8",
	      cache: false,
	      success: function(data, textStatus, request) {
	        this.setState({allposts: data, loading:false,error:false, maxpagin: request.getResponseHeader('X-Wp-Totalpages')});
	      }.bind(this),
	      error: function(xhr, status, err) {
	      	this.setState({error:true, loading:false});
	      }.bind(this)
		});
	}

	componentWillReceiveProps(nextProps) {
	  if(nextProps.match.params.number !== this.props.match.params.number) {
	  	if(typeof nextProps.match.params.number !== "undefined"){
		    this.setState({pagenum: nextProps.match.params.number, loading:true});
		    this.ajaxCall(nextProps.match.params.number);
		}else{
		    this.setState({pagenum: 1, loading:true});
		    this.ajaxCall(1);
		}
	  }
	}

	componentDidMount(){
		this.setState({loading:true});
		this.ajaxCall(this.state.pagenum);
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
	let nexturl = "/page/"+ (parseInt(this.state.pagenum, 10)+1);
	let prevurl = "/page/"+parseInt(this.state.pagenum-1);
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

export default Maincontent;
