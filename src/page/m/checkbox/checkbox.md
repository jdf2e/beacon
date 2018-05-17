## Checkbox 多选
### 适用终端

适用M端和PC端

### 基本用法

多选基础显示、可定制样式，原生多选功能。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
  };  
}

checkboxChange(params) {
    this.setState({
        isAgree:params.checked
    })
}

render() {
	let {isAgree} = this.state;    
  return (
    <div className="wrapper">
          <Checkbox checked={isAgree} onChange={this.checkboxChange.bind(this)}>同意《XXXXX》协议</Checkbox>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| value       | 多选对应值    | string    | —   | — | 否 |
| name       | 多选对应名    | string    | —   | — | 否 |
| checked       |  当前多选是否被选中    | bool    | —   | — | 是 |
| custom       |  自定义样式    | string    | —   | — | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange  | 多选值是否勾选改变时回调| 返回当前选择的多选值、是否勾选和名 |

