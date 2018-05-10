## Searchbar 搜索框
### 适用终端

仅适用M端

### 基本用法

文字描述基本用法。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
  };  
}
searchCancel(){
	alert('取消搜索');
}
searchInput(e){
	console.log(e);
	console.log('输入回调');
}

render() {    
  return (
    <div className="wrapper">
          <Searchbar onChange={this.searchInput.bind(this)} onCancel={this.searchCancel.bind(this)}/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| textUpdate  | —           | —        | —   | — | — |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |--------- |---------- |
| onCancel  |取消搜索回调函数 | — |
| onChange  |搜索输入回调函数 | 返回输入内容 |

