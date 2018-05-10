## Cascadar 层级选择
### 适用终端

仅适用PC端

### 基本用法

文字描述基本用法。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
    data: [
      {
        id:1,
        name:'中国',
        children: [
          {
            id: 1,
            name: '河北',
            children: [
              {
                id: 11,
                name: '石家庄'
              }
            ]
          },
          {
            id: 2,
            name: '河南'
          }
        ]
      }, 
      {
        id:2,
        name:'美国',
        children: [
          {
            id: 1,
            name: '阿拉斯加'
          },
          {
            id: 2,
            name: '纽约'
          }
        ]
      }
    ]
  };  
}
selectChange(val) {
  console.log(val);
  this.setState();
}

render() {
  return (
    <div className="wrapper">
          <Cascadar
            cls='new-cls'
            defaultTxt='--我是默认文案--'
            data={this.state.data}
            nodeKey='name'
            childKey='children'
            onChange={this.selectChange.bind(this)}/>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| cls         | 自定义样式     | string    |  -   | - | false |
| defaultTxt  | select默认值   | string | - | --请选择-- | false |
| data | 组件需要的数据 | array | - | - | true |
| nodeKey | 主数据字段名 | string | - | n | false |
| childKey | 子数据字段名 | string | - | n | false |


### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | 当最后一个层级点击之后回调 | [object...] 会以数组的形式返回所有层级的选择数据  |

