import React from 'react';
import {Link} from 'react-router-dom';
import Utils from './../../tools/utils';
export default class Menu extends React.Component {
	constructor(props) {
	    super(props);
        this.state = {
            components: []
        };
    }

    componentDidMount() {
        this.setState({
            components: Utils.getComponent(this.props.type)
        })
    }

   	render() {
        let {components} = this.state;
        let {type} = this.props;
        let urlParams = Utils.parseUrl(window.location.href);
     	return (
     		<div className="menu">
                 {
                      components.map((obj,i)=>{
                         return (<div className="m" key={i}>
                            <h3 className="m-t">{obj.typename}</h3>
                            <ul className="m-list">
                                {
                                    obj.list.map((com,j)=>{
                                        let english = com.english.toLowerCase();
                                        return (<li key={j} className={urlParams.hash.indexOf(`${english}`)>-1?'active':''}>
                                            {type.toLowerCase() =='m' && <Link to={`/m/${english}`}>{Utils.titleCase(com.english)} {com.chinese}</Link>}
                                            {type.toLowerCase() =='pc' && <Link to={`/pc/${english}`}>{Utils.titleCase(com.english)} {com.chinese}</Link>}
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>)
                     })
                 }
            </div>
     	);
  	}
}

