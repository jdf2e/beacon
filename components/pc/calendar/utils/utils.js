let Utils = {
	
    //月份和天数不足10 补'0'
    addPreZero : function(n){
    	if(/^0/.test(n)){
    		return n;
    	}
          return (n > 9 ? '' : '0') + n;
    },
    //获取每个月的天数
    getMonthDay : function(year,month){
        if(/^0/.test(month)){
            month = month.split('')[1];
        }
        return [0, 31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    //获取每个月的第一天是周几

    getFirstMonthDay : function(year,month){
        let day = new Date(year+'/'+month).getDay();
        if(day == 0){
            day = 7;
        }
        return day;
    },

    //是否是闰年
    isLeapYear: function(year){
        if (((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)) {
            return true;
        } else { 
            return false; 
        }
    },
    //比较天数
    compareDate : function(date1,date2){
        let startDate = new Date(date1.replace('-', '/').replace('-', '/'));
        let endDate = new Date(date2.replace('-', '/').replace('-', '/'));
        if(startDate<endDate){
            return true;
        }else{
            return false;
        }
        
    },
    //将日期转换为字符串
    dateToStr : function(date,split){
        if(typeof date == 'string'){
            return false;
        }
        let spt = split || '-';

        let y = date.getFullYear();
        let m = this.addPreZero(date.getMonth()+1);
        let d = this.addPreZero(date.getDate());

        return [y,m,d].join(spt);
    },
    getDay : function(i) {
        i = i || 0
        var date = new Date
        var diff = i * (1000 * 60 * 60 * 24)
        date = new Date(date.getTime() + diff)
        return this.dateToStr(date,'-')
    },
    splitDate:function(date){
        return date.split('-');
    }

};

export default Utils;