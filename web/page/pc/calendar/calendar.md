## Calendar 组件中文名
### 基本用法

Calendar 组件描述。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
  	isOpen:false,
    startOpen:false,
    endOpen:false,
    startValue:'',
    endValue:'',
    diffX:20,
    diffY:20,
    zIndex:100,
    wrapClass:'aaa',
    inputValue:'2018-04-19'
  };  
}


onChange(value){
  this.setState({
      inputValue:value,
      isOpen:false
  });
}
onStartChange(value){
    this.setState({
      startOpen:false,
      startValue:value,
      endValue:value
  });
}
onEndChange(value){
  this.setState({
    endValue:value,
    endOpen:false
  });
}

render() {  
  const state = this.state;
  return (
    <div className="wrapper">
        <Calendar visible={state.isOpen} wrapClass={state.wrapClass} currentDate={state.inputValue} selectDate={this.onChange.bind(this)} diffX = {state.diffX} diffY ={state.diffY} zIndex={state.zIndex} startDate={'2018-4-17'}>
    		  <input type="text" placeholder="" value={state.inputValue} readOnly ref="date"/>
        </Calendar>
        <Calendar visible={state.startOpen} currentDate={state.startValue} selectDate={this.onStartChange.bind(this)} >
      		<input type="text" placeholder="开始日期" readOnly ref="dateStart" value={state.startValue}/>
        </Calendar>
        <Calendar visible={state.endOpen} currentDate={state.endValue} selectDate={this.onEndChange.bind(this)} startDate={state.startValue} endDate={state.endDate}>
         	<input type="text" placeholder="结束日期"  readOnly  ref="dateEnd" value={state.endValue} />
        </Calendar>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| startDate        | 开始日期  YYYY-MM-DD       | string       | 无  | null | 否 |
| endDate        | 结束日期  YYYY-MM-DD       | string       | 无  | null | 否 |
|      currentDate   | 当前选中日期 YYYY-MM-DD        | string       | 无  | input值>new Date() | 否 |
|      startOpen   | 打开开始日期日历弹层        | boolean       | 无  | false | 否 |
|      endOpen   | 打开结束日期日历弹层        | boolean       | 无  | false | 否 |
|      isOpen   | 打开日历弹层        | boolean       | 无  | false | 否 |
|      diffX   | X方向偏移        | number       | 无  | 0 | 否 |
|      diffY   | Y方向偏移        | number       | 无  | 20 | 否 |
|      zIndex   | 日历弹层层级     | number       | 无  | 999 | 否 |
|      wrapClass   | 日历最外层class        | string       | 无  | 无 | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| selectDate | 选择日期时触发回调| value |

