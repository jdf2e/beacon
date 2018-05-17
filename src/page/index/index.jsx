import React from 'react';
import { Link, Router, Route } from 'react-router-dom';

export default class Index extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    };
	     
    }

   	render() { 		
     	return (
			<div className="intro">
				基于React的组件库
				<div className="guide">
					<Link to={'/m'} className="link">去M端</Link>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Link to={'/pc'} className="link">去PC端</Link>
				</div>
			</div>
     	);
  	}

}