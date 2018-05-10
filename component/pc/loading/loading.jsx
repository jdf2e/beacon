import React from 'react';
import classnames from 'classnames';
import has from 'lodash/has';
import './loading.scss';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
    }

    // show(info) {
    //     this.setState({
    //       show: info.show
    //     });
    // }

    setPosition () {
        // 判断是否有包裹内容。没有直接返回。有的话设置zIndex
        if (!Loading.wrapper) {
            return;
        }
    
        Loading.wrapper.style.zIndex = this.props.zIndex;
        Loading.wrapper.style.position = 'fixed';
    }
    
    setWrapperRef (el) {
        // 将包裹内容挂载到Loading的静态属性上
        Loading.wrapper = el;
    }
    
    componentDidMount() {
        this.setPosition();
    }
    
    componentDidUpdate() {
        this.setPosition();
    }
    // show属性改变会触发一次更新
    componentWillReceiveProps(nextProps) {
        this.setState({
          show: nextProps.show
        });
    }
    
    render() {
        // 处理loading gif图
        let LoadingImage = () => {
            return (
                (this.props.src != undefined && this.props.src != '') ? (
                    <img src={this.props.src} alt="" />
                  ) : (
                    <img src="data:img/jpg;base64,R0lGODlhIAAgAOZfAP39/fz8/Pv7+/T09Pj4+Le3t8TExPn5+fX19bKysvr6+vb29vPz86Ghoerq
    6vDw8Ovr6+/v7/Hx8a6urt/f3+3t7aenp/Ly8sHBwff39+np6bW1tefn5+7u7ubm5uXl5djY2K2t
    rbu7u+Li4rCwsNnZ2cnJyejo6Ozs7OHh4bq6utPT06urq97e3rOzs6ampqSkpKKios3Nza+vr6Oj
    o+Pj48fHx729vaWlpb+/v8DAwLGxscLCwuDg4OTk5NbW1srKysXFxc7OztXV1ampqba2try8vKys
    rLS0tKioqMjIyL6+vtTU1NDQ0Nra2rm5uc/Pz9HR0d3d3dLS0svLy9zc3NfX18zMzLi4uMPDw9vb
    28bGxqCgoP7+/qqqqv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/
    C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0i
    VzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6
    bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8w
    Mi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3Lncz
    Lm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJv
    dXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5z
    OnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4
    bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9j
    dW1lbnRJRD0ieG1wLmRpZDo3RDk0NkM5MTUyMjE2ODExODNEMUQyRTIzMjhDMDc2RCIgeG1wTU06
    RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjhCMTFDOERFNjAxMUU0QTY1Qzg2MjUwMUQzQUMzRSIgeG1w
    TU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjhCMTFDN0RFNjAxMUU0QTY1Qzg2MjUwMUQzQUMzRSIg
    eG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpE
    ZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYwRjdEQUIwQTFEOUU0MTE5QkZC
    OTM2NjZEOTRFMTg3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdEOTQ2QzkxNTIyMTY4MTE4
    M0QxRDJFMjMyOEMwNzZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBt
    ZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg
    397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqain
    pqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9u
    bWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1
    NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkE
    CQcAXwAsAAAAACAAIAAAB/+AX4KDhIWGh4iGAB9RQEIgPh0IBwGJlgdNXkk7Ok0UEAwECgIBAJaG
    LUQNNEtaFwJdX12zAKUBsaddNlxcNxyWtAGViV05vFang10BAgKJSlxEHcmEXQIEB4cUvBXUhV0Z
    CAqFB0lcyN6FAggDuIJQXEbphxkXGYMA5h6GCBMqXzYmePFSRIYEdQ8iDKrB5cmhAV4SfMHgxQiP
    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" alt="JD Loading" />
                )
            )
        }
        let { className, containerClass, children, height, float } = this.props;
    
        // 没有包裹内容时设置一个默认高度，有包裹内容时默认撑满内容高度
        const hasHeightProp = has(this.props, 'height');
        if (!children && !hasHeightProp) {
            height = document.body.clientHeight;
        } else if (children && !hasHeightProp) {
            height = '200px';
        }
        // 判断是否全局loading
        if (!this.props.float) {
          return (
            <div
              className={classnames(
                `beaconUi-loading-container`,
                `beaconUi-loading-container-static`,
                containerClass
              )}
              style={{
                height: !this.state.show ? 'initial' : `${height}px`,
              }}
            >
              {children}
              {this.state.show && (
                <div className={`beaconUi-page-loading ${className}`}>
                  <div className={`beaconUi-page-mask`}>
                      <LoadingImage />
                  </div>
                </div>
              )}
            </div>
          );
        }
    
        return (
            this.state.show && (
            <div
                className={`beaconUi-page-loading ${className}`}
                ref={this.setWrapperRef}
            >
                <div className={`beaconUi-page-mask`}>
                    <LoadingImage /> 
                </div>
            </div>
            )
        );
    }
}
Loading.defaultProps = {
    className: '',
    containerClass: '',
    children: '',
    zIndex: 9999,
    float: false
};

export default Loading;
