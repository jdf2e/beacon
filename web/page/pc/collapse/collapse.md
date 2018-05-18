## Collapse 折叠面板

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
	        <Collapse openIndex="1" accordion={false}>
	        	<Collapse.Panel title="标题1" clickEvent={()=>{alert('点击标题1')}}>内容1</Collapse.Panel>
	        	<Collapse.Panel title="标题2">内容2</Collapse.Panel>
	        	<Collapse.Panel title="标题3" disabled={true}>内容3</Collapse.Panel>
	        </Collapse>
			<br/><div>手风琴模式</div><br/>
	        <Collapse openIndex="1" accordion={true} direction="horizon">
	        	<Collapse.Panel title="标题1">内容1</Collapse.Panel>
	        	<Collapse.Panel title="标题2">内容2</Collapse.Panel>
	        	<Collapse.Panel title="标题3">内容3</Collapse.Panel>
	        </Collapse>
	    </div>
  	);
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| openIndex           | 默认打开哪个(从0开始,可用逗号分隔传多个)           | string        | —   | '1' | 否 |
| accordion           | 是否手风琴模式(每次只打开一个)           | boolean        | true/false   | — | 否 |
| title           | 标题html           | html/string        | —   | — | — |
| disabled           | 是否禁用           | boolean        | true/false   | false | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| clickEvent | 点击标题时回调| — |

