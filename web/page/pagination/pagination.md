## Pagination 翻页
### 适用终端

仅适用PC端

### 基本用法

文字描述基本用法。

:::demo 

```js
constructor(props) {
    super(props);
    this.state = {
  	
    };  
}
handlePageChanged(current){
	console.log(current);
}
render() { 
    
  return (
    <div className="wrapper">
       
        <Pagination 
            prevBtn={"<"}
            nextBtn={">"}
            current={0}
            total={10}
            visiblePages={5}
            onPageChanged={this.handlePageChanged}
            showGo={true}
        />
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| total       | 总页数         | Number        | —   | — | 是 |
| current       | 当前页         | Number        | —   | — | 是 |
| visiblePages  | 显示几页         | Number        | —   | — | 是 |
| alwaysShowPages  | 一直显示前/后几页         | Number        | 1,2,3   | 1 | 是 |
| showGo  | 是否显示“跳转到第几页”  | Boolean        | —   | false | 否 |
| initFirst  | 加载时是否调用一次回调  | Boolean        | —   | false | 否 |
| prevBtn  | 前一页按钮  | String   | —   | < | 否 |
| nextBtn  | 后一页按钮  | String   | —   | > | 否 |
| cointerWrapClass  | 组件容器className  | String   | —   | pagination | 否 |
| activeClass  | 当前页className  | String   | —   | —  | 否 |


### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onPageChanged | —| current |

