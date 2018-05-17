import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ClipUploadPC from './clipuploadpc.jsx';
class Clipupload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPC: true
        }
    }
    getTpl() {
        if(this.state.isPC) {
            return (
                <ClipUploadPC 
                    buttonCls={this.props.buttonCls}
                    popCls = {this.props.popCls}
                    btnName = {this.props.btnName}
                    maxSize={this.props.maxSize}
                    clipWidth={this.props.clipWidth}
                    clipHeight={this.props.clipHeight}
                    resize={this.props.resize}
                    onSubmit={this.props.onSubmit}
                    upload={this.props.upload}
                    param={this.props.param}
                    uploadUrl={this.props.uploadUrl}
                    fileKey={this.props.fileKey}
                    type={this.props.type}
                    headers={this.props.headers}
                    offsetLeft={this.props.offsetLeft}
                    offsetTop={this.props.offsetTop}
                    onSuccess={this.props.onSuccess}
                >
                </ClipUploadPC>
            )
        }else {

        }
    }
   	render() {
        let cls = classnames({
            'bui-pc-clipupload': this.state.isPC,
            [this.props.buttonCls]: true
        })
     	return (
            <div className={cls}>             
              {this.getTpl()}
     		</div>
 		);
  	}
}
Clipupload.defaultProps = {
    buttonCls: '',
    popCls: '',
    btnName: '上传图片',
    maxSize: 500,
    clipWidth: 100,
    clipHeight: 100,
    resize: false,
    upload: false,
    param: {},
    fileKey: '',
    uploadUrl:'',
    type: 'post',
    headers: {},
    offsetLeft: 0,
    offsetTop: 40,
    onSubmit: null,
    onProgress: null,
    onSuccess: null
};
Clipupload.propTypes = {
    buttonCls: PropTypes.string,
    popCls: PropTypes.string,
    btnName: PropTypes.string,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    clipWidth: PropTypes.number,
    clipHeight: PropTypes.number,
    resize: PropTypes.bool,
    upload: PropTypes.bool,
    param: PropTypes.object,
    fileKey: PropTypes.string,
    uploadUrl: PropTypes.string,
    type: PropTypes.string,
    headers: PropTypes.object,
    offsetLeft: PropTypes.number,
    offsetTop: PropTypes.number,
    onSubmit: PropTypes.func,
    onProgress: PropTypes.func,
    onSuccess: PropTypes.func
};

export default Clipupload;