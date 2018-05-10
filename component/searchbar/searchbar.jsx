import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './searchbar.scss';
class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.textUpdate,
            clearTxt:false
        };
        //this.handleChange = this.handleChange.bind(this);
        //this.handleClear = this.handleClear.bind(this);
    }

    handleChange() {
        if(this.props.onChange) this.props.onChange(this.state.inputText);
        this.setState({
            inputText: this.refs.input.value.trim()
        });
        if (this.refs.input.value.trim() != '') {
            this.setState({
                clearTxt:true
            });
        }else{
            this.setState({
                clearTxt:false
            });
        }
    }
    handleClear() {
        this.delText();
        this.setState({
            clearTxt:false
        });
    }
    cancelSearch(){
        if(this.props.onCancel) this.props.onCancel();
    }
  
    //删除方法
    delText() {
        this.setState({
            inputText: ''
        });
    }
   	render() {
        return (
            <div className="bui-m-searchbar">
                <span className="search-icon"></span>
                <input type="text" className="search-ipt" placeholder="请输入..." value={this.state.inputText} onChange={this.handleChange.bind(this)} ref='input'/>
                <span className={this.state.clearTxt ? 'del-text' : 'del-text hide'} onClick={this.handleClear.bind(this)}></span>
                <span className="cancel-btn" onClick={this.cancelSearch.bind(this)}>取消</span>
            </div>
        );
  	}
}
Searchbar.defaultProps = {
    textUpdate:'',
};
Searchbar.propTypes = {
};

export default Searchbar;