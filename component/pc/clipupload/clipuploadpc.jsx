import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './../button/button.jsx';
import './clipupload.scss';
class ClipuploadPC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnStyle: {
                margin: '0 10px'
            },
            topMaskStyle: {
                width: '100%',
                height: '0'
            },
            leftMaskStyle: {
                height: '100%',
                width: '0'
            },
            rightMaskStyle: {
                height: '100%',
                width: 0
            },
            bottomMaskStyle: {
                width: '100%',
                height: '0'
            },
            clipStyle: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            popStyle : {
                left: this.props.offsetLeft,
                top: this.props.offsetTop
            },
            imgStyle: {
                height: 0,
                width: 0
            },
            size: `${this.props.clipWidth} * ${this.props.clipHeight}`,
            showPop: false,

        }
        this.isMove = false;
        this.resize ='no';
        this.timestamp = (new Date()).getTime();
        this.size={
            imgWidth: 0,
            imgHeight: 0,
            clipX: 0,
            clipY: 0,
            startX: 0,
            startY: 0,
            canvasLeft: 0,
            canvasTop: 0,
            moveStartX: 0,
            moveStartY: 0,
            moveStartTop: 0,
            moveStarBottom: 0,
            moveStartLeft: 0,
            moveStartRight: 0,
            startWidth: 0,
            startHeight: 0,
            clipWidth: this.props.clipWidth,
            clipHeight: this.props.clipHeight
        }
    }
    componentDidMount() {
        let _self = this;
        document.addEventListener("mouseup", () => {
            _self.isMove = false;
            _self.resize = 'no';
        })
    }
    selectFile() {
        this.fileBtn.click();
    }
    changeFile(e) {
        let file = this.fileBtn.files[0];
        this.fileBtn.value = '';
        this.preview(file);
        this.reset();
        this.setState({
            showPop: true
        })
    }
    reset() {
        this.size={
            imgWidth: 0,
            imgHeight: 0,
            clipX: 0,
            clipY: 0,
            startX: 0,
            startY: 0,
            canvasLeft: 0,
            canvasTop: 0,
            moveStartX: 0,
            moveStartY: 0,
            moveStartTop: 0,
            moveStarBottom: 0,
            moveStartLeft: 0,
            moveStartRight: 0,
            startWidth: 0,
            startHeight: 0,
            clipWidth: this.props.clipWidth,
            clipHeight: this.props.clipHeight
        }
    }
    //预览图片
    preview(file) {
        let _self = this;
        let reader = new FileReader();
        reader.onload = function() {
            let image = new Image();
            image.onload = function() {
                let canvas = document.getElementById(`_canvas_${_self.timestamp}_`);
                let ctx = canvas.getContext('2d');
                let size = _self.getCanvasWH(image.width, image.height);
                let width = size.width;
                let height = size.height;
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, width, height);
                _self.resizeMask();
            }
            image.src = this.result;
            _self.imgData = this.result
            
        }
        reader.readAsDataURL(file);
    }
    getCanvasWH(w, h) {
        let width, height;
        // 获取宽高的基准
        let maxW = Math.max(this.props.clipWidth, this.props.maxSize);
        let maxH = Math.max(this.props.clipHeight, this.props.maxSize);
        //获取比例值，以便通过比例来操作决定尺寸
        let max = Math.max(maxW, maxH);
        if(w < h) {
            if(w > max) {
                width = max;
                height = (h/w)*max;
            }else {
                width = w;
                height = h;
            }
        }else {
            if(h > max) {
                width = (w/h)*max;
                height = max;
            }else {
                width = w;
                height = h;
            }
        }
        this.size.imgWidth = Math.floor(width);
        this.size.imgHeight = Math.floor(height);
        return {
            width: width,
            height: height
        }
    }
    // clip移动
    clipMouseDown(e) {
        this.isMove = true;
        if(this.size.canvasLeft == 0) {
            this.size.canvasLeft = e.clientX - e.nativeEvent.offsetX
        }
        if(this.size.canvasTop == 0) {
            this.size.canvasTop = e.clientY - e.nativeEvent.offsetY
        }
        this.size.startX = e.clientX - this.size.canvasLeft - this.size.clipX;
        this.size.startY = e.clientY - this.size.canvasTop - this.size.clipY;
    }
    clipMouseMove(e) {
        if(this.isMove) {
            //最大值
            let maxLeft = this.size.imgWidth - this.props.clipWidth;
            let maxTop = this.size.imgHeight - this.props.clipHeight;
            // 实际值
            let left = e.clientX - this.size.canvasLeft - this.size.startX;
            let top = e.clientY - this.size.canvasTop - this.size.startY;
            if(left <= 0) {
                this.size.clipX = 0;
            }else if(left >= maxLeft) {
                this.size.clipX = maxLeft;
            }else {
                this.size.clipX = left;
            }
            if(top <= 0) {
                this.size.clipY = 0;
            }else if(top >= maxTop) {
                this.size.clipY = maxTop;
            }else {
                this.size.clipY = top;
            }
            this.resizeMask();
        }        
        let gapX = e.clientX - this.size.moveStartX;
        let gapY = e.clientY - this.size.moveStartY;
        if(this.resize != 'no') {
            switch(this.resize) {
                case 'left-top':
                    this.size.clipX = this.getMax(this.size.moveStartLeft + gapX);
                    this.size.clipY = this.getMax(this.size.moveStartTop + gapY);
                    this.size.clipWidth = this.size.startWidth - gapX;
                    this.size.clipHeight = this.size.startHeight - gapY;
                    break;
                case 'top':
                    this.size.clipY = this.getMax(this.size.moveStartTop + gapY);
                    this.size.clipHeight = this.size.startHeight - gapY;
                    break;
                case 'right-top':
                    this.size.clipY = this.getMax(this.size.moveStartTop + gapY);
                    this.size.clipWidth = this.getRightClipWidth(gapX) - this.size.clipX;
                    this.size.clipHeight = this.size.startHeight - gapY;
                    break;
                case 'left':
                    this.size.clipX = this.getMax(this.size.moveStartLeft + gapX);
                    this.size.clipWidth = this.size.startWidth - gapX;
                    break;
                case 'right':
                    this.size.clipWidth = this.getRightClipWidth(gapX) - this.size.clipX;
                    break;
                case 'left-bottom':
                    this.size.clipX = this.getMax(this.size.moveStartLeft + gapX);
                    this.size.clipWidth = this.size.startWidth - gapX;
                    this.size.clipHeight = this.getClipHeight(gapY) - this.size.clipY;
                    break;
                case 'bottom':
                    this.size.clipHeight = this.getClipHeight(gapY) - this.size.clipY;
                    break;
                case 'right-bottom':
                    this.size.clipWidth = this.getRightClipWidth(gapX) - this.size.clipX;
                    this.size.clipHeight = this.getClipHeight(gapY) - this.size.clipY;
                    break;
                
            }
            this.resizeMask();
        }  
    }
    getMax(num) {
        return (num <= 0) ? 0 : num;
    }
    getRightClipWidth(gapX) {
        var w = this.size.startWidth + gapX + this.size.clipX;
        return Math.min(this.size.imgWidth, w);
    }
    getClipHeight(gapY) {
        var h = this.size.startHeight + gapY + this.size.clipY;
        return Math.min(this.size.imgHeight, h);
    }
    clipMouseUp(e) {
        this.isMove = false;
    }
    //左上
    leftTopMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartLeft = this.state.clipStyle.left;
        this.size.moveStartTop = this.state.clipStyle.top;
        this.size.startWidth = this.size.clipWidth;
        this.size.startHeight = this.size.clipHeight;
        this.resize = 'left-top';
    }
    //上
    topMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartTop = this.state.clipStyle.top;
        this.size.startHeight = this.size.clipHeight;
        this.resize = 'top';
    }
    //右上
    rightTopMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartRight = this.state.clipStyle.right;
        this.size.moveStartTop = this.state.clipStyle.top;
        this.size.startWidth = this.size.clipWidth;
        this.size.startHeight = this.size.clipHeight;
        this.resize = 'right-top';
    }
    // 左    
    leftMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartLeft = this.state.clipStyle.left;
        this.size.startWidth = this.size.clipWidth;
        this.resize = 'left';
    }
    // 右
    rightMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartRight = this.state.clipStyle.right;
        this.size.startWidth = this.size.clipWidth;
        this.resize = 'right';
    }
    // 左下
    leftBottomMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartLeft = this.state.clipStyle.left;
        this.size.moveStartBottom = this.state.clipStyle.bottom;
        this.size.startWidth = this.size.clipWidth;
        this.size.startHeight = this.size.clipHeight;
        this.resize = 'left-bottom';
    }
    // 下
    bottomMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartBottom = this.state.clipStyle.bottom;
        this.size.startHeight = this.size.clipHeight;
        this.resize = 'bottom';
    }
    // 下右
    rightBottomMouseDown(e) {
        e.stopPropagation();
        this.size.moveStartX = e.clientX;
        this.size.moveStartY = e.clientY;
        this.size.moveStartRight = this.state.clipStyle.right;
        this.size.moveStartBottom = this.state.clipStyle.bottom;
        this.size.startHeight = this.size.clipHeight;
        this.size.startWidth = this.size.clipWidth;
        this.resize = 'right-bottom';
    }
    mouseUp(e){        
        e.stopPropagation();
        this.resize = 'no';
    }
    getImage() {
        let canvas = document.getElementById(`_canvas1_${this.timestamp}_`);
        canvas.width = this.size.clipWidth;
        canvas.height = this.size.clipHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.canvas, this.size.clipX, this.size.clipY, this.size.clipWidth, this.size.clipHeight, 0, 0, this.size.clipWidth, this.size.clipHeight);
        let dataURI = canvas.toDataURL('image/png', 1);
        return dataURI;
    }
    dataURItoBlob(dataURI) {  
        let byteString = atob(dataURI.split(',')[1]);  
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];  
        let ab = new ArrayBuffer(byteString.length);  
        let ia = new Uint8Array(ab);  
        for (let i = 0; i < byteString.length; i++) {  
            ia[i] = byteString.charCodeAt(i);  
        }  
        return new Blob([ab], {type: mimeString});  
    }
    uploadFile() {
        var _self = this;
        let file = this.dataURItoBlob(this.getImage());
        var fd = new FormData();
        fd.append(this.props.fileKey, file);
        var param = new FormData();
        var url = this.props.uploadUrl;
        if (this.props.type.toLocaleLowerCase() == 'get') {
            url += '?' + this.paramSer(this.props.param);
            param = fd;
        } else if (this.props.type.toLocaleLowerCase() == 'post') {
            for (var prop in this.props.param) {
                fd.append(prop, this.props.param[prop]);
            }
            param = fd;
        }
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            this.setError('上传失败数据', file);
        }
        xhr.upload.file = file;
        xhr.file = file;
        xhr.upload.addEventListener('progress', (evt) => {
            this.uploadProgress(evt, this);
        }, false);
        xhr.addEventListener('load', (evt) => {
            this.uploadComplete(evt, this)
        }, false);
        xhr.open(this.props.type, url);
        for (var type in this.props.headers) {
            xhr.setRequestHeader(type, this.props.headers[type]);
        }
        xhr.withCredentials = true;
        xhr.send(param);
    }
    uploadProgress(evt, _self) {
        var p = {};
        p.loaded = evt.loaded;
        p.total = evt.total;
        _self.props.onProgress && _self.props.onProgress(p, this.file);
    }
    uploadComplete(e, _self) {
        var target = e.target;
        if (target.readyState == 4) {
            if (target.status == 200) {
                if (target.response) {
                    _self.props.onSuccess && _self.props.onSuccess(_self.isJSON(target.response), this.file);
                    _self.cancel();
                } else {
                    _self.setError('上传失败数据', target.file);
                }
            }
        } else {
            this.self.setError('上传失败数据', target.file);
        }

    }
    submit() {        
        if(this.props.upload) {
            this.uploadFile();
        }else {
            this.props.onSubmit && this.props.onSubmit(this.getImage(),this.size.clipWidth, this.size.clipHeight);
            this.cancel();
        }
    }
    cancel() {
        this.setState({
            showPop: false
        })  
    }
    resizeMask() {
        this.setState({
            topMaskStyle: {
                width: '100%',
                height: this.size.clipY
            },
            leftMaskStyle: {
                height: this.size.clipHeight,
                width: this.size.clipX,
                top: this.size.clipY
            },
            rightMaskStyle: {
                height: this.size.clipHeight,
                width: this.size.imgWidth - this.size.clipX - this.size.clipWidth,
                right: 0,
                top: this.size.clipY
            },
            bottomMaskStyle: {
                width: '100%',
                height: this.size.imgHeight - this.size.clipY - this.size.clipHeight,
                bottom: 0
            },
            clipStyle: {
                top: this.size.clipY,
                left: this.size.clipX,
                lineHeight: this.size.clipHeight+'px',
                right: this.size.imgWidth - this.size.clipX - this.size.clipWidth,
                bottom: this.size.imgHeight - this.size.clipY - this.size.clipHeight
            },
            size: `${this.size.clipWidth} * ${this.size.clipHeight}`
        })
    }
    paramSer(obj) {
        var result = '';
        for (var prop in obj) {
            result += prop + '=' + obj[prop] + '&';
        }
        return result.slice(0, -1);
    }
    //检查文件
    isJSON(str) {
        try {
             return JSON.parse(str);
        }catch(err) {
            return str;
        }      
    }
    // TPL
    getClip() {
        if(this.props.resize) {
            return(            
                <div className="clip-con" 
                    style={this.state.clipStyle} 
                    onMouseDown={(e) => this.clipMouseDown(e)}
                    onMouseUp={(e) => this.clipMouseUp(e)}>{this.state.size}
                    <div className="left-top point" onMouseDown={(e) => this.leftTopMouseDown(e)}></div>
                    <div className="top point" onMouseDown={(e) => this.topMouseDown(e)}></div>
                    <div className="right-top point" onMouseDown={(e) => this.rightTopMouseDown(e)}></div>
                    <div className="left-center point" onMouseDown={(e) => this.leftMouseDown(e)}></div>
                    <div className="right-center point" onMouseDown={(e) => this.rightMouseDown(e)}></div>
                    <div className="left-bottom point"  onMouseDown={(e) => this.leftBottomMouseDown(e)}></div>
                    <div className="bottom point"  onMouseDown={(e) => this.bottomMouseDown(e)}></div>
                    <div className="right-bottom point"  onMouseDown={(e) => this.rightBottomMouseDown(e)}></div>
                </div>
            )
        }else {
            return(            
                <div className="clip-con" 
                    style={this.state.clipStyle} 
                    onMouseDown={(e) => this.clipMouseDown(e)}
                    onMouseUp={(e) => this.clipMouseUp(e)}>{this.state.size}
                </div>
            )
        }        
    }
   	render() {
        let cls = classnames({
        })
        let popCls = classnames({
            showPop: this.state.showPop,
            [this.props.popCls]: true,
            popup: true
        })
     	return (
            <div className={cls }>
                <Button onClick={this.selectFile.bind(this)}>{this.props.btnName}</Button>
                <input className="select-btn" type="file" onChange={this.changeFile.bind(this)} accept="image/*" ref={(btn) => { this.fileBtn = btn;}}/>                
                <div className={popCls} ref={(i) => {this.clipCon = i;}} style={this.state.popStyle}>
                    <div className="img">
                        <canvas id={`_canvas_${this.timestamp}_`} className="preview-canvas" ref={(c) => {this.canvas = c;}}></canvas>
                        <canvas id={`_canvas1_${this.timestamp}_`} className="clip-canvas"></canvas>
                        <div className="mask-con" onMouseMove={(e) => this.clipMouseMove(e)}  onMouseUp={(e) => this.mouseUp(e)}>
                            {this.getClip()}
                            <div className="top-mask mask" style={this.state.topMaskStyle}></div>
                            <div className="left-mask mask" style={this.state.leftMaskStyle}></div>
                            <div className="right-mask mask" style={this.state.rightMaskStyle}></div>
                            <div className="bottom-mask mask" style={this.state.bottomMaskStyle}></div>
                        </div>
                    </div>
                    <div className="btn-group">
                        <Button style={this.state.btnStyle} onClick={this.submit.bind(this)}>确认</Button>
                        <Button style={this.state.btnStyle} onClick={this.cancel.bind(this)}>取消</Button>
                    </div>
                </div>
     		</div>
 		);
  	}
}

export default ClipuploadPC;