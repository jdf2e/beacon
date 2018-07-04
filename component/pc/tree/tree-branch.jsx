import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
class TreeBranch extends React.Component {
	constructor(props) {
	    super(props);
        this.state = {
        };
    }

    toggleSecond(id) {
        let self = this;
        let treeSwitch = self.state[`tree_switch_${id}`];
        self.setState({
            [`tree_switch_${id}`]: !treeSwitch
        })
    }

    componentDidMount() {
        let self = this;
        setTimeout(()=>{
            let {jsonData} = self.props;
            if(jsonData.parentDepartmentId == 0) {
                self.setState({
                    [`tree_switch_${jsonData.id}`]:true
                })
            }
        },1000);
        
    }

   	render() {
        let self = this;
        let {jsonData,children} = self.props;
        let cls = classnames({
            'button': true,
            'switch': true,
            'roots_open': self.state[`tree_switch_${jsonData.id}`],
            'roots_close': !self.state[`tree_switch_${jsonData.id}`]
        });
        let seltectCls = classnames({
            curSelectedNode: self.props.selectedId == jsonData.id
        });
        
        if(!jsonData.nodes) {
            return (<ul>
                <li>
                    <span className="button switch center_docu"></span>
                    <a title={jsonData.departmentName} onClick={self.props.onClick.bind(self,jsonData)} className={seltectCls}>
                        <span className="button ico_close" ></span>
                        <span className="node_name">{jsonData.departmentName}({jsonData.memberCount}人)</span>
                    </a>
                </li>
            </ul>)
        } else {
            return (
                <ul className="level1 line">
                    <li>
                        <span onClick={self.toggleSecond.bind(self,jsonData.id)}  className={cls}></span>
                        <a title={jsonData.departmentName} onClick={self.props.onClick.bind(self,jsonData)} className={seltectCls}>
                            <span className="button ico_close"></span>
                            <span className="node_name">{jsonData.departmentName}({jsonData.memberCount}人)</span>
                        </a>
                        {self.state[`tree_switch_${jsonData.id}`] && children}
                    </li>
                </ul>
            );
        }     	
  	}
}
TreeBranch.defaultProps = {
    jsonData: {}
};
TreeBranch.propTypes = {
    jsonData: PropTypes.object
}
export default TreeBranch;

