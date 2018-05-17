## Clipupload 裁切上传组件
### 适用终端

仅适用PC端

### 基本用法

文字描述基本用法。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
    img: '',
    img1: '',
    style: {
      width: 0,
      height: 0
    },
    style1: {
      width: 0,
      height: 0
    },
    headers: {
      'conteny-type': 'json'
    }
  };
  this.d={
    'id': '1123123123'
  }
}
submit(dataURI, width, height) {
  this.setState({
    img: dataURI,
    style: {
      width: width,
      height: height
    }
  })
}
submit1(dataURI, width, height) {
  this.setState({
    img1: dataURI,
    style1: {
      width: width,
      height: height
    }
  })
}
progress(p, file) {
  console.log(p.loaded, p.total);
}
success(data, file) {
  console.log(data);
}

render() {
  return (
    <div className="wrapper">
          <Clipupload
            buttonCls='clipupload-new-cls'
            popCls = 'clipupload-new-pop'
            btnName = '选择图片，未开启上传，固定裁剪框'
            maxSize={500}
            fileKey='key'
            type='post'
            headers={this.state.headers}
            offsetLeft={-100}
            offsetTop={100}
            clipWidth = {150}
            clipHeight = {150}
            resize = {false}
            upload = {false}
            param = {this.d}
            uploadUrl = 'http://aaa.jd.com'
            onSubmit={this.submit.bind(this)}
            onProgress={this.progress.bind(this)}
            onSuccess={this.success.bind(this)}
            />
          <img src={this.state.img} style={this.state.style}/>
          <Clipupload
            buttonCls='clipupload-new-cls'
            popCls = 'clipupload-new-pop'
            btnName = '选择图片，未开启上传，支持可变裁剪框'
            maxSize={500}
            fileKey='key'
            type='post'
            headers={this.state.headers}
            offsetLeft={-100}
            offsetTop={100}
            clipWidth = {150}
            clipHeight = {150}
            resize = {true}
            upload = {false}
            onSubmit={this.submit1.bind(this)}
            />
          <img src={this.state.img1} style={this.state.style1}/>
          <Clipupload
            buttonCls='clipupload-new-cls'
            popCls = 'clipupload-new-pop'
            btnName = '选择图片，开启上传，支持可变裁剪框'
            maxSize={500}
            fileKey='key'
            type='post'
            headers={this.state.headers}
            offsetLeft={-100}
            offsetTop={100}
            clipWidth = {150}
            clipHeight = {150}
            resize = {true}
            upload = {true}
            param = {this.d}
            uploadUrl = 'http://aaa.jd.com'
            onSubmit={this.submit.bind(this)}
            onProgress={this.progress.bind(this)}
            onSuccess={this.success.bind(this)}
            />
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| btnName | 按钮文案 | string| -| 选择图片 | false |
| buttonCls | 按钮容器自定义样式 | string | - | - | false |
| popCls | 弹窗窗口的自定义样式 | string | - | - | false |
| maxSize | 获取后图片的最大容器尺寸（限制区域为一个正方形） | number | - | 500 | false |
| clipWidth | 裁剪尺寸宽度 | number | - | 100 | false |
| clipHeight | 裁剪尺寸高度 | number | - | 100 | false |
| resize | 裁剪窗口是否支持拖拽尺寸 | boolean | - | false | false |
| upload | 裁剪完成后是否上传 | boolean | - | false | false |
| param | 上传时携带的参数（upload为true时生效） | object | - | - | false |
| fileKey | 上传时文件的key值（upload为true时生效） | string | - | - | false |
| uploadUrl | 上传图片的url（upload为true时生效） | string | - | - | false |
| type | 发送请求时，对应param传递数据的方式（upload为true时生效） | string | get或post | - | false |
| headers | 发送请求时，自定义的http请求头（upload为true时生效） | object | - | - | false |
| offsetLeft | 弹窗X轴偏移量 | number | - | 0 | false |
| offsetTop | 弹窗Y轴偏移量 | number | - | 40 | false |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onSubmit(file, width, height) | 当upload为false时，点击确认按钮触发 | file：裁剪部分图片的base64编码，width：裁剪完成图片的宽度，height：裁剪完成图片的高度 |
| onProgress(p, file) | 当upload为true时，裁剪完成自动上传时返回进度信息 |  p: 进度数据包含loaded与total（loaded为已经上传的字节数，total为总字节数 ），file：本次上传的文件|
| onSuccess(data, file) | 当upload为true时，上传成功时触发 | data：接口返回数据，file：本次上传的文件 |