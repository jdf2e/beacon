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
						{/*<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" height="30" alt=""/>BeaconUI*/}

<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 303.5 60" enableBackground="new 0 0 303.5 60" xmlSpace="preserve">
<g>
	<path fill="#FFFFFF" d="M0.2,0.1C2.9,1.4,26.4,12.3,37.4,28c0.5-0.9,1.1-2,1.6-3.1C26,10.8,3.1,1.3,0.2,0.1
		C0.2,0.1,0.2,0.1,0.2,0.1"/>
	<path fill="#FFFFFF" d="M40.7,18.8C24.5,8.1,3.5,1.2,0.3,0.1c0,0,0,0-0.1,0c3,1.1,25,9.3,39.9,21.5C40.4,20.5,40.6,19.6,40.7,18.8"
		/>
	<path fill="#FFFFFF" d="M60,16c0-9.9-7.8-16-29.2-16c-2,0-4,0-5.9,0c-0.1,0-0.2,0-0.2,0C12.9,0,1.2,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0
		C1.4,0.1,13.1,1,24.9,2.4C38,4,43.2,9.2,43.2,16c0,1.4-0.1,2.8-0.4,4.2c-0.2,1-0.5,2-0.8,3c-0.4,1.2-0.8,2.3-1.4,3.5
		c-0.5,1.1-1.2,2.3-1.8,3.4C28.1,47.2,1.6,59.2,0,60c0,0,0,0,0,0c1.7-0.7,27.6-11.1,40.6-26.6c0.2,0.5,0.4,0.9,0.6,1.4
		c0.8-0.7,1.9-1.8,3-3c-0.3-0.6-0.7-1.1-1.1-1.7c0.8-1.2,1.5-2.4,2.2-3.6c0.6,0.6,1.2,1.3,1.8,1.9c0.9-1.2,1.6-2.2,2.1-3.1
		c-0.8-0.7-1.6-1.4-2.5-2.1c0.8-2.3,1.3-4.7,1.3-7.1c0-4.7-1.4-8.5-4.7-11.3C50.8,7.2,54,11.2,54,16c0,3.7-1.2,7.2-3.2,10.6
		c-0.7,1.1-1.4,2.3-2.3,3.4c-1,1.2-2,2.5-3.2,3.6c-1,1.1-2.2,2.1-3.3,3.2C26.7,50.3,1.8,59.3,0,60c0,0,0,0,0,0
		c1.9-0.6,25.7-8.3,42.7-20.1c0.3,1.4,0.4,2.8,0.4,4.2c0,6.9-5.2,12-18.3,13.6C13.1,59,1.4,59.9,0,60c0,0,0,0,0,0c0,0,0,0,0,0
		c1.2,0,12.9,0,24.6,0c0.1,0,0.2,0,0.2,0c2,0,3.9,0,5.9,0C52.2,60,60,53.9,60,44c0-4.9-2.3-9.6-6-14C57.7,25.6,60,21,60,16
		 M43.3,55.3C46.6,52.5,48,48.7,48,44c0-2.4-0.4-4.8-1.3-7.1c1.4-1.1,2.8-2.3,4.1-3.5c2,3.4,3.2,6.9,3.2,10.6
		C54,48.8,50.8,52.8,43.3,55.3"/>
	<path fill="#FFFFFF" d="M105.3,28.8C107,27,108,24.6,108,22c0-5.5-4.5-10-10-10H85h-5v31v5h5h14.5c5.8,0,10.5-4.7,10.5-10.5
		C110,33.9,108.2,30.7,105.3,28.8 M85,17h1.3H98c2.8,0,5,2.2,5,5c0,2.8-2.2,5-5,5H86.3H85V17z M99.5,43C99.5,43,99.5,43,99.5,43
		H87.6h0H85V32h2.6H98h1.5c3,0,5.5,2.5,5.5,5.5S102.5,43,99.5,43"/>
	<path fill="#FFFFFF" d="M242.5,23c-6.9,0-12.5,5.6-12.5,12.5V48h5V35.5c0-4.1,3.4-7.5,7.5-7.5c4.1,0,7.5,3.4,7.5,7.5V48h5V35.5
		C255,28.6,249.4,23,242.5,23"/>
	<rect x="301" y="12" fill="#FFFFFF" width="2.5" height="36"/>
	<path fill="#FFFFFF" d="M290.5,33c0,6.9-5.6,12.5-12.5,12.5s-12.5-5.6-12.5-12.5V12H263v21c0,8.3,6.7,15,15,15s15-6.7,15-15V12
		h-2.5V33z"/>
	<path fill="#FFFFFF" d="M113,35.5c0,6.9,5.6,12.5,12.5,12.5H139v-5h-13.5c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5H139v-5h-13.5
		C118.6,23,113,28.6,113,35.5"/>
	<rect x="124" y="33" fill="#FFFFFF" width="13" height="5"/>
	<path fill="#FFFFFF" d="M172,35.5c0,6.9,5.6,12.5,12.5,12.5H197v-5h-12.5c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5H197v-5h-12.5
		C177.6,23,172,28.6,172,35.5"/>
	<path fill="#FFFFFF" d="M214.5,23h-3c-3.8,0-7.2,1.7-9.5,4.4c-1.9,2.2-3,5-3,8.1s1.1,5.9,3,8.1c2.3,2.7,5.7,4.4,9.5,4.4h3
		c3.8,0,7.2-1.7,9.5-4.4c1.9-2.2,3-5,3-8.1s-1.1-5.9-3-8.1C221.7,24.7,218.3,23,214.5,23 M214.5,43h-3c-4.1,0-7.5-3.4-7.5-7.5
		s3.4-7.5,7.5-7.5h3c4.1,0,7.5,3.4,7.5,7.5S218.7,43,214.5,43"/>
	<path fill="#FFFFFF" d="M164,25.5c-2.1-1.6-4.7-2.5-7.5-2.5h-3c-3.8,0-7.2,1.7-9.5,4.4c-1.9,2.2-3,5-3,8.1s1.1,5.9,3,8.1
		c2.3,2.7,5.7,4.4,9.5,4.4h3c2.8,0,5.4-0.9,7.5-2.5V48h5V23h-5V25.5z M156.5,43h-3c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5h3
		c4.1,0,7.5,3.4,7.5,7.5S160.6,43,156.5,43"/>
</g>
</svg>

					</Link>
                </div>
				<div className="r">
					<a href="demo.html" className="link" target="_blank">查看M端demo</a>
					<Link to={'/m'} className="link">M端</Link>
					<Link to={'/pc'} className="link">PC端</Link>
				</div>
            </div>
     	);
  	}
}

