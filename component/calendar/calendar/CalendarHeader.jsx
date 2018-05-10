import React from 'react';
import PropTypes from 'prop-types';
import Utils from'./../utils/utils.js';
class CalendarHeader extends React.Component {
    constructor(props) {
        super(props);

        let currentDate = this.props.currentDate != '' ? this.props.currentDate : Utils.dateToStr(new Date(),'-');
        let d = new Date(currentDate);
        this.state = {
            selectYear:d.getFullYear(),
            selectMonth:Utils.addPreZero((d.getMonth()+1)),
            selectDay:Utils.addPreZero(d.getDate()),
        }
    }
    componentWillReceiveProps(nextProps){
        let currentDate = nextProps.currentDate;
        this.setState({
            currentDate:currentDate,
            selectYear : Utils.splitDate(currentDate)[0],
            selectMonth : Utils.splitDate(currentDate)[1]
        });
    }
    //下一年
    nextYear(){
        let{selectYear,selectMonth,selectDay} = this.state;
        selectYear++;

        selectMonth = 1;
        selectDay = 1;
         this.setState({
            selectMonth:Utils.addPreZero(selectMonth),
            selectDay:Utils.addPreZero(selectDay),
            selectYear:selectYear
        },()=>{
            this.props.onValueChange && this.props.onValueChange(this.state);
        });
    }

    //上一年
    prevYear(){
        let{selectYear} = this.state;
        selectYear--;

        this.setState({
            selectYear:selectYear
        },()=>{
            this.props.onValueChange && this.props.onValueChange(this.state);
        });
    }
    //上个月
    prevMonth(){
        let{selectYear,selectMonth,selectDay} = this.state;

        selectMonth--;
        if(selectMonth == 0){
            selectMonth = 12;
            selectYear--;
        }
        this.setState({
            selectMonth:Utils.addPreZero(selectMonth),
            selectYear:selectYear
        },()=>{
            this.props.onValueChange && this.props.onValueChange(this.state);
        });
    }
    //下个月
    nextMonth(){
        let{selectYear,selectMonth} = this.state;
        if(selectMonth == 12){
            selectMonth = 0;
            selectYear++;
        }
        selectMonth++;

        this.setState({
            selectMonth:Utils.addPreZero(selectMonth),
            selectYear:selectYear
        },()=>{
            this.props.onValueChange && this.props.onValueChange(this.state);
        });
    }


   	render() {
        const self = this;
        const params = self.props;
        let { prefixCls } = this.props; 
        let{selectYear,selectMonth,selectDay} = this.state;
        let monthData = [];
        let list = [];
        
     	return (
            <div className={`${prefixCls}-header`}>
                <em className="prev" onClick={self.prevYear.bind(self,this)}>&lt;&lt;</em>
                <em className="prev" onClick={self.prevMonth.bind(self)}>&lt;</em>
                <em className="year">{selectYear}</em>年
                <em className="month">{selectMonth}</em>月
                <em className="next" onClick={self.nextMonth.bind(self)}>&gt;</em>
                <em className="next" onClick={self.nextYear.bind(self)}>&gt;&gt;</em>
            </div>
 		);
  	}
}

export default CalendarHeader;