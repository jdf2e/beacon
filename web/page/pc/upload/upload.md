## Upload 组件中文名
### 基本用法

Upload 组件描述。

:::demo 

```js
constructor(props) {
  super(props);
  this.state = {
    param: {
      id: 1
    }
  };  
}
startUpload(file) {
  console.log('开始上传');
}
error(msg, file) {
  console.log(msg);
}
onSuccess(data, file) {
  console.log(data);
}
render() {
  return (
    <div className="wrapper">
          <Upload
            cls='upload-new-cls'
            uploadUrl="uploadUrl"
            swfUrl="http://misc.360buyimg.com/virtuals/popui/2.1.6/js/upload/upload.swf"
            multiple={false}
            type='get'
            accept="images/png"
            fileKey="data"
            param={this.state.param}
            fileSizeLimit = {20*1024}
            onStartUpload={this.startUpload.bind(this)}
            onError={this.error.bind(this)}
            onSuccess={this.onSuccess.bind(this)}
          >
          <Button>上传</Button>
          </Upload>
    </div>
  );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| cls         | 外层容器样式 | string | - | - | false |
| accept      | 高本版浏览器的类型限制| string | 参考input file | */* | false |
| ieAccept    | ie浏览器的类型限制   | string  | *.类型后缀 | *.* | false |
| fileSizeLimit | 上传图片的大小限制（单位是kb）| number | - | 10*1024 | false| 
| multiple     | 是否支持多选| boolean | true或false | false | false |
| swfUrl      | swf文件需要放置在研发端，然后提供访问url，本参数需要可访问的url | string | - | - | true |
| uploadUrl   | 上传接口url | string | - | - | true |
| fileKey     | 后端接受文件的key值 | string | - | fileData | true |
| type        | 请求类型，主要针对param参数，文件一定会存在于http协议体中 | string | get、post | get | false |
| param       | 随同文件一起传递的参数 | object | - | - | false |
| headers     | xhr请求时添加的协议头信息 | object | - | - | false |
### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onError(msg, file) | 程序报错时回调 | msg: 错误信息, file：本次上传的文件 |
| beforeFileQueue() | 选择文件前回调 | 无回调参数 |
| onStartUpload(file) | 开始上传时回调 | file：本次上传的文件 |
| onProgress(p, file) | 开始上传时读取进度 | p: 进度数据包含loaded与total（loaded为已经上传的字节数，total为总字节数 ），file：本次上传的文件|
| onSuccess(data, file) | 上传成功时触发 | data：接口返回数据，file：本次上传的文件 |