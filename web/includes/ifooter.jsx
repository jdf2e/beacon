import React from 'react';
export default class Footer extends React.Component {
	constructor(props) {
	    super(props);
    }

   	render() {
     	return (
             <div className="footer">
                <div className="w">
                    <div className="m">
                        <div className="mt">
                            <p>友情链接：</p>
                            <span>Links</span>
                        </div>
                        <div className="mc">
                            <a className="jdc" target="_blank" href="//jdc.jd.com"></a>
                            <a target="_blank" href="/">LEGO</a>
                            <a  target="_blank" href="//popui.jd.com">POP UI</a>
                            <a  target="_blank" href="//nutui.jd.com">NUT UI</a>
                        </div>
                    </div>
                    <div className="m">
                        <div className="mt">
                            <p>关于我们：</p>
                            <span>About Us</span>
                        </div>
                        <div className="mc">
                            <span >Designed & Created</span>
                            <span>By JDC</span>
                        </div>
                    </div>                    
                    <div className="m">
                        <div className="mt">
                            <p>联系我们：</p>
                            <span>Contact Us</span>
                        </div>
                        <div className="mc">
                            <a target="_blank" href="/">邮箱：yanglei27@jd.com</a>
                            <a target="_blank" href="/">电话：010-8911 1111</a>
                        </div>
                    </div>
                    <div className="m">
                    </div>
                </div>
            </div>
     	);
  	}
}