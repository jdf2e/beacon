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
    ],
    areaDataList: [{"id": 1,"name": "北京"},
                 {"id": 2,"name": "上海"},
                        {
                            "id": 3,
                            "name": "天津"
                        },
                        {
                            "id": 4,
                            "name": "重庆"
                        },
                        {
                            "id": 5,
                            "name": "河北"
                        },
                        {
                            "id": 6,
                            "name": "山西"
                        },
                        {
                            "id": 7,
                            "name": "河南"
                        },
                        {
                            "id": 8,
                            "name": "辽宁"
                        },
                        {
                            "id": 9,
                            "name": "吉林"
                        },
                        {
                            "id": 10,
                            "name": "黑龙江"
                        },
                        {
                            "id": 11,
                            "name": "内蒙古"
                        },
                        {
                            "id": 12,
                            "name": "江苏"
                        },
                        {
                            "id": 13,
                            "name": "山东"
                        },
                        {
                            "id": 14,
                            "name": "安徽"
                        },
                        {
                            "id": 15,
                            "name": "浙江"
                        },
                        {
                            "id": 16,
                            "name": "福建"
                        },
                        {
                            "id": 17,
                            "name": "湖北"
                        },
                        {
                            "id": 18,
                            "name": "湖南"
                        },
                        {
                            "id": 19,
                            "name": "广东"
                        },
                        {
                            "id": 20,
                            "name": "广西"
                        },
                        {
                            "id": 21,
                            "name": "江西"
                        },
                        {
                            "id": 22,
                            "name": "四川"
                        },
                        {
                            "id": 23,
                            "name": "海南"
                        },
                        {
                            "id": 24,
                            "name": "贵州"
                        },
                        {
                            "id": 25,
                            "name": "云南"
                        },
                        {
                            "id": 26,
                            "name": "西藏"
                        },
                        {
                            "id": 27,
                            "name": "陕西"
                        },
                        {
                            "id": 28,
                            "name": "甘肃"
                        },
                        {
                            "id": 29,
                            "name": "青海"
                        },
                        {
                            "id": 30,
                            "name": "宁夏"
                        },
                        {
                            "id": 31,
                            "name": "新疆"
                        },
                        {
                            "id": 32,
                            "name": "台湾"
                        },
                        {
                            "id": 84,
                            "name": "钓鱼岛"
                        },
                        {
                            "id": 52993,
                            "name": "港澳"
                        }]
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
          <Choose isVisible={this.state.showOptions} 
          optionTitle="公司行业" 
          level="1" 
          liValKey="code" 
          listData={this.state.industry} 
          async="true" 
          isLoading={false}  
          onCloseOptions={()=>{this.setState({showOptions:false})}} 
          onGetOptionData={this.onGetOptionData.bind(this)}/> 

          <Choose 
          isVisible={this.state.showArea} 
          optionTitle="选择地区" 
          level="3" 
          liValKey="code"
          listData={this.state.areaDataList}  
          async="true" 
          isLoading={false} 
          onCloseOptions={()=>{this.setState({showArea:false})}}/>
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

