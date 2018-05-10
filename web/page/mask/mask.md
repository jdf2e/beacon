## Mask 遮罩层
### 基本用法

Mask 用于弹窗后遮罩。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
	showMask: false
  }

}

render() {    
  return (
  	
    <div className="wrapper">
        <Button onClick={()=>{this.setState({showMask:true})}}>点我弹出遮罩层</Button>
        <Mask isVisible={this.state.showMask} />
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值     | 默认值  |  是否必输 |
|------------ |-------------- |---------- |----------- |-------- | --------  |
| isVisible   | 是否显示      | boolean   | —          | false   | 否        |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| — | —| — |

