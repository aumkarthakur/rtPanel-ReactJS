import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import Header from './header.jsx';
import Banner from './banner.jsx';
import Maincontent from './main-content.jsx';
import Searchcontent from './search-content.jsx';
import Innerpost from './inner-post.jsx';
import Innerpage from './inner-page.jsx';

var pathName = new URL(baseURL).pathname;

if(typeof pathName === "undefined"){
	pathName = "/";
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			loading:false,
			searchterm: '',
			searchspan: null,
			isfocus: false
		}
	}

	handleSearch(term){
		if(term != ''){
			this.setState({searchterm: term, searchspan:true});
		}else{
			this.setState({searchterm: '', searchspan:false});
		}
	}

	handleFocus(){
		this.setState({isfocus:true});
	}

	handleBlur(){
		this.setState({isfocus:false});
	}


	render () {
		let fsearchterm = this.state.searchterm;
		let fshowspan = this.state.searchspan;
		let fsearchtermDash = fsearchterm.replace(/\s+/g, '-');
		let routingforsearch;
		if(this.state.isfocus){
			routingforsearch = <Route path='*' render={(props) =>
				<div>
			 {this.state.searchspan && '/search/'+fsearchtermDash != props.match.params[0] && this.state.isfocus ? <Redirect to={'/search/'+fsearchtermDash}/> : this.state.searchspan == null ? null : this.state.searchspan ? null : props.match.params[0] == '/' && this.state.isfocus ? null :<Redirect to={'/'}/>}
				</div>
			} />;
		}
		document.title = siteTITLE;
	return (
		<div>


			<Switch>
			<Route path='/search/:term' render={(props) => <div className="bgtaker"><Header handlesearch={this.handleSearch.bind(this)} handlefocus={this.handleFocus.bind(this)} handleblur={this.handleBlur.bind(this)} currentterm={props.match.params.term.replace(/-/g, ' ')}/><Banner btitle={props.match.params.term.replace(/-/g, ' ')} showspan="true"/></div>} />
			<Route path="/:slug" exact  render={(props)=> <div className="bgtaker">
	 			<Header handlesearch={this.handleSearch.bind(this)} handlefocus={this.handleFocus.bind(this)} handleblur={this.handleBlur.bind(this)} currentterm={fsearchterm}/></div>}/>			
	 			<Route path="/p/:slug" exact  render={(props)=> <div className="bgtaker">
	 			<Header handlesearch={this.handleSearch.bind(this)} handlefocus={this.handleFocus.bind(this)} handleblur={this.handleBlur.bind(this)} currentterm={fsearchterm}/></div>}/>
			<Route path='*' exact render={(props) => 
			<div className="bgtaker">
	 			<Header handlesearch={this.handleSearch.bind(this)} handlefocus={this.handleFocus.bind(this)} handleblur={this.handleBlur.bind(this)} currentterm={fsearchterm}/>
	 			<Banner btitle={fsearchterm} showspan={false}/>
	 		</div>
	 		} />
			</Switch>

				<div>
					<Switch>
					<Route path="/" exact component={Maincontent}/>
					<Route path='/page/:number' component={Maincontent} />
					<Route path='/search/:term' exact component={Searchcontent} />
					<Route path='/search/:term/page/:number' component={Searchcontent} />
					<Route path='/p/:slug' component={Innerpage} />
					<Route path="/:slug" exact component={Innerpost}/>
					</Switch>
				</div>

				{routingforsearch}


		</div>
		);
	}
}




render(<BrowserRouter basename={pathName}><App /></BrowserRouter>, document.getElementById('app'));
