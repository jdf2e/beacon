import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link} from 'react-router-dom';
import Header from './includes/header1';
import './assets/poto.scss';
ReactDOM.render((    
    <HashRouter>
        <div className="home">
            <Header/>
        </div>    
    </HashRouter>
    ),
    document.getElementById('app')
);