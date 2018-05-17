import React from 'react';
import classnames from 'classnames';
import './flippage.scss';
class FlipPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: ['touchstart', 'touchmove', 'touchend'],
            itemStyle: {},
            wrapStyle: {},
            page: 1,
            isTouch: false,
        }
    }

    componentWillMount () {
        const {imageData, isVisted, page} = this.props;
        this.setState({
            page: page
        });
        if (imageData.length && !isVisted) {
            this.loaderImg();
        }
    }

    componentDidMount () {
        let _this = this;

        const {isVisted, page} = this.props;
        const translateX = -page * this.wrap.offsetHeight;
        if (isVisted) {
            const transform = this.getTransform(translateX);
            const WebkitTransform = this.getTransform(translateX);
            this.setState({
                wrapStyle: {
                    transform,
                    WebkitTransform
                }
            });
        }

        this.setItemStyle();
        _this.setState({
            startEventHandler: _this.startEventHandler.bind(_this)
        }, ()=> {
            _this.wrap.addEventListener(_this.state.events[0], _this.state.startEventHandler, false);
        });
    }

    loaderImg() {
        const {imageData, onChange, onComplete} = this.props;
        let total = imageData.length;
        let loaded = 0;
        let percent = 0;
        imageData.map((key, index) => {
            let img = new Image();
            img.onload = img.onerror = () => {
                percent = (++loaded / total) * 100;
                onChange && onChange(percent);
                if (loaded == total) {
                    onComplete && onComplete();
                }
            };
            img.src = imageData[key];
        });
    }

    setItemStyle() {
        this.setState({
            itemStyle: {
                height: this.wrap.offsetHeight
            }
        })
    }

    getTransition(property) {
        const { duration, easeFunction, delay } = this.props;
        return `${property} ${duration} ${easeFunction} ${delay}`;
    }

    getTransform(translateX) {
        return `translate3d(0, ${translateX}px, 0`;
    }

    setWrapStyle(translateX) {
        let _this = this;
        const transition = _this.getTransition('transform');
        const WebkitTransition = _this.getTransition('-webkit-transform');
        const transform = _this.getTransform(translateX);
        const WebkitTransform = _this.getTransform(translateX);
        _this.setState({
            wrapStyle: {
                WebkitTransition,
                transition,
                transform,
                WebkitTransform
            }
        })
    }

    startEventHandler(event) {
        event.preventDefault();
        let _this = this;
        const {isLoading} = this.props;


        _this.setState({
            moveEventHandler: _this.moveEventHandler.bind(_this),
            endEventHandler: _this.endEventHandler.bind(_this),
            startX: event.targetTouches[0].pageX,
            startY: event.targetTouches[0].pageY
        }, ()=> {
            !isLoading && _this.wrap.addEventListener(_this.state.events[1], _this.state.moveEventHandler, false);
            !isLoading &&_this.wrap.addEventListener(_this.state.events[2], _this.state.endEventHandler, false);
        });
    }

    moveEventHandler(event) {
        event.preventDefault();
        let _this = this;
        let {startX, startY, itemStyle, page} = _this.state;
        const {total} = this.props;
        let endX = event.changedTouches[0].pageX;
        let endY = event.changedTouches[0].pageY;
        let dy = endY - startY;
        let dx = endX - startX;
        if (dy < -20 && Math.abs(dy) > 20 ) {
            if (page < total ){
                _this.setWrapStyle(-itemStyle.height * (page - 1) + dy);
            }
        } else if (dy > 20 &&  Math.abs(dy) > 20) {
            if(page > 1 ) {
                _this.setWrapStyle(-itemStyle.height * (page -1) + dy);
            }
        }

    }
    endEventHandler(event) {
        event.preventDefault();
        let _this = this;
        let {startX, startY, itemStyle, page} = _this.state;
        const {total} = this.props;
        const {onSwitch} = this.props;
        let endX = event.changedTouches[0].pageX;
        let endY = event.changedTouches[0].pageY;
        let dy = endY - startY;
        let dx = endX - startX;

        _this.wrap.removeEventListener(_this.state.events[1], _this.state.moveEventHandler, false);
        _this.wrap.removeEventListener(_this.state.events[2], _this.state.endEventHandler, false);

        if (dy < -20 && Math.abs(dy) > 20 ) {
            if (page < total ) {
                _this.setState({
                    page: page + 1
                }, ()=> {
                    _this.setWrapStyle(-itemStyle.height * page);
                    onSwitch && onSwitch(page + 1);
                });
            }
        } else if (dy > 20 &&  Math.abs(dy) > 20) {
            if(page > 1 ) {
                _this.setState({
                    page: page - 1
                }, ()=> {
                   _this.setWrapStyle(-itemStyle.height * (page -2));
                   onSwitch && onSwitch(page - 1);
                });
            }
        }
    }

    render() {
        const {children, isLoading} = this.props;
        const {itemStyle, wrapStyle} = this.state;
        let cls = classnames('bui-m-flipPage', {});
        return (
            <div className={cls} ref={(wrap) => (this.wrap = wrap)}>
                <div className='bui-m-flipPage-inner' style={wrapStyle}>
                    {
                        React.Children.map(children, (child, index) => {
                            if (index > 0 && !isLoading) {
                                return (
                                    <div className={classnames('bui-m-flipPage-item', {'bui-m-flipPage-item-slected': this.state.page == index})} key={index} style={itemStyle}>
                                        {child}
                                    </div>
                                )
                            } else if (index == 0) {
                                return <div className="bui-m-flipPag-loading">{child}</div>;
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}
FlipPage.defaultProps = {
    imageData: [],
    total: 1,
    page: 1,
    isVisted: false,
    isLoading: true,
    onChange: null,
    onComplete: null,
    onSwitch: null,
    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    duration: '0.35s',
    delay: '0s'
};
export default FlipPage;