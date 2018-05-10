import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './button.scss';
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
   	render() {
        
        let props = this.props;
        let state = this.state;
        let cls = classnames({
            'bui-button': props.custom?false:true,
            [`bui-button-${props.size}`]: props.custom?false:true,
            [props.custom]:props.custom?true:false
        });
        if(props.type == 'link'){
            return (
                <a className={cls} href={props.link}  style={props.style} onClick={props.onClick}>{props.children}</a>
            );
        }else if(props.type == 'submit'){
            return (
                <button className={cls}  style={props.style} onClick={props.onClick}>{props.children}</button>
            );
        }
        else {
            return (
                <button className={cls} type="submit" style={props.style} onClick={props.onClick}>{props.children}</button>
            );
        }
     	
  	}
}
Button.defaultProps = {
    link: '',
    type: 'button',
    size: 'm',
    custom: '',
    style: {},
    onClick: null
};

Button.propTypes = {
    link: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    custom: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
};

export default Button;