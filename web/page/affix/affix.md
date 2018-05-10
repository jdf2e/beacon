## Affix 固钉
### 适用终端

仅适用M&pc端

### 基本用法

文字描述基本用法。

:::demo

```js
constructor(props) {
  super(props);
  this.state = {
  };
}

render() {
  return (
    <div className="wrapper">
          <Affix><div style={{border: '1px solid #eee', lineHeight: '40px', padding: '0 10px', backgroundColor: '#fff'}}>我是固定标题</div></Affix>
          <ul style={{border: '1px solid #eee', lineHeight: '40px', padding: '0 10px', backgroundColor: '#fff'}}>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          	 <li>列表</li>
          </ul>
    </div>
  );
}
```
:::

### Attributes
|参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
|className |占位元素class |string |-- |空 | 否 |
|zIndex |层级 |number |-- |10 | 否 |
|offsetTop |距离顶部定位 |number | --|0 | 否 |
|offsetBottom |距离底部定位 |number |--|undefined | 否 |


### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| — | —| — |

