import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './tab.scss';

class Panel extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
    	let props = this.props,
    		activeCls = props.activeCls ? props.activeCls : '';
    	return (
	        <li className="tab">
	            {<a className={`tab-link ${props.linkCls ? props.linkCls:''} ${props.isActive ? `active ${activeCls}` : ''}`}
	                onClick={(event) => {
	                    event.preventDefault();
	                    props.onClick(props.tabIndex);
	                    if(props.onTabClick){props.onTabClick(props.tabIndex);}
	                }}>
	                {/*<i className={`tab-icon ${props.iconClassName}`}/>*/}
	                {props.title}
	            </a>}
	        </li>
	    )
    }
}

Panel.propTypes = {
    onClick      : PropTypes.func,
    tabIndex     : PropTypes.number,
    isActive     : PropTypes.bool,
    //iconClassName: PropTypes.string.isRequired,
    linkCls: PropTypes.string,
    activeCls: PropTypes.string,
    title: PropTypes.string
};

Panel.defaultProps = {
    title: 'tab'
};

export default Panel;
