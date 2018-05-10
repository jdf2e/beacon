import React,{Component} from 'react';
import ReactDom from 'react-dom';
class RenderInBody extends React.Component{
    constructor(p){
        super();
    }
    componentDidMount(){//新建一个div标签并塞进body
     this.popup = document.createElement("div");

     this.popup.className="calendar-wrap";
     document.body.appendChild(this.popup);

     this._renderLayer();
    }
    componentDidUpdate() {
        this._renderLayer();
    }
    componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
        ReactDom.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
    }
    _renderLayer(){//将弹层渲染到body下的div标签
        ReactDom.render(this.props.children, this.popup);
    }
    render(){
        return null;
    }
}
export default RenderInBody;