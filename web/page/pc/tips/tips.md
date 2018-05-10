## Tips 组件中文名
### 基本用法

Tips 组件描述。

:::demo 

```js
constructor(props) {
  super(props);

  this.state = {
  	content:'一个小提示,一个小提示,一个小提示,一个小提示',
    width:200,
    tipsCls:'aaa',
    eventType:'click',
    hasCloseBtn:true
  };  
}


render() {    
  return (
    <div className="wrapper">
      <Tips eventType={this.state.eventType} tipsCls={this.state.tipsCls} content={this.state.content} visible={this.state.isShow} arrowLeft={this.state.arrowLeft} width={this.state.width} hasCloseBtn={this.state.hasCloseBtn}> 
      <button type="button">点我弹出提示</button>
      </Tips>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明            | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |--------------   |---------- |-----------   |-------- | --------   |
| content     |tips内容         | string    | —            | —       | 是         |
| isShow      |初始化时是否显示 |boolean    | —            | false   | 否         |
| width       |提示框宽度       |number     | —            | 100     | 否         |
| tipsCls     |新增class        |string     | —            | —       | 否         |
| eventType   |事件类型         |string     | click/hover  | click   | 否         |
| hasCloseBtn |是否有关闭按钮   |boolean    | —            | true    | 否         |
| zIndex      |层级             |number     | —            | 10      | 否         |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| — | —| — |

