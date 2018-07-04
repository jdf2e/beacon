import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TreeBranch from './tree-branch';
import './tree.scss';
class Tree extends React.Component {
    constructor(props) {
	    super(props);
        this.state = {
        };
    }

   	render() {
        let self = this;
        let jsonData = self.props.jsonData;
        if(jsonData && jsonData.length == 0) return null;
        const loop = data => {
            return data.map((item,i) => {
                if (item.nodes) {
                return (<TreeBranch key={i} jsonData={item} onClick={this.props.onClickNode.bind(this)} selectedId={self.props.selectedId}>
                    {loop(item.nodes)}
                </TreeBranch>);
                }
                return <TreeBranch key={i} jsonData={item} onClick={this.props.onClickNode.bind(this)} selectedId={self.props.selectedId}/>;
            });
        };
        const treeNode = loop(jsonData);

     	return (
             <div className="bui-pc-tree">
                <div className="ztree">
                    {treeNode}
                </div>
             </div>
     	);
  	}
}
Tree.defaultProps = {
};
Tree.propTypes = {
};

export default Tree;