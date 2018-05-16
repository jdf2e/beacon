import React from 'react';
import {Link} from 'react-router-dom';
export default class Header extends React.Component {
	constructor(props) {
	    super(props);
    }

   	render() {
     	return (
     		<div className="header">
                <div className="l">
                    <Link to={'/'} className="logo">
						<img src="./../assets/i/logo.png" height="30" alt=""/>
					</Link>
                </div>
            </div>
     	);
  	}
}

