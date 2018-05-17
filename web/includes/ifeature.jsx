import React from 'react';
export default class Feature extends React.Component {
	constructor(props) {
	    super(props);
    }

   	render() {
     	return (
             <div className="feature">
                <div className="w">
                    <ul className="fea-con">
                        <li className="item">
                            <b className="i1"></b>
                            <h3>标准规范</h3>
                            <p className="desc">遵循统一的设计规范标准，高度还原 设计原型，按照统一接口规范，使用 方式极简。</p>
                        </li>
                        <li className="item i2 mlf">
                            <b className="i2"></b>
                            <h3>多端组件库</h3>
                            <p className="desc">拥有基于PC端以及M端多终端特性， 根据用户需要可以按需安装指定内容， 一次开发多端兼容。</p>
                        </li>
                        <li className="item i3">
                            <b className="i3"></b>
                            <h3>高质量代码</h3>
                            <p className="desc">长时间支持众多项目，并从中提炼出 精华造就，组件稳定易用。</p>
                        </li>
                    </ul>
                </div>
            </div>
     	);
  	}
}