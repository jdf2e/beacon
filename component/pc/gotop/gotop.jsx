import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './gotop.scss';

let getScroll = () => {
    var scrollTop = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
    return scrollTop;
}
class Gotop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    handleScroll(){
        const scrollTop = getScroll();
        scrollTop > this.props.visibilityHeight && this.setState({
            visible: true
        });
        scrollTop < this.props.visibilityHeight && this.setState({
            visible: false
        });
    }

    scrollTop() {
        setTimeout(() => {
            window.scrollTo({ 
                top: 0, // could be negative value
                left: 0, 
                behavior: 'smooth' 
            });
        }, 100);
        this.props.onClick();
    }

    componentDidMount() {
        const getTarget = this.props.target || window;
        this.scrollEvent = getTarget.addEventListener('scroll', this.handleScroll.bind(this), false);
        this.handleScroll();
    }
    
    componentWillUnmount() {
        if (this.scrollEvent) {
            this.scrollEvent.remove();
        }
    }

   	render() {
        let { className, visibilityHeight, children} = this.props;
        let cls = classnames(
            `bui-back-top`,
            className
        )
     	return (
            this.state.visible && (
                <div className={cls} onClick={this.scrollTop.bind(this)}>
                 {children != undefined ? children : (
                    <div className="bui-back-top-content">
                        <div className="bui-back-top-icon"></div>
                    </div>
                 )}
     		</div>
            )
 		);
  	}
}
Gotop.defaultProps = {
    visibilityHeight: 100,
    target: window,
    className: '', 
    onClick: () => {

    }
};
Gotop.propTypes = {

};

export default Gotop;