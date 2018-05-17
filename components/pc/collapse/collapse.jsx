import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './collapse.scss';
import Panel from './Panel.jsx';
class Collapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openArr:this.props.openIndex.split(',')
        }
        this.clickHandle = this.clickHandle.bind(this);
    }

    componentDidMount(){
        
    }
    clickHandle(idx) {
        if(!this.props.accordion) {
            return;
        }
        if(this.state.openArr[0] == idx) {
            return;
        }
        this.setState({
            openArr:[idx]
        })
    }
   	render() {
        let cls = classnames({
            
        })
        const {
          children,
          openIndex,
        } = this.props;
        const filteredChildren = React.Children.toArray(children).filter(c => !!c);
     	return (
            <div className="bui-pc-collapse-wrap">
                {
                    Children.map(filteredChildren, (child, index) => {
                    if (!child) {
                        return null;
                    }
                    const childProps = {
                        ...child.props,
                    };
                    this.state.openArr.find(function(i) {
                        if(i == index) {
                            childProps.isOpen = true;
                        }
                    })
                    childProps.clickHandle = this.clickHandle;
                    childProps.idx = index;
                    
                    return cloneElement(child,childProps);
                    })
                }
            </div>
 		);
  	}
}
Collapse.defaultProps = {
    title:'',
    children:''
};

Collapse.Panel = Panel;
export default Collapse;