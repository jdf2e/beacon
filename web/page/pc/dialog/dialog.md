## Dialog 对话框 


### 基本用法

Dialog 弹出一个对话框。

<a class="bui-button bui-button-m" href="demo.html#/dialog" target="_blank">新窗口打开</a>

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
        showDialog: false
  };  
}

render() {    
  return (
    <div className="wrapper">
          <Button onClick={()=>{this.setState({showDialog:true})}} type="button">点我弹框</Button>
          <Dialog title='温馨提示' hasCloseBtn={true} isVisible={this.state.showDialog} onClose={()=>{this.setState({showDialog:false})}}>
              <div className="dialog-tit">温馨提示</div>
              <div className="dialog-remind"><i className="i-remind"></i>确定要删除地址吗？</div>
          </Dialog>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| title       | 标题           | string    | — | — | 否 |
| hasCloseBtn | 是否有关闭按钮  | boolean   | — | true | 否 |
| isVisible   | 打开和关闭弹框  | boolean   | — | true | 是 |
| customClass | 弹框的自定义样式名 | string    | — | — | 否 |
| hasCancelBtn| 是否有取消按钮 | boolean    | — | true | 否 |
| hasCancelBtn| 是否有确定按钮 | boolean    | — | true | 否 |
| cancelBtnTxt| 取消按钮文字 | string    | — | 取消 | 否 |
| okBtnTxt    | 确定按钮文字 | string    | — | 确定 | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onClose  | 关闭的回调 | — |
| onOk     | 点击确定按钮的回调 | — |

