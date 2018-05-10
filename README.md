# Beacon-UI

> 基于react的组件库 1.0.0

## Build Setup

``` bash
# 安装依赖
npm install

# 新建组件
npm run create

*   组件类型有四种 show:'基础展示';dynamic: '交互功能';util: '工具';business: '业务定制';

*   组件适用客户端有三种 M:'仅适用M端';PC: '仅适用PC端';M&PC: 'M端和PC端均适用'

# 启动项目
npm run dev

# 打包
npm run build
```

*   如果项目需要兼容华为等手机自带的部分低端浏览器请在 router.jsx 中引入“babel-polyfill”
```
import babel-polyfill
```
副作用是使压缩后的代码体积增大90k左右

