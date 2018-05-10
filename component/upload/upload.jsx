import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SWFUpload from './swfupload.js';
import './upload.scss';
class Upload extends React.Component {
    constructor(props) {
        window.SWFUpload = SWFUpload;
        super(props);
        this.state = {
            style: {}            
        }
        this.placeholder_id = "SWF-" + (new Date()).getTime()
        this.files = {};
        this.debug = (window.location.href.indexOf('bug') > -1) ? true : false;  
    }
    componentDidMount() {
        if(this.isIE()) {
            let $dom = this.a;
            let w = $dom.offsetWidth;
            let h = $dom.offsetHeight;
            let cssObj = {
                "width": w,
                "height": h,
                "position": "absolute",
                "top": 0,
                "left": 0,
                "opacity": "0"
            }
            this.setState({
                style: cssObj
            })
            this.initSWF();
        }
    }
    componentDidUpdate() {
    }
    clickHander(e) {
        if(!this.isIE()) {
            this.uploadInput.click();
        }
    }
    //Flash部分
    initSWF() {
        var _self = this;     
        let $dom = this.a; 
        let w = $dom.offsetWidth;
        let h = $dom.offsetHeight;
        let urlParam = {}
        let url = this.props.uploadUrl;
        if (this.props.type.toLocaleLowerCase() == 'get') {
            url += '?' + this.paramSer(this.props.param);
        } else if (this.props.type.toLocaleLowerCase() == 'post') {
            urlParam = this.props.param;
        }
        let max_size = 0;
        if (this.props.multiple) {
            max_size = 9999;
        }
        let setting = {
            debug: this.debug,

            upload_url: this.props.uploadUrl, //服务器接受文件路径
            flash_url: this.props.swfUrl + '?ver=' + Math.random(), //上传的swf文件路径
            //文件配置
            file_post_name: this.props.fileKey, //服务器接受的文件数据key值
            post_params: urlParam, //上传文件时带的参数
            file_types: this.props.ieAccept, //文件类型过滤配置
            file_types_description: '自定义格式', //上传文件类型描述
            file_size_limit: this.props.fileSizeLimit, //指定要上传的文件的最大体积，可以带单位，合法的单位有:B、KB、MB、GB，如果省略了单位，则默认为KB。该属性为0时，表示不限制文件的大小。
            file_upload_limit: 0,
            file_queue_limit: max_size,
            assume_success_timeout: 10000,
            prevent_swf_caching: false,
            preserve_relative_urls: false,
            //按钮配置
            button_placeholder_id: this.placeholder_id,
            button_width: w,
            button_height: h,
            button_text: '<span style="background:#f00;"></span>',
            button_text_style: '',
            button_text_left_padding: 0,
            button_text_top_padding: 0,
            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
            button_disabled: false,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_window_mode: 'transparent',
            custom_settings: {},
            // 事件
            file_dialog_start_handler: function() {
                _self.fileDialogStart();
            },
            file_queued_handler: function (file) {
                _self.fileQueued(file, this);
            },
            file_queue_error_handler: function(file, err, mess) {
                _self.fileQueueError(file, err, mess, this);
            },
            file_dialog_complete_handler: this.fileDialogComplete,
            upload_start_handler: function(_file) {
                _self.uploadStart(_file, this);
            },
            upload_progress_handler: function(file, bytes, total) {
                _self.flashUploadProgress(file, bytes, total, this);
            },
            upload_error_handler: this.uploadError,
            upload_success_handler: function(file, data){
                _self.uploadSuccess(file, data, this);
            },
            upload_complete_handler: this.flashUploadComplete
        }
        let swfupload = new SWFUpload(setting);
    }
    fileDialogStart() {
        this.props.beforeFileQueue && this.props.beforeFileQueue();
    }
    fileQueued(_file, _this){
        this.props.onFileQueued && this.props.onFileQueued(_file);
    }
    fileQueueError(file, err, mess, _this) {
        let errMsg = '';
        let code = '';
        switch (err) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                errMsg = '超出上传数量';
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                errMsg = errMsg.FILESIZE;
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                errMsg = '不能上传空文件';
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                errMsg = '文件错误';
                break;
        }
        this.setError(errMsg + ',' + mess, file);                
    }
    fileDialogComplete() {
        this.startUpload();
    }
    uploadStart(_file) {
        this.props.onStartUpload && this.props.onStartUpload(_file);
    }
    flashUploadProgress(file, bytes, total, _this) {
        let p = {
            "loaded": bytes,
            "total": total
        }
        this.props.onProgress && this.props.onProgress(p, file);
    }
    uploadError() {}
    uploadSuccess(file, data, _this) {
        this.props.onSuccess && this.props.onSuccess(this.isJSON(data), file);
        _this.startUpload();
    }
    flashUploadComplete(e) {
        // console.log(1);
    }
    //XHR上传部分
    fileChange(e) {
        this.props.beforeFileQueue && this.props.beforeFileQueue();
        let files = this.uploadInput.files;
        this.fileUpload(files[0]);
        this.uploadInput.value = '';
    }
    //上传功能区
    fileUpload(file) {
        let id = (new Date()).getTime();
        file.id = id
        this.files[id] = file;
        if(this.checkFile(file)) {
            this.uploadFile(file);
        }
    }
    //上传
    uploadFile(file) {
        let _self = this;
        let fd = new FormData();
        fd.append(this.props.fileKey, file);
        let param = new FormData();
        let url = this.props.uploadUrl;
        if (this.props.type.toLocaleLowerCase() == 'get') {
            url += '?' + this.paramSer(this.props.param);
            param = fd;
        } else if (this.props.type.toLocaleLowerCase() == 'post') {
            for (let prop in this.props.param) {
                fd.append(prop, this.props.param[prop]);
            }
            param = fd;
        }
        let xhr;
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
        xhr.addEventListener('error', (evt) => {
            this.uploadFailed(evt, this)
        }, false);
        xhr.addEventListener('abort', (evt) => {
            this.uploadCanceled(evt, this)
        }, false);
        xhr.open(this.props.type, url);

        for (let type in this.props.headers) {
            xhr.setRequestHeader(type, this.props.headers[type]);
        }
        xhr.withCredentials = true;
        this.props.onStartUpload && this.props.onStartUpload(file);
        xhr.send(param);
    }
    uploadProgress(evt, _self) {
        let p = {};
        p.loaded = evt.loaded;
        p.total = evt.total;
        _self.props.onProgress && _self.props.onProgress(p, this.file);
    }
    uploadComplete(e, _self) {
        let target = e.target;
        if (target.readyState == 4) {
            if (target.status == 200) {
                if (target.response) {
                    _self.props.onSuccess && _self.props.onSuccess(_self.isJSON(target.response), this.file);
                } else {
                    _self.setError('上传失败数据', target.file);
                }
            }
        } else {
            this.self.setError('上传失败数据', target.file);
        }

    }
    uploadFailed(e, _self) {

    }
    uploadCanceled(e, _self) {

    }
    //检查文件
    isJSON(str) {
        try {
             return JSON.parse(str);
        }catch(err) {
            return str;
        }      
    }
    checkFile(file) {
        let msg = '';
        let code = '';
        if (file.size > this.convertKB(this.props.fileSizeLimit)) {
            msg = '超出文件大小';
        } else if (file.size === 0) {
            msg = '不能选择空文件';
        }
        if (msg === '') {
            return true;
        } else {
            this.setError(msg, file);
            return false;
        }
    }
    //函数功能区
    
    setError(msg, file) {
        this.props.onError && this.props.onError(msg, file);
    }
    convertKB (val) {
        return parseInt(val) * 1024;
    }
    paramSer(obj) {
        let result = '';
        for (let prop in obj) {
            result += prop + '=' + obj[prop] + '&';
        }
        return result.slice(0, -1);
    }
    isIE() {
        let userAgent = window.navigator.userAgent;
        if (/(MSIE 7.0|MSIE 8.0|MSIE 9.0)/.test(userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    getSlot() {
        if(this.props.children) {
            return <div className="display-btn">{this.props.children}</div>
        }else {
            return <div className="display-btn"><input className="upload-btn btn" type="button" value="上传"/></div>
        }
    }
    getUpload() {
        if(!this.isIE()){
            return <input 
            ref={(input) => { this.uploadInput = input; }} 
            accept={this.props.accept}
            className="file-btn" type="file" 
            onChange={this.fileChange.bind(this)}/>
        }else {
            return <div className="flash__con"  style={this.state.style}>
                <div id={this.placeholder_id}></div>
            </div>
        }
    }

    render() {
        let cls = classnames({
            'bui-pc-upload': true,
            [this.props.cls]: true
        })
     	return (
            <div className={cls} onClick={this.clickHander.bind(this)} ref = {(a) => { this.a = a;}}>
                {this.getSlot()}
                {this.getUpload()}                 
     		</div>
 		);
  	}
}
Upload.defaultProps = {
    accept: '*/*',
    ieAccept: '*.*',
    fileSizeLimit: 10 * 1024,
    multiple: false,
    swfUrl: './upload.swf',
    uploadUrl: '',
    fileKey: 'fileData',
    type: 'get',
    param: {},
    headers: {},
    onError: null,
    beforeFileQueue: null,
    onStartUpload: null,
    onProgress: null,
    onSuccess:null
};
Upload.propTypes = {
    accept: PropTypes.string,
    ieAccept: PropTypes.string,
    fileSizeLimit: PropTypes.number,
    multiple: PropTypes.bool,
    swfUrl: PropTypes.string,
    uploadUrl: PropTypes.string,
    fileKey: PropTypes.string,
    type: PropTypes.string,
    param: PropTypes.object,
    headers: PropTypes.object,
    onError: PropTypes.func,
    beforeFileQueue: PropTypes.func,
    onStartUpload: PropTypes.func,
    onProgress: PropTypes.func,
    onSuccess: PropTypes.func
  };

export default Upload;