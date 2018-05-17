import React from 'react';
import Utils from'./../utils/utils.js';
class DateTBody extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = this.props.currentDate != '' ? this.props.currentDate : Utils.dateToStr(new Date(),'-');
        this.state = {
            currentDate:currentDate,
            selectYear : Utils.splitDate(currentDate)[0],
            selectMonth : Utils.splitDate(currentDate)[1]
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

    //选中某一天
    onSelectDate(item){

        let {selectYear,selectMonth} = this.state;
        if(item.class == 'disabled' || item.class == 'gray'){
            return false;
        }
        this.props.selectDate && this.props.selectDate(selectYear+'-'+Utils.addPreZero(selectMonth)+'-'+Utils.addPreZero(item.day));

    }


   	render() {
        const self = this;
        const params = self.props;
        let { prefixCls} = this.props; 
        let {currentDate,selectYear,selectMonth} = this.state;
        let monthData = [];

        let monthDay = Utils.getMonthDay(selectYear,selectMonth);
        let firstDay = Utils.getFirstMonthDay(selectYear,selectMonth);
        selectMonth = parseInt(selectMonth);
        let nDay = 42-firstDay-monthDay;

        let currentText = '';
        let currentClassName='';
        let previousMonthDay = '';

        let previousMonth = selectMonth == 1 ? 12 : selectMonth-1;
        let nextMonth = (selectMonth+1) == 13 ? 1 :selectMonth+1;

        previousMonthDay = Utils.getMonthDay(selectYear,previousMonth);
        for(var i=(previousMonthDay-firstDay+1);i<=previousMonthDay;i++){

            let dateLine = selectYear+'/'+previousMonth+'/'+i;

            if((params.startDate && Utils.compareDate(dateLine,params.startDate)) || (params.endDate && Utils.compareDate(params.endDate,dateLine))){
                monthData.push({'class':'disabled','day':i,'type':'prev'});
            }else{
                monthData.push({'class':'gray','day':i,'type':'prev'});
            }
        }
        for(var i=1;i<=monthDay;i++){

            let dateLine = selectYear+'/'+selectMonth+'/'+i;
            if((params.startDate && Utils.compareDate(dateLine,params.startDate)) || (params.endDate && Utils.compareDate(params.endDate,dateLine))){
                monthData.push({'class':'disabled','day':i,'type':'curr'});

            }else{
                if(i!=1 && !Utils.compareDate(dateLine,currentDate) && !Utils.compareDate(currentDate,dateLine)){
                    monthData.push({'class':'current','day':i,'type':'curr'});

                }else{
                    monthData.push({'class':'active','day':i,'type':'curr'});
                }
            }
            
        }
        for(var i = 1; i<=nDay;i++){

            let dateLine = selectYear+'/'+nextMonth+'/'+i;
            if((params.startDate && Utils.compareDate(dateLine,params.startDate)) || (params.endDate && Utils.compareDate(params.endDate,dateLine))){

                monthData.push({'class':'disabled','day':i,'type':'next'});

            }else{
                monthData.push({'class':'gray','day':i,'type':'next'});

            }
        }
     	return (
                <ul className={`${prefixCls}-table-body`}>
                    {
                        monthData.map((item,index)=>{

                            return <li key={index}><a className={item.class} href="javascript:;" onClick = {self.onSelectDate.bind(self,item)}>{item.day}</a></li>
                        })
                    }
                </ul>
 		);
  	}
}

export default DateTBody;