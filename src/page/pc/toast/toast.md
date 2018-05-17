## Toast 吐司提示


### 基本用法

Toast 弹出一个吐司提示框。

:::demo 

```js
constructor(props) {
  super(props);

  this.state = {
        txt: '我就是一个Toast文案',
        show: false,
        toast: true
  };  
}

render() {    
  return (
    <div className="wrapper">
          <Button onClick={()=>{this.setState({show:true})}} type="button">点我弹出提示</Button>
          <Toast txt={this.state.txt} visible={this.state.show} toast={this.state.toast}></Toast>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| txt         | 显示的内容     | string    | — | — | 否 |
| visible     | 是否显示弹窗   | boolean   | — | false | 是 
| toast       | 确认改变state时为toast，只有为true时，toast才会重绘  | boolean   | — | true | 是 |
| interval    | 显示的时间  | num   | — | 3 | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close    | toast关闭时回调 | — |

