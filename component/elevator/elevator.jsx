import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './elevator.scss';
class Elevator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navListHeight : this.props.navHeight+'px',
            wrapHeight:'500px',
            currTitle:'',
            currBox:false,
        }
    }
    componentDidMount(){
        this.initPage();
    }
        initPage(){
            let innerHeight = document.documentElement.clientHeight;
            this.setState({
                wrapHeight:(innerHeight-50)+'px'
            });
            let initIndex = this.props.dataArray[this.props.initIndex].title; 
            //this.refs.initIndex.scrollIntoView();
            
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
        clickList(list,item){
            this.$emit('clickList',list,item);  
        }
        moveFun(title,index){
            this.refs.title.scrollIntoView();
        }
        onPointerEnd(e){
            let dataArrayLength = this.dataArray.length;
            let navHeight = this.refs.elevatorNav.clientHeight;
            let navTop = this.refs.elevatorNav.offsetTop;
            let navOffsetTop=navTop-navHeight/2 //nav距离顶部的距离
            let eTop = e.type.indexOf('touch') !== -1 ? e.changedTouches[0].clientY : e.clientY;
            let navIndex =parseInt((eTop - navOffsetTop)/this.props.navHeight);
            setTimeout(()=>{
                this.setState({
                    currBox:false
                });
            },this.props.hiddenTime);
            if(navIndex<dataArrayLength && navIndex>=0){
            this.$emit('clickNav',this.props.dataArray[navIndex].title,navIndex);                 
            }
        }
        onPointerMove(e){
            let dataArrayLength = this.props.dataArray.length;
            let navHeight = this.refs.elevatorNav.clientHeight;
            let navTop = this.refs.elevatorNav.offsetTop;
            let navOffsetTop=navTop-navHeight/2 //nav距离顶部的距离
            let eTop = e.type.indexOf('touch') !== -1 ? e.touches[0].clientY : e.clientY;
            let navIndex =parseInt((eTop - navOffsetTop)/this.navHeight);
            if(navIndex<dataArrayLength && navIndex>=0){
                this.moveFun(this.props.dataArray[navIndex].title,navIndex);
                this.currBox =true;
                this.currTitle = this.props.dataArray[navIndex].title;
            }
        }
   	render() {
        let cls = classnames({
        })
     	return (

                        <div className="nut-elevator" ref="nut-elevator" >
                            <ul className="nut-elevator-ul">
                            {
                               this.props.dataArray.map((item,index)=>{
                                return (
                                    <li 
                                    key={item.title}
                                    className="nut-list-title" 
                                    >
                                        {item.title}
                                    </li>
                                )
                               }) 
                            }
                                
                            </ul>
                            

                        </div>

 		);
  	}
}
Elevator.defaultProps = {
    dataArray:[],
    navHeight:40,
    hiddenTime:500,
    showIndicator:true,
    initIndex:0,
};
Elevator.propTypes = {
};

export default Elevator;