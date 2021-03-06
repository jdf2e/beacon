## Elevator 电梯楼层组件

### 基本用法

文字描述基本用法。<a href="/demo.html#/m/elevator" class="bui-button">新窗口打开</a>


```js
constructor(props) {
  super(props);
  this.state = {
    dataList:[
            {
              title:"A",
              list:[
                {
                  name:'安其拉',
                  id:'a1'
                },
                {
                  name:'安琪',
                  id:'a2'
                }
              ]
            },
            {
              title:"B",
              list:[
                {
                  name:'卞小明',
                  id:'b1'
                },
                  {
                  name:'卞小页',
                  id:'b2'
                }
              ]
            },
            {
              title:"C",
              list:[
                {
                  name:'陈仙仙',
                  id:'c1'
                },
                {
                  name:'成小龙',
                  id:'c2'
                },
                {
                  name:'程野',
                  id:'c3'
                }
              ]
            },
            {
              title:"D",
              list:[
                {
                  name:'丁小明',
                  id:'d1'
                },
                {
                  name:'丁小龙',
                  id:'d2'
                },
                {
                  name:'丁小野',
                  id:'d3'
                }
              ]
            },
            {
              title:"F",
              list:[
                {
                  name:'冯小明',
                  id:'f1'
                },
                {
                  name:'冯小龙',
                  id:'f2'
                },
                {
                  name:'冯小野',
                  id:'f3'
                }
              ]
            },
            {
              title:"G",
              list:[
                {
                  name:'高小明',
                  id:'g1'
                },
                {
                  name:'高小龙',
                  id:'g2'
                },
                {
                  name:'高小野',
                  id:'g3'
                },
                {
                  name:'高小阳',
                  id:'g4'
                },
                {
                  name:'郭小名',
                  id:'g5'
                }
              ]
            },
            {
              title:"H",
              list:[
                {
                  name:'黄小明',
                  id:'h1'
                },
                {
                  name:'黄小龙',
                  id:'h2'
                },
                {
                  name:'黄小野',
                  id:'h3'
                },
                {
                  name:'郝小阳',
                  id:'h4'
                },
                {
                  name:'郝小名',
                  id:'h5'
                }
              ]
            },
            {
              title:"J",
              list:[
                {
                  name:'贾小明',
                  id:'j1'
                },
                {
                  name:'贾小龙',
                  id:'j2'
                },
                {
                  name:'贾小野',
                  id:'j3'
                },
                {
                  name:'贾小阳',
                  id:'j4'
                },
                {
                  name:'贾小名',
                  id:'j5'
                }
              ]
            },
            {
              title:"K",
              list:[
                {
                  name:'康小明',
                  id:'k1'
                },
                {
                  name:'康小龙',
                  id:'k2'
                },
                {
                  name:'康小野',
                  id:'k3'
                },
                {
                  name:'康小阳',
                  id:'k4'
                },
                {
                  name:'康小名',
                  id:'k5'
                }
              ]
            },
            {
              title:"L",
              list:[
                {
                  name:'李小明',
                  id:'l1'
                },
                {
                  name:'李小龙',
                  id:'l2'
                },
                {
                  name:'李小野',
                  id:'l3'
                },
                {
                  name:'李小阳',
                  id:'l4'
                },
                {
                  name:'李小名',
                  id:'l5'
                }
              ]
            },
          ]
  };  
}
clickNav(title,index){
  console.log(title,index);
}
clickList(list,index){
  console.log(list,index);
}
render() {    
  return (
    <div className="wrapper">
          <Elevator dataArray={this.state.dataList}  
        showIndicator={true}
        navHeight={0.4}
        initIndex={0} 
        hiddenTime={500}
        clickNav={(list,item)=>{this.clickNav(list,item)}}
        clickList={(list,index)=>{this.clickList(list,index)}}
/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| dataArray  |渲染楼层数据，为必填项| Array | —   | — | 必填 |
| showIndicator |是否显示索引值提示符| Boolean |true/false   |true| 否 |
| hiddenTime  |索引值提示符显示的时间，单位ms| Number |  —   | 500| 否 |
| navHeight  |索引栏每个索引区域的高度，单位rem| Number |   — | 0.4 | 否 |
| initIndex  |进入页面后，当前定位到的索引值| Number |—   | 0 | 否 |


### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| clickNav | 点击/离开索引栏时的回调函数| 返回点击的title和索引值 |
| clickList | 点击左侧列表时的回调函数| 返回点击的对象数据和索引值 |

