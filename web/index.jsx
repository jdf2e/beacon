import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link} from 'react-router-dom';
import Header from './includes/iheader';
import Banner from './includes/ibanner';
import Feature from './includes/ifeature';
import Contact from './includes/icontact';
import Footer from './includes/ifooter';
import './assets/poto.scss';
ReactDOM.render((    
    <HashRouter>
        <div className="home">
            <Header/>
            <Banner/>
            <Feature/>
            <Contact/>
            <Footer/>
        </div> 
    </HashRouter>
    ),
    document.getElementById('app')
);