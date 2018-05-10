## Flippage 动画滑屏翻页组件

### 适用终端

仅适用M端

### 基本用法

文字描述基本用法。

:::demo

```js
constructor(props) {
    super(props);
    this.state = {
        imageData: [
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/loading.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ani1.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ren1.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ren12.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ren13.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ani2.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ren2.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/arm.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ani3.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/ren3.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/wu1.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/bg2.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/light.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/weapon1.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/weapon2.png',
            'https://h5.m.jd.com/dev/Grz54kqmBGyKuQE2Kugjh3Cff33/pages/319194/img/weapon3.png',
        ],
        isLoading: true,
        total: 5,
        page: 1,
        style: {
            position: 'fixed',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            color: '#fff',
        },
        itemStyle: {
            height: '100%',
            backgroundColor: '#333',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
        loadingStyle: {
            backgroundColor: '#000',
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
        timer: null,
        process: 0
    }
}

handleComplete() {
    console.log('complete');
    setTimeout(() => {
        this.setState({
            loadingStyle: {
                opacity: 0,
                zIndex: -1,
                backgroundColor: '#000',
                position: 'absolute',
                height: '100%',
                width: '100%',
            },
            isLoading: false
        });
    }, 3000)
}

process() {
    this.timer = setTimeout(() => {
        let process = this.state.process < 100 ? this.state.process + 1 : 100;
        this.setState({
            process: process
        });
        this.process();
    }, 0);
}

handleChange(process) {
    process = Math.floor(process);
    console.log(process);
    this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.setState({
            process: process
        }, () => {
            this.process();
        });
    }, 0);
}

handleSwitch(page) {
    console.log(page);
}

render() {
    const {
        imageData,
        page,
        total,
        isLoading,
        style,
        loadingStyle,
        itemStyle,
        process
    } = this.state;
    return (
        <div className="wrapper" style={style}>
        <Flippage
            imageData={imageData}
            page={page}
            total={total}
            isLoading={isLoading}
            onComplete={this.handleComplete.bind(this)}
            onChange={this.handleChange.bind(this)}
            onSwitch={this.handleSwitch.bind(this)}
          >
            <div className="loading-inner" style={loadingStyle}>loading{process}%</div>
            <div className="page" style={itemStyle}>1</div>
            <div className="page" style={itemStyle}>2</div>
            <div className="page" style={itemStyle}>3</div>
            <div className="page" style={itemStyle}>4</div>
            <div className="page" style={itemStyle}>5</div>
        </Flippage>
    </div>
    );
}
```
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| imageData | 提前加载的图片  | Array     | —   | — | 否 |
| page | 初始显示第几页动画  | Number     | —   | 1 | 否 |
| total | 滑屏页数  | Number     | —   | 1 | 否 |
| isVisted | 是否访问过，为true可以禁止imageData里面图片重复加载，配合page参数可直接滚动到指定页。适合场景例如：登录之后跳转到当前页 | Boolean     | true/false   | false  | 否 |
| isLoading | loading动画执行完毕，应把该值置为true  | Boolean| true/false   | false  | 是 |
| easeFunction | 翻页动画规定的速度曲线  | String     | —   | cubic-bezier(0.15, 0.3, 0.25, 1) | 否 |
| duration | 翻页动画规定完成动画所花费的时间  | String     | —   | 0.35s | 否 |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange |imageData里面图片加载每完成一个执行回调函数| 返回imageData里面图片加载的进度|
| onComplete |imageData里面图片全部加载完成执行回调函数| —|
| onSwitch |每次翻页执行回调函数| 返回翻页之后当前页的页码|

