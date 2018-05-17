import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Utils from './../../tools/utils';

class MList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components:[]
        }
    }

    componentDidMount() {
        this.setState({
            components: Utils.getComponent('M')
        })
    }


   	render() {
        let {components} = this.state;
        return (
            <div>
                <div className="header">列表</div>
                <div className="menu">
                    {
                        components.map((obj,i)=>{
                            return (<div className="m" key={i}>
                                <h3 className="m-t">{obj.typename}</h3>
                                <ul className="m-list">
                                    {
                                        obj.list.map((com,j)=>{
                                            let english = com.english.toLowerCase();
                                            return (<li key={j}>
                                                <Link to={`m/${english}`}>{Utils.titleCase(com.english)} {com.chinese}</Link>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>)
                        })
                    }
                </div>
            </div>
        );
  	}
}


export default MList;