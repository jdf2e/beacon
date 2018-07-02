import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './choose.scss';
class Choose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			data:[],
			currLevel: 1,//当前tab索引+1，默认显示第一级
			listData:[{"id": 1,"name": "北京"},
                 {"id": 2,"name": "上海"},
                {
                    "id": 3,
                    "name": "天津"
                },
                {
                    "id": 4,
                    "name": "重庆"
                },
                {
                    "id": 5,
                    "name": "河北"
                },
                {
                    "id": 6,
                    "name": "山西"
                },
                {
                    "id": 7,
                    "name": "河南"
                },
                {
                    "id": 8,
                    "name": "辽宁"
                },
                {
                    "id": 9,
                    "name": "吉林"
                },
                {
                    "id": 10,
                    "name": "黑龙江"
                },
                {
                    "id": 11,
                    "name": "内蒙古"
                },
                {
                    "id": 12,
                    "name": "江苏"
                },
                {
                    "id": 13,
                    "name": "山东"
                },
                {
                    "id": 14,
                    "name": "安徽"
                },
                {
                    "id": 15,
                    "name": "浙江"
                },
                {
                    "id": 16,
                    "name": "福建"
                },
                {
                    "id": 17,
                    "name": "湖北"
                },
                {
                    "id": 18,
                    "name": "湖南"
                },
                {
                    "id": 19,
                    "name": "广东"
                },
                {
                    "id": 20,
                    "name": "广西"
                },
                {
                    "id": 21,
                    "name": "江西"
                },
                {
                    "id": 22,
                    "name": "四川"
                },
                {
                    "id": 23,
                    "name": "海南"
                },
                {
                    "id": 24,
                    "name": "贵州"
                },
                {
                    "id": 25,
                    "name": "云南"
                },
                {
                    "id": 26,
                    "name": "西藏"
                },
                {
                    "id": 27,
                    "name": "陕西"
                },
                {
                    "id": 28,
                    "name": "甘肃"
                },
                {
                    "id": 29,
                    "name": "青海"
                },
                {
                    "id": 30,
                    "name": "宁夏"
                },
                {
                    "id": 31,
                    "name": "新疆"
                },
                {
                    "id": 32,
                    "name": "台湾"
                },
                {
                    "id": 84,
                    "name": "钓鱼岛"
                },
                {
                    "id": 52993,
                    "name": "港澳"
                }]
	    };
    }
   	//关闭选择
	closeOptions() {
		if(this.props.onCloseOptions) this.props.onCloseOptions();
	}


	//选中列表中的某一项 i 当前tab
	liClick(obj,i) {
		let self = this;
		let data = self.state.data;
		data[i] = {
			level: i+1,
			liTit: obj[self.props.liTxtKey],
			selectedVal: obj[self.props.liValKey]
		}
		self.setState({data});
		self.getSelectedData(obj,i + 1);
		
		if((i+1)==self.props.level) {
			self.closeOptions();
		} else {
			data[i+1] = {
				level: i + 1 + 1,
				liTit: self.props.liTit
			}
			self.setState({
				currLevel: i + 2
			});
		}
	}

	
	liTitClick(objArray,level) {
		let self = this;
		self.setState({
			currLevel: level
		});
		if(objArray[level-2] && objArray[level-2].selectedVal) {
			self.getSelectedData({[self.props.liValKey]:objArray[level-2].selectedVal},level-1);
		}
	}

    stopProp(e) {
        e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
    }


	getSelectedData(d,level) {
		if(this.props.onGetOptionData) this.props.onGetOptionData(d,level);
	}

	componentDidMount() {
		let self = this;
		let data = [];
		setTimeout(()=>{
			let chooseData = self.props.chooseData;
			let chooseDataName = self.props.chooseDataName;
			let ids = chooseData?chooseData.split('-'):[];
			let names = chooseDataName?chooseDataName.split('-'):[];
			let len = ids.length;
			
			for (let i = 0 ;i < self.props.level;i ++) {
				data.push({
					level: i+1,
					liTit: names[i]?names[i]:self.props.liTit,
					selectedVal: ids[i]?ids[i]:''
				})
			}
			self.setState({
				data
			});
			if(len > 0) {
				self.setState({
					currLevel: len
				});
				setTimeout(()=>{
					self.getSelectedData({[self.props.liValKey]:ids[len-2],[self.props.liTxtKey]:names[len-2]},len -1)
				},1000);
			}
		})
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
								state.data.map((obj,i)=>{
									if(state.currLevel < (i + 1)) return null;
									return <li key={obj.level} className={state.currLevel==(i+1)?'curr':''} onClick={self.liTitClick.bind(self,state.data,obj.level)}>{obj.liTit}</li>
								})
							}
						</ul>
						{
							state.listData.map((item,i)=>{
								if((i+1)!=state.currLevel) return null;
								let lis = [];
								let lisData = props.listData;
								(lisData).map((obj,index)=>{
									lis.push(<li key={index} onClick={self.liClick.bind(self,obj,i)} className={`${item.selectedVal == obj[props.liValKey] ?'curr':''}`} >{obj[props.liTxtKey]}</li>);
								})
								return (<div className="area-tab-con" key={i}>
											<ul>
												{lis}
											</ul>
											{self.props.isLoading && <div className="loading"></div>}
										</div>)
							})
						}
						
					 </div>
				 </div>
             </div>
     	);
  	}
}
Choose.defaultProps = {
	optionTitle: '选择',
    isVisible: false,
	liTit:'请选择',
	liTxtKey:'name',
	liValKey: 'id',
	chooseData: '',
	isLoading: false
};

Choose.propTypes = {
	optionTitle: PropTypes.string,
	isVisible: PropTypes.bool,
	liTit:PropTypes.string,
	liTxtKey:PropTypes.string,
	liValKey: PropTypes.string,
	chooseData: PropTypes.string,
	isLoading: PropTypes.bool
}

export default Choose;