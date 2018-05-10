import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './checkbox.scss';
class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onChange(event) {
        let target = event.target;
        let name = target.name;
        let val = target.value;
        let checked = target.checked;
        if(this.props.onChange) {
            this.props.onChange({
                name: name,
                value: val,
                checked:checked
            });
        }
    }
    render() {
        let props = this.props;
        let state = this.state;
        let cls = classnames({
            'bui-checkbox': true,
            'bui-checkbox-default': props.custom?false:true,
            'bui-checkbox-selected': props.checked,
            'bui-checkbox-unselected': !props.checked,
            [props.custom]:props.custom?true:false
        });
        return (
            <label style={props.style} className={cls}>
                <i className="checkbox-btn"></i>
                <input type="checkbox" className="checkbox-native" value={(props.value+'')||''} name={props.name} onChange={this.onChange.bind(this)}/>
                <span className="checkbox-txt">{this.props.children}</span>
            </label>
        )
    }
}
Checkbox.defaultProps = {
    checked: false,
    value: '',
    name: '',
    custom: '',
    style: {},
    onClick: null
};

Checkbox.propTypes = {
    checked: PropTypes.bool,
    value: PropTypes.string || PropTypex.number,
    name: PropTypes.string,
    custom: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
};

export default Checkbox;