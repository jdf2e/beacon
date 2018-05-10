import React from 'react';
import { findDOMNode, createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RenderInBody from './renderInBody';
import './calendar.scss';
import Utils from'./utils/utils.js';
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        const d = this.props.currentDate!=''? new Date(this.props.currentDate) : new Date();
        this.state = {
            visible:this.props.visible,
            currentYear:new Date().getFullYear(),
            currentMonth:Utils.addPreZero((new Date().getMonth()+1)),
            currentDay:Utils.addPreZero(new Date().getDate()),
            selectYear:d.getFullYear(),
            selectMonth:Utils.addPreZero((d.getMonth()+1)),
            selectDay:Utils.addPreZero(d.getDate()),
            historyYear:'',
            historyMonth:'',
            historyDay:'',
            firstDay:'',
            monthDay:'',
            diffX:this.props.diffX,
            diffY:this.props.diffY,
            left:0,
            top:0,
            currentInputId:''
        }
    }
    //在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount(){
    }
    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件在父组件之前执行
    componentDidMount() {
        const self = this;
        const params = self.props;
        this.refreshCalendar();
        document.addEventListener('click',function(e){
        	if(!self.isContain(e.target,self.getByClass('calendar-main')[0]) && self.getByClass('calendar-main')[0]!=e.target && e.target.uid != self.state.currentInputId){
	            self.setState({
	                visible:false
	            });
        	}
        });
    }
    //shouldComponentUpdate(nextProps, nextState){

    //}
    //componentWillUpdate(nextProps, nextState){
    //}

    isContain(obj,parentObj){
    	while(obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
    		if(obj == parentObj){
    			return true;
    		}
    		obj = obj.parentNode;
    	}	
    	return false;
    }	
    componentWillReceiveProps(nextProps){
    	let d = new Date(nextProps.currentDate);
        this.setState({
            visible:nextProps.visible,
            selectYear:d.getFullYear(),
            selectMonth:Utils.addPreZero((d.getMonth()+1)),
            selectDay:Utils.addPreZero(d.getDate()),
        });
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
        this.setState({
            visible:true,
            top:this.state.top,
            left:this.state.left,
            currentInputId:_this.target.uid
        }); 
    }

    //选中某一天
    onSelectDate(item){

        if(item.class == 'disabled' || item.class == 'gray'){
            return false;
        }
        this.setState({
            visible:false,
            selectDay:Utils.addPreZero(item.day)
        },()=>{
            this.props.selectDate && this.props.selectDate(this.state.selectYear+'-'+Utils.addPreZero(this.state.selectMonth)+'-'+Utils.addPreZero(this.state.selectDay));

        });

    }
    refreshCalendar(){
        let{selectYear,selectMonth,selectDay,monthDay,firstDay} = this.state;

        monthDay = Utils.getMonthDay(selectYear,selectMonth);
        firstDay = Utils.getFirstMonthDay(selectYear,selectMonth);


        let inputWrap = this.refs.inputWrap;
        let left = this.getElementLeft(inputWrap)+this.state.diffX;
        let top = this.getElementTop(inputWrap)+this.state.diffY;
        this.setState({
            monthDay:monthDay,
            firstDay:firstDay,
            left:left,
            top:top
        });
    }

    //下一年
    nextYear(){
        let{selectYear,currentYear,selectMonth,selectDay} = this.state;
        selectYear++;

        if(selectYear>currentYear){
            selectMonth = 1;
            selectDay = 1;
             this.setState({
                selectMonth:selectMonth,
                selectDay:Utils.addPreZero(item.day),
                selectYear:selectYear
            },()=>{
                this.refreshCalendar();
            });
        }else{
            this.setState({
                selectYear:selectYear
            },()=>{
                this.refreshCalendar();
            });
        }
    }

    //上一年
    prevYear(){
        let{selectYear} = this.state;
        selectYear--;

        this.setState({
            selectYear:selectYear
        },()=>{
            this.refreshCalendar();
        });
    }
    //上个月
    prevMonth(){
        let{selectYear,selectMonth,selectDay} = this.state;

        selectMonth--;
        if(selectMonth == 0){
            selectMonth = 12;
            selectYear-=1;
        }
        this.setState({
            selectMonth:selectMonth,
            selectYear:selectYear
        },()=>{
            this.refreshCalendar();
        });
    }
    //下个月
    nextMonth(){
        let{selectYear,selectMonth} = this.state;

        if(selectMonth == 12){
            selectMonth = 0;
            selectYear+=1;
        }
        selectMonth++;

        this.setState({
            selectMonth:selectMonth,
            selectYear:selectYear
        },()=>{
            this.refreshCalendar();
        });
    }


   	render() {
        const self = this;
        const params = self.props;
        let { rowNumber, colNumber } = this.props; 
        let{currentYear,currentMonth,currentDay,selectYear,selectMonth,selectDay,firstDay,monthDay} = this.state;
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

        let nDay = 42-firstDay-monthDay;

        let currentText = '';
        let currentClassName='';
        let previousMonthDay = '';

        let previousMonth = selectMonth == 1 ? 12 : selectMonth-1;
        previousMonthDay = Utils.getMonthDay(selectYear,previousMonth);
        for(var i=(previousMonthDay-firstDay+1);i<=previousMonthDay;i++){

            let dateLine = selectYear+'/'+previousMonth+'/'+i;

            if(params.startDate && Utils.compareDate(dateLine,params.startDate) || params.endDate && Utils.compareDate(params.endDate,dateLine)){
               
                monthData.push({'class':'disabled','day':i,'type':'prev'});
            }else{
                monthData.push({'class':'gray','day':i,'type':'prev'});
            }
        }
        for(var i=1;i<=monthDay;i++){

            let currentDate = currentYear+'/'+currentMonth+'/'+currentDay;
            let dateLine = selectYear+'/'+selectMonth+'/'+i;

            if(params.startDate && Utils.compareDate(dateLine,params.startDate) || params.endDate && Utils.compareDate(params.endDate,dateLine)){
                monthData.push({'class':'disabled','day':i,'type':'curr'});

            }else{
                if(selectDay == i){

                    monthData.push({'class':'current','day':i,'type':'curr'});

                }else{
                    monthData.push({'class':'active','day':i,'type':'curr'});
                }
            }
            
        }
        for(var i = 1; i<=nDay;i++){

            let dateLine = selectYear+'/'+(selectMonth+1)+'/'+i;

            if(params.startDate && Utils.compareDate(dateLine,params.startDate) || params.endDate && Utils.compareDate(params.endDate,dateLine)){

                monthData.push({'class':'disabled','day':i,'type':'next'});

            }else{

                monthData.push({'class':'gray','day':i,'type':'next'});

            }
        }
     	return (
     		<div className={wrapClass}>
                <div className="input-wrap" onClick={self.showCalendar.bind(self)} ref="inputWrap">{params.children}</div>
                {this.state.visible && <RenderInBody><div className="calendar-main" style={setPos}>
                        <div className="calendar-header">
                            <div className="top">
                                <em className="prev" onClick={self.prevYear.bind(self,this)}>&lt;&lt;</em><em className="prev" onClick={self.prevMonth.bind(self)}>&lt;</em><em className="year">{this.state.selectYear}</em>年<em className="month">{this.state.selectMonth}</em>月<em className="next" onClick={self.nextMonth.bind(self)}>&gt;</em><em className="next" onClick={self.nextYear.bind(self)}>&gt;&gt;</em>
                            </div>
                            <div className="weekday-name">
                                <span>日</span>
                                <span>一</span>
                                <span>二</span>
                                <span>三</span>
                                <span>四</span>
                                <span>五</span>
                                <span>六</span>
                            </div>
                        </div>
                        <ul className="calendar-body">
                            {
                                monthData.map((item,index)=>{

                                    return <li key={index}><a className={item.class} href="javascript:;" onClick = {self.onSelectDate.bind(self,item)}>{item.day}</a></li>
                                })
                            }
                        </ul>
                    </div></RenderInBody>
                }
     		</div>
 		);
  	}
}
Calendar.defaultProps = {
    startDate:Utils.getDay(0),
    endDate:Utils.getDay(120),
    currentDate:'',
    showOtherMonth:true,
    diffX:0,
    diffY:20,
    zIndex:999,
    selectDate:null,
    startValue:Utils.getDay(0),
    endValue:Utils.getDay(1),
    wrapClass:''
};

Calendar.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    currentDate: PropTypes.string,
    showOtherMonth: PropTypes.bool,
    diffX: PropTypes.number,
    diffY: PropTypes.number,
    zIndex: PropTypes.number,
    selectDate: PropTypes.func
};

export default Calendar;