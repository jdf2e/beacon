import React from 'react';
import { findDOMNode, createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RenderInBody from './renderInBody';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import './calendar.scss';
import Utils from'./utils/utils.js';
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = this.props.currentDate != '' ? this.props.currentDate : Utils.dateToStr(new Date(),'-');
        this.state = {
            visible:this.props.visible,
            diffX:this.props.diffX,
            diffY:this.props.diffY,
            currentInputId:'',
            currentDate:currentDate,
            prefixCls:'calendar'
        }
    }
    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件在父组件之前执行
    componentDidMount() {
        const self = this;
        const params = self.props;
        document.addEventListener('click',function(e){

        	if(!self.isContain(e.target,self.getByClass('calendar-main')[0]) && self.getByClass('calendar-main')[0]!=e.target && e.target.uid && self.state.currentInputId && e.target.uid != self.state.currentInputId || (!self.isContain(e.target,self.getByClass('calendar-main')[0]) && self.state.currentInputId && e.target.uid != self.state.currentInputId)){
	            self.setState({
	                visible:false
	            });
        	}

        });
    }
    componentWillReceiveProps(nextProps){
        let currentDate = nextProps.currentDate != '' ? nextProps.currentDate : Utils.dateToStr(new Date(),'-');
        this.setState({
            visible:nextProps.visible,
            currentDate:currentDate
        });
    }
    isContain(obj,parentObj){
    	while(obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
    		if(obj == parentObj){
    			return true;
    		}
    		obj = obj.parentNode;
    	}	
    	return false;
    }	
    getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}

　　　　return actualLeft;
　　}

　　getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}

　　　　return actualTop;
　　}

    getByClass(cls){
      var res = [];  //存放匹配结果的数组
      var ele = document.getElementsByTagName('*');
      for(var i = 0; i < ele.length; i++){
        if(ele[i].className == cls){
          res.push(ele[i]);
        }
      }
      return res;
    }

    //显示日历
    showCalendar(_this){
    	_this.target.uid=new Date().getTime();
        let inputWrap = this.refs.inputWrap;
        let left = this.getElementLeft(inputWrap)+this.state.diffX;
        let top = this.getElementTop(inputWrap)+this.state.diffY;
        this.setState({
            visible:true,
            top:top,
            left:left,
            currentInputId:_this.target.uid
        }); 
    }

    onValueChange(obj){
        let currentDate = obj.selectYear+'-'+obj.selectMonth;

        this.setState({
            currentDate:currentDate
        });
        
    }

   	render() {
        const self = this;
        const params = self.props;
        let {onValueChange,selectDate} = this.props;
        let{currentDate,prefixCls} = this.state;
        let monthData = [];
        let list = [];
        let wrapClass = classnames({
            'bui-calendar':true,
            [params.wrapClass]:true
        })
        let setPos = {
            left:this.state.left,
            top:this.state.top,
            'zIndex':params.zIndex
        }
     	return (
     		<div className={wrapClass}>
                <div className="input-wrap" onClick={self.showCalendar.bind(self)} ref="inputWrap">{params.children}</div>
                {this.state.visible && <RenderInBody><div className="calendar-main" style={setPos}>
                		<CalendarHeader
                			prefixCls={prefixCls}
                            currentDate={currentDate}
                            onValueChange={self.onValueChange.bind(self)}
                		/>
                        <DateTable
                        	prefixCls = {prefixCls}
                        	selectDate = {selectDate}
                            currentDate={currentDate}
                            startDate = {params.startDate}
                            endDate = {params.endDate}
                        />
                    </div></RenderInBody>
                }
     		</div>
 		);
  	}
}
Calendar.defaultProps = {
    startDate:'',
    endDate:'',
    currentDate:'',
    diffX:0,
    diffY:20,
    zIndex:999,
    selectDate:null,
    wrapClass:''
};

Calendar.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    currentDate: PropTypes.string,
    diffX: PropTypes.number,
    diffY: PropTypes.number,
    zIndex: PropTypes.number,
    selectDate: PropTypes.func,
    wrapClass: PropTypes.string,
};

export default Calendar;