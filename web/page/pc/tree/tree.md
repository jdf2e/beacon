## Tree 树

### 基本用法

根据数据展示无限级别的树结构。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
    parts:[{
        "id": 3612,
        "departmentName": "京东小易",
        "parentDepartmentId": 0,
        "parentDepartmentName": null,
        "memberCount": 41,
        "departmentCount": 7,
        "url": null,
        "expand": false,
        "nodes": [{
                "id": 3616,
                "departmentName": "测试部",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 5,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": null
            },
            {
                "id": 3614,
                "departmentName": "产品部",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 3,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": null
            },
            {
                "id": 3613,
                "departmentName": "技术部",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 11,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": null
            },
            {
                "id": 3657,
                "departmentName": "金融部",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 0,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": null
            },
            {
                "id": 3615,
                "departmentName": "项目管理部",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 5,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": null
            },
            {
                "id": 3656,
                "departmentName": "运营部",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 3,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": null
            },
            {
                "id": 3658,
                "departmentName": "智能货柜",
                "parentDepartmentId": 3612,
                "parentDepartmentName": "京东小易",
                "memberCount": 1,
                "departmentCount": 0,
                "url": null,
                "expand": false,
                "nodes": [
                        {
                            "id": 3659,
                            "departmentName": "京彩柜",
                            "parentDepartmentId": 3658,
                            "parentDepartmentName": "京东小易",
                            "memberCount": 1,
                            "departmentCount": 0,
                            "url": null,
                            "expand": false,
                            "nodes": null
                        },
                        {
                            "id": 3660,
                            "departmentName": "京喜柜",
                            "parentDepartmentId": 3658,
                            "parentDepartmentName": "京东小易",
                            "memberCount": 3,
                            "departmentCount": 0,
                            "url": null,
                            "expand": false,
                            "nodes": null
                        }
                    ]
            }
        ]
    }]
  };  
}

clickNode() {

}

render() {    
  return (
    <div className="wrapper">
          <Tree jsonData = {this.state.parts} onClickNode={this.clickNode.bind(this)}/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| jsonData    | 树的数据结构   | array    | —   | — | 是 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onClickNode | 点击某一项时的回调| — |

