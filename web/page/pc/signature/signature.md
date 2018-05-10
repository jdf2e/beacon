## Signature 签字
### 适用终端

适用M端和PC端

### 基本用法

文字描述基本用法。

:::demo

```js
constructor(props) {
  super(props);
  this.state = {
  };
}

onConfirm(canvas, data) {
  // 把转的dataURL插入到页面顶部
  let img = document.createElement('img');
  img.src = data;
  document.body.insertBefore(img, document.body.firstChild);
}

render() {
  return (
    <div className="wrapper">
        <Signature onConfirm={this.onConfirm}>
			<p>我是自定义的模块区域</p>
        </Signature>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| className | 自定义class | string | 是 | 空 | 否 |
| lineWidth | 字体宽度 | number | 是 | 2 | 否 |
| type | 转换为dataURL格式（png, jpg）  | string | 是 | 'png' | 否 |
| unSupportTpl | 不支持canvas显示内容 | string | 是 | 空 | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onConfirm | 确认保存 | 参数1：canvas对象； 参数2：canvas转化后的数据 |

