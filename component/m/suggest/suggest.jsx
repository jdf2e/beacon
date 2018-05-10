import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './suggest.scss';
class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputKey: '',
            isVisible: false
        }
    }

    change(name,val) {
        this.setState({
            [name]: val
        },()=> {
            if(this.state.inputKey) {
                this.setState({
                    isVisible: true
                });
            } else {
                this.setState({
                    isVisible: false
                });
            }
        });
        this.props.search(val);
    }

    renderLi() {
        if(this.props.data.length) {
            return this.props.data.map((res,index) => {
                return <li key={index} onClick={(e) => this.click(res)} className={this.props.liCls}>{res}</li>
            });
        } else {
            return <li>{this.props.renderNone ? this.props.renderNone:'没有找到'}：{this.state.inputKey}</li>
        }
    }

    click(res) {
        this.setState({
            inputKey: res,
            isVisible: false
        });
        this.props.choose(res);
    }

   	render() {
        let prop = this.props,
            state = this.state;
        let ulClass = classnames({
            show: state.isVisible
        })
        let width = prop.width + 'rem',
            ulWidth = (parseFloat(prop.width) + 0.1) + 'rem',
            ulHeight = prop.height + 'rem';
     	return (
     		<div className={`input ${prop.wrapCls}`}>
                <input type="text"
                disabled={prop.disabled ? prop.disabled : false}
                name="inputKey"
                className="search-sel"
                placeholder={prop.placeholder ? prop.placeholder : 'input here'}
                value={state.inputKey}
                onChange={(e)=> this.change(e.target.name, e.target.value)}
                style={{width: width}}/>
                <ul name="" className={`${ulClass} ${prop.ulCls}`} style={{width: ulWidth, maxHeight: ulHeight}}>
                    {this.renderLi()}
                </ul>
     		</div>
 		);
  	}
}
Suggest.defaultProps = {
    data: [],
    search: null,
    choose: null
};
Suggest.propTypes = {
    data:PropTypes.array,
    search: PropTypes.func,
    choose: PropTypes.func
};

export default Suggest;