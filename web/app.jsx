import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import Header from './includes/header';
import Menu from './includes/menu';
import Index from './page/index/index';
import DialogM from './page/m/dialog/dialog';
import DialogPC from './page/pc/dialog/dialog';
import ToastM from './page/m/toast/toast';
import ToastPC from './page/pc/toast/toast';
import ButtonM from './page/m/button/button';
import ButtonPC from './page/pc/button/button';
import InputM from './page/m/input/input';
import InputPC from './page/pc/input/input';
import UploadM from './page/m/upload/upload';
import UploadPC from './page/pc/upload/upload';
import CalendarPC from './page/pc/calendar/calendar';
import TipsM from './page/m/tips/tips';
import TipsPC from './page/pc/tips/tips';
import LimitedinfiniteloadM from './page/m/limitedinfiniteload/limitedinfiniteload';
import LimitedinfiniteloadPC from './page/pc/limitedinfiniteload/limitedinfiniteload';
import MaskM from './page/m/mask/mask';
import ChooseM from './page/m/choose/choose';
import ScrolltotopM from './page/m/scrolltotop/scrolltotop';
import ScrolltotopPC from './page/pc/scrolltotop/scrolltotop';
import ClipuploadPC from './page/pc/clipupload/clipupload';
import LoadingM from './page/m/loading/loading';
import LoadingPC from './page/pc/loading/loading';
import SuggestM from './page/m/suggest/suggest';
import GotopM from './page/m/gotop/gotop';
import GotopPC from './page/pc/gotop/gotop';
import RadioM from './page/m/radio/radio';
import RadioPC from './page/pc/radio/radio';
import SearchbarM from './page/m/searchbar/searchbar';
import AffixM from './page/m/affix/affix';
import AffixPC from './page/pc/affix/affix';
import SignatureM from './page/m/signature/signature';
import SignaturePC from './page/pc/signature/signature';
import TabM from './page/m/tab/tab';
import TabPC from './page/pc/tab/tab';
import CheckboxM from './page/m/checkbox/checkbox';
import CheckboxPC from './page/pc/checkbox/checkbox';
import CascadarPC from './page/pc/cascadar/cascadar';
import PaginationPC from './page/pc/pagination/pagination';
import ElevatorM from './page/m/elevator/elevator';
import FlippageM from './page/m/flippage/flippage';
import IconM from './page/m/icon/icon';
import IconPC from './page/pc/icon/icon';
import CollapsePC from './page/pc/collapse/collapse';
import StepsPC from './page/pc/steps/steps';

import './assets/index.scss';
import Utils from './../tools/utils';

const Pc = ({ match }) => (
    <div className="content">
        <Menu type='PC'/>
        <div className="right">
            <Route path={`${match.url}/dialog`} component={DialogPC}/>
<Route path={`${match.url}/toast`} component={ToastPC}/>
<Route path={`${match.url}/button`} component={ButtonPC}/>
<Route path={`${match.url}/input`} component={InputPC}/>
<Route path={`${match.url}/upload`} component={UploadPC}/>
<Route path={`${match.url}/calendar`} component={CalendarPC}/>
<Route path={`${match.url}/tips`} component={TipsPC}/>
<Route path={`${match.url}/limitedinfiniteload`} component={LimitedinfiniteloadPC}/>
<Route path={`${match.url}/scrolltotop`} component={ScrolltotopPC}/>
<Route path={`${match.url}/clipupload`} component={ClipuploadPC}/>
<Route path={`${match.url}/loading`} component={LoadingPC}/>
<Route path={`${match.url}/gotop`} component={GotopPC}/>
<Route path={`${match.url}/radio`} component={RadioPC}/>
<Route path={`${match.url}/affix`} component={AffixPC}/>
<Route path={`${match.url}/signature`} component={SignaturePC}/>
<Route path={`${match.url}/tab`} component={TabPC}/>
<Route path={`${match.url}/checkbox`} component={CheckboxPC}/>
<Route path={`${match.url}/cascadar`} component={CascadarPC}/>
<Route path={`${match.url}/pagination`} component={PaginationPC}/>
<Route path={`${match.url}/icon`} component={IconPC}/>
<Route path={`${match.url}/collapse`} component={CollapsePC}/>
<Route path={`${match.url}/steps`} component={StepsPC}/>

        </div>
    </div>
);

const M =  ({ match }) => (
    <div className="content">
        <Menu type='M'/>
        <div className="right">
            <Route path={`${match.url}/dialog`} component={DialogM}/>
<Route path={`${match.url}/toast`} component={ToastM}/>
<Route path={`${match.url}/button`} component={ButtonM}/>
<Route path={`${match.url}/input`} component={InputM}/>
<Route path={`${match.url}/upload`} component={UploadM}/>
<Route path={`${match.url}/tips`} component={TipsM}/>
<Route path={`${match.url}/limitedinfiniteload`} component={LimitedinfiniteloadM}/>
<Route path={`${match.url}/mask`} component={MaskM}/>
<Route path={`${match.url}/choose`} component={ChooseM}/>
<Route path={`${match.url}/scrolltotop`} component={ScrolltotopM}/>
<Route path={`${match.url}/loading`} component={LoadingM}/>
<Route path={`${match.url}/suggest`} component={SuggestM}/>
<Route path={`${match.url}/gotop`} component={GotopM}/>
<Route path={`${match.url}/radio`} component={RadioM}/>
<Route path={`${match.url}/searchbar`} component={SearchbarM}/>
<Route path={`${match.url}/affix`} component={AffixM}/>
<Route path={`${match.url}/signature`} component={SignatureM}/>
<Route path={`${match.url}/tab`} component={TabM}/>
<Route path={`${match.url}/checkbox`} component={CheckboxM}/>
<Route path={`${match.url}/elevator`} component={ElevatorM}/>
<Route path={`${match.url}/flippage`} component={FlippageM}/>
<Route path={`${match.url}/icon`} component={IconM}/>

        </div>
    </div>
);

ReactDOM.render((
    <HashRouter>
        <div className="wrap">
            <Header />
            <Route path={'/'} exact component={Index} />
            <Route path={'/pc'} component={Pc}/>
            <Route path={'/m'} component={M} />
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
