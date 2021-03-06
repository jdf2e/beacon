## Limitedinfiniteload 无限加载组件
### 基本用法

Limitedinfiniteload 可以指定滚动加载/点击加载

:::demo

```js
constructor(props) {
	super(props);
	this.state = {
		list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20],
		hasMore: true,
		page: 1
	};

}
loadMore(closeLoading, page) {
	const { list } = this.state;
	const latestList = list.slice(list.length - 20);
	const newList = latestList.map(item => item + 20);
	setTimeout(() => {
		(page <= 5)
		?
		this.setState({
			list: [...list, ...newList],
			page: page,
			hasMore: page < 5 ? true : false 
		})
		:
		this.setState({
			hasMore: false
		})
		closeLoading && closeLoading();
	}, 500);

}
clear() {
	this.setState({
		hasMore: true,
		page: 1,
		list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20],
	})
}

render() {
	const { list, hasMore, page } = this.state;
	const items = list.map((item, index) => {
		return (
		    <div key={index} style={{height: '40px', lineHeight: '40px',fontSize: '14px', backgroundColor: '#e1e1e1', marginBottom: '10px', textAlign: 'center'}}>
		        <div>{item}条测试数据</div>
		    </div>
		)
	})

	return (
	    <div className="wrapper" style={{height: '100%', width: '100%'}}>
	    	 <Button type="submit" size="l"  onClick={this.clear.bind(this)}>清空重新加载</Button>
	        <Limitedinfiniteload
	            hasMore={hasMore}
				useWindow={true}
			    loadMore={this.loadMore.bind(this)}
			    page={page}
			>
				{
					items
				}
			</Limitedinfiniteload>
	    </div>
	);
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| hasMore  | 是否还有更多  |   boolean     | 否   | true | 是 |
| threshold   | 指定距离开始执行loadMore|   number      | 是   | 20   | 否 |
| className   | 滚动容器自定义class     |   string      | 是   | 无   | 否 |
| useWindow   | 是否是window，否则是父元素|   boolean     | 是   | true | 否 |
| loader      | 加载中指示器            |   string      | 是   | 无   | 否 |
| unMoreLoader| 加载结束指示器          |   string      | 是   | 无   | 否 |
| initialLoad | 是否初始加载第一屏      |   boolean     | 是   | false| 否 |
| page        | 起始页                  |   boolean     | 是   | true | 否 |
| limitValue  | 第几页开始手动加载      |   number      | 是   | null | 否 |
| limitLoader | 手动加载指示器          |   string      | 是   | 无   | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| loadMore |加载更多回调|加载执行后执行函数|
