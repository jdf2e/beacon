## Scrolltotop 返回顶部
### 适用终端

适用M端和PC端

### 基本用法

Scrolltotop 组件描述。

1、组件使用场景

页面内容超过一屏时会出现滚动条，当用户在A页面中滚动到页面底部后，此时跳转B页面；成功跳转至B页面会发现页面停留在底部，而我们想要的回滚到页面顶部。

这就是"返回顶部组件"的适用场景。

2、组件使用方法

组件引入之后，直接在入口文件的路由中使用即可。

#### 代码示例
	<HashRouter>
        <Scrolltotop>
            <div className="container">
                <Route path={routePaths.INDEX} exact component={Index} />
                <Route path={routePaths.CARD} component={Card} />
                <Route path={routePaths.BASEINFO} component={BaseInfo} />
            </div>
        </Scrolltotop>
    </HashRouter>
