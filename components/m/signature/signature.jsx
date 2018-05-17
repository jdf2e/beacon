import React from 'react';
import classnames from 'classnames';
import './signature.scss';
class Signature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cWidth: 200,
            cHeight: 100,
            ctx: null,
            isSupportTouch : ('ontouchstart' in window),
            events: ('ontouchstart' in window) ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup']
        }
    }

    componentWillMount () {
    }

    componentDidMount () {
        let _this = this;
        let ctx = _this.canvas.getContext('2d');

        _this.setState({
            ctx: ctx,
            cWidth: _this.wrap.offsetWidth,
            cHeight: _this.wrap.offsetHeight,
        }, ()=> {
            _this.addEvent();
        });
    }

   	render() {
        let {className, unSupportTpl, children} = this.props;
        let {cHeight, cWidth} = this.state;
        let cls = classnames('bui-m-signature-wrap', className)
     	return (
     		<div className="bui-m-signature" >
            {this.isCanvasSupported ?
                <div className={cls}>
                    <div className="bui-m-signature-inner" ref={wrap => (this.wrap = wrap)}>
                        <canvas  ref={canvas => (this.canvas = canvas)} height={cHeight} width={cWidth}></canvas>
                    </div>
                    {children}
                    <button className="bui-button bui-button-m" onClick={this.clear.bind(this)}>重新签名</button>
                    <button className="bui-button bui-button-m" onClick={this.confirm.bind(this)}>确认</button>
                </div>
                : unSupportTpl
            }
     		</div>
 		);
  	}

    isCanvasSupported() {
        let elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    addEvent() {
        let _this = this;
        _this.setState({
            startEventHandler: _this.startEventHandler.bind(_this),
        }, ()=> {
            _this.canvas.addEventListener(_this.state.events[0], _this.state.startEventHandler, false);
        });
    }

    startEventHandler(event) {
        event.preventDefault();
        let _this = this;
        let {ctx} = _this.state;
        let {strokeStyle, lineWidth} = _this.props;

        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        _this.setState({
            moveEventHandler: _this.moveEventHandler.bind(_this),
            endEventHandler: _this.endEventHandler.bind(_this)
        }, ()=> {
            _this.canvas.addEventListener(_this.state.events[1], _this.state.moveEventHandler, false);
            document.addEventListener(_this.state.events[2], _this.state.endEventHandler, false);
        });

    }

    moveEventHandler(event) {
        event.preventDefault();

        let _this = this;
        let {ctx, isSupportTouch} = _this.state;
        let evt = isSupportTouch ? event.touches[0] : event;
        let coverPos = _this.canvas.getBoundingClientRect();
        let mouseX = evt.clientX  - coverPos.left;
        let mouseY = evt.clientY  - coverPos.top;

        ctx.lineTo(
            mouseX,
            mouseY
        );
        ctx.stroke();
    }

    endEventHandler(event) {
        event.preventDefault();

        let _this = this;
        _this.canvas.removeEventListener(_this.state.events[1], _this.state.moveEventHandler, false);
        document.removeEventListener(_this.state.events[2], _this.state.endEventHandler, false);
    }

    clear() {
        let _this = this;
        const {ctx, cWidth, cHeight} = _this.state;
        ctx.clearRect(0, 0, cWidth, cHeight);
        //ctx.fillRect(0, 0, cWidth, cHeight);
    }

    confirm() {
        this.onSave(this.canvas);
    }
    onSave(canvas) {
        let _this = this;
        const {onConfirm, isTransBlob, type} = _this.props;
        let dataurl;
        switch(type) {
            case 'png':
                dataurl = canvas.toDataURL('image/png');
                break;
            case 'jpg':
                dataurl = canvas.toDataURL('image/jpeg', 0.8);
                break;
        }
        onConfirm && onConfirm(canvas, dataurl);

    }
}
Signature.defaultProps = {
    className: '',
    lineWidth: 2,
    strokeStyle: '#000',
    type: 'png',
    unSupportTpl: <p className="bui-m-signature-unsopport">对不起，当前浏览器不支持Canvas，无法使用本控件！</p>,
    onConfirm: null,
    onCancel: null
};
Signature.propTypes = {
};

export default Signature;