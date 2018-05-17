## Input 输入框

### 基本用法

文字描述基本用法。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
  };  
}

onChange(e) {
  console.log(e.target.value)
}

render() {    
  return (
    <span className="wrapper">
          <Input type="text" placeholder="我是提示文字" onChange={this.onChange.bind(this)}/>
    </span>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| placeholder | input中需要展示的placeholer| string | —   | — | 否 |
| value | input的value| string | —   | — | 否 |
| defaultValue | input的defaultValue| string | —   | — | 否 |
| custom | 自定义样式，如果设置此参数，那么组件默认样式将会完全消失| string | —   | — | 否 |


### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | input的onChange事件| event |
| onBlur | input的onBlur事件| event |
| onFocus | input的onFocus事件| event |

