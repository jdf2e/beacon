import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './input.scss';
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPlaceHolder: true
        }
    }

    IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }   
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11  
        }else{
            return -1;//不是ie浏览器
        }
    }

    clickPlaceholder() {
        this.setState({
            isShowPlaceHolder: false
        })
    }

    onFocus() {
        
        if(this.props.onFocus){
            this.props.onFocus(event);
        }
    }

    onBlur(event) {
        if(!event.target.value) {
            this.setState({
                isShowPlaceHolder: true
            })
        }
        
        if(this.props.onBlur){
            this.props.onBlur(event);
        }
    }

    onChange(event) {
        if(event.target.value) {
            this.setState({
                isShowPlaceHolder: false
            })
        } else {
            this.setState({
                isShowPlaceHolder: true
            })
        }
        if(this.props.onChange){
            this.props.onChange(event);
        }
    }

   	render() {
        let {placeholder,value,custom,defaultValue} = this.props;
        let {isShowPlaceHolder} = this.state;
        let ie = this.IEVersion();
        let cls = classnames({
            'bui-pc-input': !custom?true: false,
            [custom]: custom?true: false
        })
        
     	return (
     		<span className={cls}>
                 <input type='text' placeholder={placeholder} defaultValue={defaultValue} value={value} onFocus={this.onFocus.bind(this)} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)}/>
                 {(ie < 10 && ie > 5 && isShowPlaceHolder) && <span className="placeholder" onClick={this.clickPlaceholder.bind(this)}>{placeholder}</span>}
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