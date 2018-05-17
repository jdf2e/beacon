import React from 'react';
export default class Banner extends React.Component {
	constructor(props) {
	    super(props);
    }

   	render() {
     	return (
             <div className="banner">
                <div className="w bg">
                    <div className="left-text">
                        <div className="welcome"></div> 
                        <div className="txt">
                            <p>一个服务与多平台的标准规范。</p>
                            <p> 基于模块与响应式的思想搭建出来一种全新模式的解决方案。</p>
                        </div>
                        <a target="_blank" href="/app.html#/m/button" className="btn">开始使用</a>
                    </div>
                </div>
            </div>
     	);
  	}
}