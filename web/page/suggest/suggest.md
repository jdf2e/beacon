## Suggest 输入提示下拉框

### 基本用法

文字描述基本用法。

:::demo

```js
constructor(props) {
  super(props);
  this.state = {
  	data: ['北京','上海','济南']
  };
}

search(val) {
	//用户输入后的操作
	console.log(val);
	/**this.setState({
		data: []
	})**/
}

choose(val) {
	//选中后操作
	alert(val);
}

render() {
  return (
    <div className="wrapper">
          <Suggest
          placeholder="请输入..."
          width="2"
          height="1.5"
          data={this.state.data}
          search={this.search.bind(this)}
          choose={this.choose.bind(this)}
          />
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| wrapCls | 指定外层包裹元素的className | string | 是 | 无 | 否 |
| ulCls | 指定ul的className | string | 是 | 无 | 否 |
| liCls | 指定li的className | string | 是 | 无 | 否 |
| placeholder | 输入框提示 | string | 是 | 'input here' | 否 |
| width | 输入域input宽度，与ul宽度相同 | string | 是 | '2.15',单位rem| 否 |
| height | 数据列表ul高度，超过高度时会出现滚动条 | string | 是 | '2',单位rem | 否 |
| renderNone | 无结果时自定义的提示 | string | 是 | '没有找到' | 否 |
| disabled | 是否禁用 | boolean | 是 | false | 否 |
| data | suggest数据源| array | 是 | 无 | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| search | input的value变化时执行此操作| —— |
| choose | 点击选中后触发| —— |
