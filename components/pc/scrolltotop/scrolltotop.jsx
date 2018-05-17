import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './scrolltotop.scss';
class Scrolltotop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}
export default withRouter(Scrolltotop);
