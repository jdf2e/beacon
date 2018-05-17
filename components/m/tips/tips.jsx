import React from 'react';
import classnames from 'classnames';
import './tips.scss';
class Tips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipsVisible:this.props.visible,
            tipsStyle:null,
            arrowStyle:null
        }
    }
    //初始化render时不执行，props发生变化时执行
    componentWillReceiveProps({visible}){
        if(visible){
            this.setState({
                tipsVisible:true
            });
        }else{
            this.setState({
                tipsVisible:false
            });
        }
    }

    //按钮点击事件
    handleClick(){
        const self = this;
        const params = self.props;
        let width = this.refs.button.clientWidth;
        let height = this.refs.button.clientHeight;
        let top = height+5;

        this.setState({
            tipsVisible:true,
            tipsStyle:{
                'top':top,
                'width':this.props.width,
                'zIndex':this.props.zIndex
            },
            arrowStyle:{
                'left':params.arrowLeft
            }
        });
    }
    //在初始化render之后只执行一次
    componentDidMount() {
        const self = this;
        if(self.props.eventType == 'hover'){
            self.refs.button.addEventListener('mouseover', (e) =>{
                self.handleClick();
                e.stopPropagation();
            });
            self.refs.button.addEventListener('mouseout', (e) =>{
                self.setState({
                    tipsVisible:false
                });
            });
        }else{
            self.refs.button.addEventListener(self.props.eventType, (e) =>{
                self.handleClick();
                e.stopPropagation();
            });
        }
      }

   	render() {
        const self = this;
        const params = self.props;
        const hasCloseBtn = params.hasCloseBtn;
        const tipsCls = params.tipsCls;
        console.log(tipsCls);
        let cls = classnames({
            'tips':true,
            'tips-hide':!this.state.tipsVisible
        })
     	return (
            <div className="tips-wrapper">
                <div className="button-wrap" ref="button">{params.children}</div>
         		<div className={`tips ${!this.state.tipsVisible ? 'tips-hide' :''} ${params.tipsCls}`} style={self.state.tipsStyle}>
                    <i className="arrow" style={self.state.arrowStyle}></i>
                    {params.hasCloseBtn && <i className="close" onClick={()=>{self.setState({tipsVisible:false})}} >x</i>}
                    {params.content}
         		</div>
            </div>
 		);
  	}
}
Tips.defaultProps = {
    content:'',
    isShow:false,
    arrowLeft:10,
    width:100,
    tipsCls:'',
    eventType:'click',
    hasCloseBtn:true,
    align:'bottom',
    zIndex:10
};

export default Tips;