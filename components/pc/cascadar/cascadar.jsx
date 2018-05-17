import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from './select.jsx';
import './cascadar.scss';
class Cascadar extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            datas: []
        }
        this.selectData = [];
    }
    componentWillReceiveProps(props) {
        if(this.state.datas.length === 0) {
            if(props.data.length === 0) return;
            this.setState({
                datas: [
                    {
                        data: props.data
                    }
                ]
            })
        }        
    }
    selectChange(index, val) {
        //初始化选中值
        let cd = this.selectData;
        cd.splice(index, cd.length);
        cd.push(val);
        //初始化数据
        let d = this.state.datas;
        d.splice(index+1, d.length);
        if(val[this.props.childKey]) {
            d.push({
                data: val[this.props.childKey]
            })
            this.setState({
                datas: d
            })
        }else {
            this.setState({
                datas: d
            })
            this.props.onChange && this.props.onChange(cd);
        }
    }
   	render() {
        let cls = classnames({
            'bui-pc-cascadar': true,
            [this.props.cls]: true
        })
     	return (
            <div className={cls}>
                {
                    this.state.datas.map((item, index) => {
                        return <Select defaultTxt={this.props.defaultTxt} key={index} data={item.data} nodeKey={this.props.nodeKey} onChange={this.selectChange.bind(this, index)}></Select>
                    })
                }
            </div>
 		);
  	}
}
Cascadar.defaultProps = {
    defaultTxt: '--请选择--',
    cls: '',
    data: [],
    nodeKey: 'n',
    selected: '',
    childKey: 's',
    onChange: null
};
Cascadar.propTypes = {
    defaultTxt: PropTypes.string,
    cls: PropTypes.string,
    data: PropTypes.array,
    key: PropTypes.string,
    selected: PropTypes.string,    
    nodeKey: PropTypes.string,
    childKey: PropTypes.string,
    onChange: PropTypes.func
};

export default Cascadar;