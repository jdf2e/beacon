## Choose 抽屉式多级选择
### 基本用法

Choose 组件描述。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
    showOptions: false,
    showArea: false,
    industry:[
      {code:1,name:'计算机'},
      {code:2,name:'农业'},
      {code:3,name:'金融业'}
    ]
  };  
}

onGetOptionData(item,level) {
  console.log(item,level);
}


render() {    
  return (
    <div className="wrapper">
          <Button onClick={()=>{this.setState({showOptions:true})}}>选择公司行业</Button>
          <Button onClick={()=>{this.setState({showArea:true})}} style={{marginLeft:"10px"}}>选择地区</Button>
          <Choose isVisible={this.state.showOptions} optionTitle="公司行业" level="1" liValKey="code" lis1={this.state.industry} async="true" isLoading={false} onCloseOptions={()=>{this.setState({showOptions:false})}} onGetOptionData={this.onGetOptionData.bind(this)}/> 
          <Choose isVisible={this.state.showArea} optionTitle="选择地区" level="3" liValKey="code" async="true" isLoading={false} onCloseOptions={()=>{this.setState({showArea:false})}} isJDArea={true}/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| —           | —           | —        | —   | — | — |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| — | —| — |

