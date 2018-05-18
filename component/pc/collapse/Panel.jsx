import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './collapse.scss';
class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:this.props.isOpen,
            style:{}
        }
        this.titleClick = this.titleClick.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.openHeight = 0;
        this.openWidth = 0;
        this.getSize = (this.props.direction == 'horizon') ? this.getWidth : this.getHeight;
    }

    titleClick(ev) {
        if(this.props.disabled) {
            return;
        }
        this.setState({
            isOpen: !this.state.isOpen
        },()=>{
            this.props.clickHandle(this.props.idx)
            this.setState({
                style: this.getSize()
            }) 
        })
        this.props.clickEvent && this.props.clickEvent();
    }

    getHeight() {  
        let styleObj;   
        if (this.state.isOpen) {
            styleObj = {height: this.openHeight + 'px'};  
        } else {
            styleObj = {height: 0};
        } 
        return styleObj
    }
    getWidth() {  
        let styleObj;   
        if (this.state.isOpen) {
            styleObj = {width: this.openWidth + 'px'};  
        } else {
            styleObj = {width: 0};
        } 
        return styleObj
    }
    componentDidMount(){
        setTimeout(()=>{
            this.openHeight = this.refs.collapseDom.offsetHeight - 1; 
            this.openWidth = this.refs.collapseDom.offsetWidth; 
            this.setState({
                style: this.getSize()
            }) 
        },30)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            isOpen : nextProps.isOpen,
        },()=>{
            this.setState({
                style: this.getSize()
            }) 
        });
    }
   	render() {
        let cls = classnames({
            'bui-pc-collapse': true,
            'bui-pc-collapse-open': this.state.isOpen,
            'bui-pc-collapse-disabled': this.props.disabled
        })
     	return (
     		<div className={cls}>
                <div className='collapse-title' onClick={this.titleClick}>
                    <svg width="10" height="5" viewBox="0 0 10 5" className="arrow" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.01.268a.26.26 0 0 0 .077.189l4.329 4.325a.754.754 0 0 0 1.043.013L9.912.461A.26.26 0 0 0 9.91.085a.283.283 0 0 0-.39.001L5.07 4.418a.186.186 0 0 1-.129.049.186.186 0 0 1-.129-.054L.483.087a.283.283 0 0 0-.39-.006.26.26 0 0 0-.083.187z" fillRule="nonzero"></path>
                    </svg>
                    {this.props.title}
                </div>
                <div className='collapse-content' style={this.state.style}>
                    <div className='collapse-detail' ref='collapseDom'>
                        {this.props.children}
                    </div>
                </div>
     		</div>
 		);
  	}
}
Panel.defaultProps = {
    title:'',
    children:'',
    isOpen:false
};

export default Panel;