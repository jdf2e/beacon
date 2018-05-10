import React from 'react';
class DateTHead extends React.Component {
   	render() {
        const props = this.props;
        const prefixCls = props.prefixCls;
     	return (
                <div className={`${prefixCls}-table-header`}>
                    <span>日</span>
                    <span>一</span>
                    <span>二</span>
                    <span>三</span>
                    <span>四</span>
                    <span>五</span>
                    <span>六</span>
                </div>
 		);
  	}
}
export default DateTHead;