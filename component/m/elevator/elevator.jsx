import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './elevator.scss';
class Elevator extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                navListHeight : this.props.navHeight,
                wrapHeight:'500',
                currTitle:'',
                currBox:false,
            }
        }
        componentDidMount(){
            this.initPage();
        }
        initPage(){
            let innerHeight = document.documentElement.clientHeight;
            let ratio = this.getFontSize();
            this.setState({
                wrapHeight:innerHeight/ratio
            });
            let initIndex = this.props.dataArray[this.props.initIndex].title;
            setTimeout(()=>{
                document.getElementById(initIndex).scrollIntoView();
            },80);
        }
        clickNav(title,index){
            this.setState({
                currBox:true
            });
            setTimeout(()=>{
                this.setState({
                    currBox:false
                });
            },this.props.hiddenTime);
            this.moveFun(title,index);
        }
        moveFun(title,index){

           let titleBox = document.getElementById(title);

           titleBox.scrollIntoView();
        }
        getStyle(element, attr) {
            if(element.currentStyle) {
                    return element.currentStyle[attr];
            } else {
                    return getComputedStyle(element, false)[attr];
            }
        }
        getFontSize(){
            let htmlDom = document.getElementsByTagName('html')[0];
            let bili = this.getStyle(htmlDom,'fontSize');
            return bili.substring(0,bili.length-2);
        }
        onPointerEnd(e){
            let ratio = this.getFontSize();//获取rem的比例
            var e = e || window.event;
            let dataArrayLength = this.props.dataArray.length;
            let navHeight = document.getElementById('nut-elevator-nav').clientHeight;
            let navTop = document.getElementById('nut-elevator-nav').offsetTop;
            let navOffsetTop=navTop-navHeight/2 ;//nav距离顶部的距离
            let eTop =  e.changedTouches[0].pageY;
            let navIndex = parseInt((eTop - navOffsetTop)/this.props.navHeight/ratio);
            setTimeout(()=>{
                this.setState({
                    currBox:false
                });
            },this.props.hiddenTime);
            if(navIndex<dataArrayLength && navIndex>=0){     
            this.props.clickNav(this.props.dataArray[navIndex].title, navIndex);           
            }
        }
        onPointerMove(e){
            let ratio = this.getFontSize();
            var e = e || window.event;
            let dataArrayLength = this.props.dataArray.length;
            let navHeight = document.getElementById('nut-elevator-nav').clientHeight;
            let navTop = document.getElementById('nut-elevator-nav').offsetTop;
            let navOffsetTop=navTop-navHeight/2; //nav距离顶部的距离
            let eTop =  e.targetTouches[0].pageY;
            let navIndex = parseInt((eTop - navOffsetTop)/this.props.navHeight/ratio);
            if(navIndex<dataArrayLength && navIndex>=0){
                this.moveFun(this.props.dataArray[navIndex].title,navIndex);
                this.setState({
                    currBox:true,
                    currTitle:this.props.dataArray[navIndex].title,
                });
            }
        }
        clickList(lists,idx){
            this.props.clickList(lists,idx);
        }
        
    render() {
        let cls = classnames({
        })
        return (
            <div className="nut-elevator" id="nut-elevator" style={{height:this.state.wrapHeight+'rem'}}>
                <ul className="nut-elevator-ul" ref="nut-elevator-ul">
                    {
                       this.props.dataArray.map((item,index)=>{
                        return (
                            <li 
                            key={item.title}
                            className="nut-list-title" 
                            >
                            <h3 className="nut-list-h" id={item.title}>{item.title}</h3>
                            <ul className="nut-people-list">
                                {
                                    item.list.map((lists,idx)=>{
                                        return (
                                            <li className="nut-list-name"
                                            key={idx}
                                            id={lists.id?lists.id:item.title+idx}
                                            onClick={()=>{this.clickList(lists,idx)}}
                                            >
                                                {lists.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            </li>
                        )
                       }) 
                    } 
                </ul>
                <ul className="nut-elevator-nav" id="nut-elevator-nav" 
                ref="elevatorNav"
                onTouchMove={(event)=>{this.onPointerMove(event)}}
                onTouchStart={(event)=>{this.onPointerMove(event)}}
                onTouchEnd={(event)=>{this.onPointerEnd(event)}}
                >
                {
                    this.props.dataArray.map((item,index)=>{
                        return (
                            <li className="nut-nav-list"
                            key={'nav'+index}
                            id={'nav'+index}
                            style={{height:this.state.navListHeight+'rem','lineHeight':this.state.navListHeight+'rem'}}
                            onClick={()=>{
                                this.clickNav(item.title,index)
                            }}
                            >
                            {item.title}
                            </li>
                        )
                    })
                }

            </ul>
            {
                this.props.showIndicator && this.state.currBox &&
                <div className="nut-big-box">
                    {this.state.currTitle}
                </div>
            }

            </div>

        );
    }
}
Elevator.defaultProps = {
    dataArray:[],
    navHeight:0.4,
    hiddenTime:5,
    showIndicator:true,
    initIndex:4,
};
Elevator.propTypes = {
};

export default Elevator;