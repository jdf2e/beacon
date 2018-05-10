import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import List from './page/list-m';
import DialogM from './page/m/dialog/dialog-demo';
import DialogPC from './page/pc/dialog/dialog-demo';
import ToastM from './page/m/toast/toast-demo';
import ToastPC from './page/pc/toast/toast-demo';
import ButtonM from './page/m/button/button-demo';
import ButtonPC from './page/pc/button/button-demo';
import InputM from './page/m/input/input-demo';
import InputPC from './page/pc/input/input-demo';
import UploadM from './page/m/upload/upload-demo';
import UploadPC from './page/pc/upload/upload-demo';
import CalendarPC from './page/pc/calendar/calendar-demo';
import TipsM from './page/m/tips/tips-demo';
import TipsPC from './page/pc/tips/tips-demo';
import LimitedinfiniteloadM from './page/m/limitedinfiniteload/limitedinfiniteload-demo';
import LimitedinfiniteloadPC from './page/pc/limitedinfiniteload/limitedinfiniteload-demo';
import MaskM from './page/m/mask/mask-demo';
import ChooseM from './page/m/choose/choose-demo';
import ScrolltotopM from './page/m/scrolltotop/scrolltotop-demo';
import ScrolltotopPC from './page/pc/scrolltotop/scrolltotop-demo';
import ClipuploadPC from './page/pc/clipupload/clipupload-demo';
import LoadingM from './page/m/loading/loading-demo';
import LoadingPC from './page/pc/loading/loading-demo';
import SuggestM from './page/m/suggest/suggest-demo';
import GotopM from './page/m/gotop/gotop-demo';
import GotopPC from './page/pc/gotop/gotop-demo';
import RadioM from './page/m/radio/radio-demo';
import RadioPC from './page/pc/radio/radio-demo';
import SearchbarM from './page/m/searchbar/searchbar-demo';
import AffixM from './page/m/affix/affix-demo';
import AffixPC from './page/pc/affix/affix-demo';
import SignatureM from './page/m/signature/signature-demo';
import SignaturePC from './page/pc/signature/signature-demo';
import TabM from './page/m/tab/tab-demo';
import TabPC from './page/pc/tab/tab-demo';
import CheckboxM from './page/m/checkbox/checkbox-demo';
import CheckboxPC from './page/pc/checkbox/checkbox-demo';
import CascadarPC from './page/pc/cascadar/cascadar-demo';
import PaginationPC from './page/pc/pagination/pagination-demo';
import ElevatorM from './page/m/elevator/elevator-demo';
import FlippageM from './page/m/flippage/flippage-demo';
import IconM from './page/m/icon/icon-demo';
import IconPC from './page/pc/icon/icon-demo';
import CollapsePC from './page/pc/collapse/collapse-demo';
import StepsPC from './page/pc/steps/steps-demo';

import './assets/demo.scss';
import Utils from './../tools/utils';

const Pc = ({ match }) => (
    <div className="content-pc">
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
);

const M =  ({ match }) => (
    <div className="content-m">
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
);

ReactDOM.render((
    <HashRouter>
        <div className="wrap-m">
            <Route path={'/'} exact component={List} />
            <Route path={'/m'} component={M} />
            <Route path={'/pc'} component={Pc} />
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
