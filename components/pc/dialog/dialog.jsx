import React from 'react';
import './dialog.scss';
class Dialog extends React.Component {
	constructor(props) {
	    super(props);
    }

    confirmDialog() {
        if(this.props.onOk){
            this.props.onOk();
        } else {
            this.closeDialog();
        }
    }


    closeDialog() {
        if(this.props.onClose) this.props.onClose();
    }

    operConfirm() {
        if(this.props.onDelete) this.props.onDelete();
    }


   	render() {
        const self = this;
        const params = self.props;
        if(!params.isVisible) {
            return null;
        }		
     	return (
     		<div className='dialog-wrapper'>
                 <div className='dialog' style={{width:`${this.props.width}px`}}>
                     <div className={params.noHeader?'dialog-no-header':'dialog-header'}>
                        {!params.noHeader && <span className='dialog-title'>{params.title}</span>}
                        {params.hasCloseBtn &&<a href='javascript:;' className='dialog-close' onClick={self.closeDialog.bind(self)}>
                            <svg>
                                <line x1='0' y1='0' x2='10' y2='10' className='line' />
                                <line x1='10' y1='0' x2='0' y2='10' className='line' />
                            </svg>
                        </a>}
                    </div>
                    <div className='dialog-body'>
                        {params.children}
                    </div>
                    <div className='dialog-footer'>
                        {params.hasOkBtn && <button className='dialog-btn dialog-ok' onClick={self.confirmDialog.bind(self)}>{params.okBtnTxt}</button>}
                        {params.hasDelBtn && <button className='dialog-btn dialog-del' onClick={self.operConfirm.bind(self)}>{params.okDelTxt}</button>}
                        {params.hasCancelBtn && <button className='dialog-btn dialog-cancel' onClick={self.closeDialog.bind(self)}>{params.cancelBtnTxt}</button>}
                    </div>
                 </div>
		 	</div>
     	);
  	}
}
Dialog.defaultProps = {
    noHeader: false,
    title: '',
    cancelBtnTxt:'取消',
    hasCancelBtn: true,
    hasDelBtn: false,
    okDelTxt: '删除',
    okBtnTxt: '确定',
    hasOkBtn: true,
    hasCloseBtn: true,
    isVisible: false
}
export default Dialog;

