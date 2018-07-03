import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './choose.scss';
class Choose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			currLevel: 0,//当前tab索引+1，默认显示第一级
            tempDatas:[],
            currItem: {}
	    };
    }
   	//关闭选择
	closeOptions() {
		if(this.props.onCloseOptions) this.props.onCloseOptions();
	}

	//选中列表中的某一项 i 当前tab
	liClick(obj,i) {
		let self = this;
        let {currLevel,tempDatas} = self.state;
        tempDatas[currLevel-1].item = obj;
        self.setState({
            tempDatas:tempDatas,
            currItem: obj
        });
        if(this.props.onClickItem) self.props.onClickItem(obj,currLevel);
	}

	
	liTitClick(level) {
		let self = this;
        this.setState({
			currLevel: level+1,//当前tab索引+1，默认显示第一级
            currItem: self.state.tempDatas[level].item
        });
	}

    stopProp(e) {
        e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
    }

	componentDidMount() {
		let self = this;
        let props = this.props;
        if(props.onInitData) props.onInitData();
	}

    resetData() {
        this.setState({
			currLevel: 0,//当前tab索引+1，默认显示第一级
            tempDatas:[],
            currItem: {}
        })
    }

    componentWillReceiveProps(nextProps) {   
        if(this.props.listData != nextProps.listData) {
            let tempDatas = this.state.tempDatas;
            let currLevel = this.state.currLevel;
            if(currLevel < tempDatas.length){
                this.setState({
                    tempData:tempDatas.slice(0,currLevel)
                })
            }
            let currData = [{list:nextProps.listData,item:{}}];
            if(!(currLevel < tempDatas.length)) {
                this.setState({
                    tempDatas: [...tempDatas,...currData],
                   
                })
            }
            this.setState({
                 currLevel: currLevel + 1
            });
        }
    }


   	render() {
		let self = this;
		let props = self.props;
		let state = self.state;
		if(!props.isVisible) {
			return null;
		}
     	return (
     		<div className="area-wrapper" onClick={self.closeOptions.bind(self)} key="chooseId">
                 <div className="area" onClick={self.stopProp.bind(self)}>
					 <div className="area-title">
						 <span className="area-title-txt">{props.optionTitle}</span>
						 <a href='javascript:;' className='area-close' onClick={self.closeOptions.bind(self)}>
                            <svg>
                                <line x1='0' y1='0' x2='10' y2='10' className='line' />
                                <line x1='10' y1='0' x2='0' y2='10' className='line' />
                            </svg>
                        </a>
					 </div>
					 <div className="area-con">
						<ul className="area-tab-tit">
							{
								state.tempDatas.map((obj,i)=>{
									if(state.currLevel < i) return null;
									return <li key={i} 
                                    className={state.currLevel==(i+1)?'curr':''} 
                                    onClick={self.liTitClick.bind(self,i)}>{obj.item[props.liTxtKey]?obj.item[props.liTxtKey]:'请选择'}
                                    </li>
								})
							}
						</ul>
                        <div className="area-tab-con">
						<ul>
                        {
							state.tempDatas[state.currLevel-1].list.map((obj,index)=>{
								return (<li key={index} onClick={self.liClick.bind(self,obj,index)} className={`${state.currItem[props.liValKey] == obj[props.liValKey] ?'curr':''}`} >{obj[props.liTxtKey]}</li>)
							})
						}
                        </ul>
                        </div>
						
					 </div>
				 </div>
             </div>
     	);
  	}
}
Choose.defaultProps = {
	optionTitle: '选择',
    isVisible: false,
	liTxtKey:'name',
	liValKey: 'id'
};

Choose.propTypes = {
	optionTitle: PropTypes.string,
	isVisible: PropTypes.bool,
	liTxtKey:PropTypes.string,
	liValKey: PropTypes.string
}

export default Choose;