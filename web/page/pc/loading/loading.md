## Loading 加载中
### 基本用法

Loading 组件描述。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
    display: false,
    loading: false
  };  
}

render() {
  let divStyle = {
    width: '100%',
    height: '260px',
    border: '1px solid #ccc',
    marginTop: '5px'
  };  
  return (
    <div className="wrapper">
          <h3>为指定容器添加loading</h3>
          <button onClick= {() => {alert(111); console.log(this); this.setState({display: true})}}>容器加loading</button>
          <Loading show={this.state.display}>
            <div style={divStyle}>为指定容器添加loading{this.state.display}</div>
          </Loading>
          <h3>为全局添加loading</h3>
          <button onClick= {() => {alert(222); console.log(this); this.setState({loading: true})}}>设置全局loading</button>
          <Loading show={this.state.loading} float/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| show        | 显示控制       |Boolean    |true/false  | false   | 否      |
| float       | 是否全局loading       |Boolean    |true/false  | false   | 否      |
| height      | 设置loading框的高度。否则使用默认高度     |Number    |  | 200   | 否      |
| src         | loading动画图       |String    |        |         | 否     |
| className         | 自定义额外类名       |String    |        |   空      | 否     |
| containerClass         | 自定义额外类名，外部包裹的容器使用       |String    |        |      空   | 否     |
| zIndex         | 设置z-index       |Number    |        |   9999      | 否     |

