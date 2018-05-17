## Radio 单选
### 适用终端

适用M端和PC端

### 基本用法

单选按钮默认展示界面及模拟原生单选功能。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
  	 sex:1
  };  
}

onChange(radio) {
	if(typeof radio == 'object') {
		for(let key in radio) {
	        this.setState({[key]:radio[key]});
	    }
	}
}

render() {    
  return (
    <div className="wrapper">
          性别：<Radio value="1" name="sex" checked={this.state.sex == 1} onChange={this.onChange.bind(this)}>男</Radio>
          <Radio value="0" name="sex" checked={this.state.sex == 0} onChange={this.onChange.bind(this)}>女</Radio>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| value       | 单选对应值    | string    | —   | — | 是 |
| name       | 单选对应名    | string    | —   | — | 是 |
| checked       |  当前单选是否被选中    | bool    | —   | — | 是 |
| custom       |  自定义样式    | string    | —   | — | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |--------  |---------- |
| onChange  | 单选值改变时回调| 返回当前选择的单选值，或者单选对象{name:value} |

