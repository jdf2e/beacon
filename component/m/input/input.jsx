import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './input.scss';
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onFocus() {
        
        if(this.props.onFocus){
            this.props.onFocus(event);
        }
    }

    onBlur(event) {        
        if(this.props.onBlur){
            this.props.onBlur(event);
        }
    }

    onChange(event) {
        if(this.props.onChange){
            this.props.onChange(event);
        }
    }

   	render() {
        let {placeholder,value,custom,defaultValue} = this.props;
        let cls = classnames({
            'bui-m-input': !custom?true: false,
            [custom]: custom?true: false
        })
        
     	return (
     		<span className={cls}>
                 <input type='text' placeholder={placeholder} defaultValue={defaultValue} value={value} onFocus={this.onFocus.bind(this)} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)}/>               
     		</span>
 		);
  	}
}

Input.defaultProps = {
    placeholder: '',
    
};

Input.propTypes = {
    placeholder: PropTypes.string,
    value:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    defaultValue:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default Input;