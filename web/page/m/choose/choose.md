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
    industry:[],
    areaDataList: []
  };  
}

onGetOptionData(item,level) {
  console.log(item,level);
}

setOptionInitData() {
  this.setState({
    industry: [
      {code:1,name:'计算机'},
      {code:2,name:'农业'},
      {code:3,name:'金融业'}
    ]
  })
}

setAreaInitData() {
  this.setState({
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
  })
}

chooseOptionItem(item,level) {
  if(level == 1) {
    this.closeOptions();
  } 
}

chooseAreaItem(item,level) {
  if(level == 1) {
    this.setState({
      areaDataList: [
        {
            "id": 2816,
            "name": "密云区"
        },
        {
            "id": 72,
            "name": "朝阳区"
        },
        {
            "id": 2901,
            "name": "昌平区"
        },
        {
            "id": 2953,
            "name": "平谷区"
        },
        {
            "id": 2800,
            "name": "海淀区"
        },
        {
            "id": 2801,
            "name": "西城区"
        },
        {
            "id": 2802,
            "name": "东城区"
        },
        {
            "id": 2803,
            "name": "崇文区"
        },
        {
            "id": 2804,
            "name": "宣武区"
        },
        {
            "id": 2805,
            "name": "丰台区"
        },
        {
            "id": 2806,
            "name": "石景山区"
        },
        {
            "id": 2807,
            "name": "门头沟"
        },
        {
            "id": 2808,
            "name": "房山区"
        },
        {
            "id": 2809,
            "name": "通州区"
        },
        {
            "id": 3065,
            "name": "延庆县"
        },
        {
            "id": 2810,
            "name": "大兴区"
        },
        {
            "id": 2812,
            "name": "顺义区"
        },
        {
            "id": 2814,
            "name": "怀柔区"
        }
    ]
    })
  }else if(level == 2){
    this.closeArea();
  }
}




//选择面板的关闭由调用方根据数据情况自行控制关闭
closeOptions() {
  this.setState({showOptions:false});
}

//选择面板的关闭由调用方根据数据情况自行控制关闭
closeArea() {
  this.setState({showArea:false});
}

render() {    
  return (
    <div className="wrapper">
          <Button onClick={()=>{this.setState({showOptions:true})}}>选择公司行业</Button>
          <Button onClick={()=>{this.setState({showArea:true})}} style={{marginTop:"10px"}}>选择地区</Button>
          <Choose isVisible={this.state.showOptions} 
          optionTitle="公司行业" 
          liValKey="code" 
          listData={this.state.industry}  
          isLoading={false}
          onInitData={this.setOptionInitData.bind(this)}
          onClickItem={this.chooseOptionItem.bind(this)}  
          onCloseOptions={this.closeOptions.bind(this)}/> 

          <Choose 
          isVisible={this.state.showArea} 
          optionTitle="选择地区" 
          liValKey="id"
          liTxtKey="name"
          listData={this.state.areaDataList}   
          isLoading={false} 
          onInitData={this.setAreaInitData.bind(this)}
          onClickItem={this.chooseAreaItem.bind(this)} 
          onCloseOptions={this.closeArea.bind(this)}/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必输  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| optionTitle | 选择面板标题  | string     | —   | — | 否 |
| isVisible | 是否打开选择面板  | bool     | —   | false| 是 |
| liTxtKey | 列表数据每条记录数据对象用于显示的key | string     | —   | name| 否 |
| liValKey | 列表数据每条记录用于区分记录的key | string     | —   | id| 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onInitData | 组件初始化数据| — |
| onClickItem | 选择选项卡中的某一项时的回调事件| 第一个参数为当前选中的数据，第二个参数为当前操作的选项卡索引值 |
| onCloseOptions | 关闭选项卡时的回调事件| - |

