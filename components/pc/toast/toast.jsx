import React from 'react';
import classnames from 'classnames';
import './toast.scss';
class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            toastVisible: this.props.visible
        }
    }
    componentWillReceiveProps({visible, toast}) {
        if(toast && visible) {
            this.setState({
                'toastVisible': true
            })
            this.timer = setTimeout(() => {
                this.setState({
                    'toastVisible': false
                })
                this.props.close && this.props.close();
                clearTimeout(this.timer);
            },this.props.interval * 1000)
        }else {
            this.setState({
                'toastVisible': false
            })
        }
    }
   	render() {
        let cls = classnames({
            toast: true,
            hide: !this.state.toastVisible
        })
     	return (
     		<div className={cls} style={this.state.style} >
     			<h1>{this.props.txt}</h1>
     		</div>
 		);
  	}
}
Toast.defaultProps = {
    txt: 'Stranger',
    interval: 3,
    visible: false,
    close: function(){}
};

export default Toast;