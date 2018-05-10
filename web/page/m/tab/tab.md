## Tab 页签切换

### 基本用法

文字描述基本用法。

:::demo

```js
constructor(props) {
  super(props);
  this.state = {
  };
}

select(tabIndex) {
	//选中回调
	alert('选中' + tabIndex);
}

render() {
  return (
    <div className="wrapper">
        <Tab>
			<Panel
            title={'test1'}>
                <p>content 0</p>
            </Panel>
            <Panel
            title={'test2'}
            onTabClick={this.select.bind(this)}>
                <p>content 1</p>
            </Panel>
            <Panel
            title={'test3'}>
                <p>content 2</p>
            </Panel>
		</Tab>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| tabCls | 指定外层包裹元素的className | string | 是 | 无 | 否 |
| linkCls | nav中a标签className | string | 是 | 无 | 否 |
| activeCls | 选中a标签className | string | 是 | 无 | 否 |
| defaultActiveTabIndex | 默认选中第几个tab | number | 是 | 0 | 否 |
| title | tab的名称 | string | 是 | 无 | 否 |
| type | tab的展现形式，默认为横排，需要竖排时 type={'vertical'} | string | 是 | 无 | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onTabClick | 选中tab时执行| —— |


