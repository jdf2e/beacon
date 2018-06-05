import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './tab.scss';
import Panel from './Panel.jsx';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tabIndex) {
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }

    renderTabNav() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex,
                type: this.props.type
            });
        });
    }

    renderActiveTabContent() {
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

    render() {
        let props = this.props;
        let tabCls = classnames({
            'bui-pc-tab tabs': true,
            'bui-pc-tab-vertical': props.type ? true : false
        });
        return (
            <div className={`${tabCls} ${props.tabCls ? props.tabCls : ''}`}>
                <div className="tabs-title">
                    <ul className="tabs-nav">
                        {this.renderTabNav()}
                    </ul>
                </div>
                <div className="tabs-active-content">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        );
    }
};

Tab.propTypes = {
    defaultActiveTabIndex: PropTypes.number,
    tabCls: PropTypes.string,
    type: PropTypes.string
};

Tab.defaultProps = {
    defaultActiveTabIndex: 0,
    tabCls: '',
    type: ''
};

Tab.Panel = Panel;
export default Tab;