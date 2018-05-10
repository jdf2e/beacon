import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './radio.scss';
class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onChange(event) {
        let target = event.target;
        let name = target.name;
        let val = target.value;
        if(this.props.onChange) {
            this.props.onChange(name?{[name]:val}:val);
        }
    }
    render() {
        let props = this.props;
        let state = this.state;
        let cls = classnames({
            'bui-radio': true,
            'bui-radio-default': props.custom?false:true,
            'bui-radio-selected': props.checked,
            'bui-radio-unselected': !props.checked,
            [props.custom]:props.custom?true:false
        });
        return (
            <label style={props.style} className={cls}>
                <i className="radio-btn"></i>
                <input type="radio" className="radio-native" value={props.value||''} name={props.name} onChange={this.onChange.bind(this)}/>
                <span className="radio-txt">{this.props.children || this.props.value}</span>
            </label>
        )
        
    }
}
Radio.defaultProps = {
    checked: false,
    value: '',
    name: '',
    custom: '',
    style: {},
    onClick: null
};

Radio.propTypes = {
    checked: PropTypes.bool,
    value: PropTypes.string,
    name: PropTypes.string,
    custom: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
};

export default Radio;