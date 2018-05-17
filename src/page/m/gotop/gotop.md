## Gotop 至顶
### 适用终端

适用M端和PC端

### 基本用法

文字描述基本用法。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
  };  
}

render() {    
  return (
    <div className="wrapper">
        <Gotop onClick={() => {console.log('点击返回顶部回调')}}/>
        <Gotop className="bui-back-top-demo">
          <div className="bui-back-top-demo-content">Top</div>
        </Gotop>
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

