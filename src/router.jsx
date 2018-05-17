// import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import Header from './includes/header';
import Menu from './includes/menu';
import Index from './page/index/index';
import Dialog from './page/dialog/dialog';
import Button from './page/button/button';
import Toast from './page/toast/toast';
import Upload from './page/upload/upload';
import Tips from './page/tips/tips';
import LimitedInfiniteLoad from './page/limitedInfiniteLoad/limitedInfiniteLoad';
import Mask from './page/mask/mask';
import Choose from './page/choose/choose';
import Scrolltotop from './page/scrolltotop/scrolltotop';
import Clipupload from './page/clipupload/clipupload';
import Loading from './page/loading/loading';
import Suggest from './page/suggest/suggest';
import Gotop from './page/gotop/gotop';
import Elevator from './page/elevator/elevator';
import './assets/web.scss';

let config = require('./../component.json');


// let routes = [];
// (config.components).map((d,i)=>{
//     let name = d.english.toLowerCase();
//     routes.push(require(`./page/${name}/${name}.jsx`));
// })



/*ReactDOM.render((
    <HashRouter>
        <div className="wrap">
            <Header />
            <div className="content">
                <Menu />
                <div className="right">
                    <Route path={'/'} exact component={Index} />

                    {

                    }

                </div>
            </div>
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);*/
ReactDOM.render((
    <HashRouter>
        <div className="wrap">
            <Header />
            <div className="content">
                <Menu />
                <div className="right">
                    <Route path={'/'} exact component={Index} />
                    <Route path={'/dialog'} component={Dialog} />
                    <Route path={'/button'} component={Button} />
                    <Route path={'/toast'} component={Toast} />
                    <Route path={'/upload'} component={Upload} />
                    <Route path={'/tips'} component={Tips} />
                    <Route path={'/limitedInfiniteLoad'} component={LimitedInfiniteLoad} />
                    <Route path={'/mask'} component={Mask} />
                    <Route path={'/choose'} component={Choose} />
                    <Route path={'/scrolltotop'} component={Scrolltotop} />
                    <Route path={'/clipupload'} component={Clipupload}/>
                    <Route path={'/loading'} component={Loading} />
                    <Route path={'/suggest'} component={Suggest} />
                    <Route path={'/gotop'} component={Gotop} />
                    <Route path={'/elevator'} component={Elevator} />
                </div>
            </div>
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
