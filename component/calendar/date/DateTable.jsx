import React from 'react';
import DateTHead from './DateTHead';
import DateTBody from './DateTBody';
class DateTable extends React.Component {

   	render() {
        const props = this.props;
        const prefixCls = props.prefixCls;
     	return (
            <div className={`${prefixCls}-table`}>
                <DateTHead {...props}/>
                <DateTBody {...props}/>
            </div>
 		);
  	}
}

export default DateTable;