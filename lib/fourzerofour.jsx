import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';


class Forzerofour extends React.Component {

	render(){
		return(
				<div className="fourzerofour">
				    <h2>There was problem serving the requested page.</h2>
				    <h3>This may be caused by one of the following errors.</h3>
				    <ul>
				        <li>Rest API is not enabled</li>
				        <li>Your <code>.htaccess</code> is not configured correctly.</li>
				        <li>Search Term you entered does not match with any of the post</li>
				        <li>You're on wrong route.</li>
				    </ul>
					<style>{"\
					.pager{\
					  display:none;\
					}\
					"}</style>
				</div>
			);
	}

}

export default Forzerofour;