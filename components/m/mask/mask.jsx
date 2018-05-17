import React from 'react';
import classnames from 'classnames';
import './mask.scss';
class Mask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: props.isVisible,
        };
    }
    //按钮点击事件
    closeMask(){
        this.setState({ isVisible: false });
    }
   
    componentWillReceiveProps(nextProps) {
        this.setState({ isVisible : nextProps.isVisible });
    }
    render() {
        
        if(!this.state.isVisible) {
            return null;
        }   
        return (
            <div className="bui-mask" onClick={this.closeMask.bind(this)} >
            </div>
        );
    }
}
Mask.defaultProps = {
    isVisible: false
};

export default Mask;