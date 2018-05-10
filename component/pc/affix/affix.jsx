import React from 'react';
import classnames from 'classnames';
import './affix.scss';
class Affix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 'static',
            width: null,
            placeHolderStyle: {},
            affix: false
        }
    }

    fixation() {
        this.setPlaceHolderStyle();
        this.setState({
            affix: true,
            position: 'fixed'
        });
    }

    unFixation() {
        this.setState({
            affix: false,
            position: 'static',
            width: null,
            placeHolderStyle: {
                overflow: 'hidden'
            },
        });
    }

    setPlaceHolderStyle() {
        this.setState({
            width: this.placeHolder.offsetWidth,
            placeHolderStyle: {
                width: '100%',
                height: this.placeHolder.offsetHeight,
            },
        });
    }

    getStyle() {
        const { zIndex, offsetBottom, offsetTop} = this.props;
        const { position, width } = this.state;
        let styleObj = {};

        if (position === 'fixed') {
            styleObj = {
                position,
                zIndex,
                width
            };
            offsetBottom !== undefined ?
                (styleObj.bottom = offsetBottom) :
                (styleObj.top = offsetTop);
        } else {
            styleObj = {
                position
            };
        }
        return styleObj;
    }

    updateFixation() {
        const {affix} = this.state;
        const {offsetTop, offsetBottom} = this.props;
        let threshold, offsetNum;

        if (offsetBottom !== undefined) {
            threshold =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - this.placeHolder.getBoundingClientRect().bottom;
            offsetNum = offsetBottom;
        } else {
            threshold = this.placeHolder.getBoundingClientRect().top;
            offsetNum = offsetTop;
        }

        if (affix && threshold > offsetNum) {
            this.unFixation();
        }
        if (!affix && threshold <= offsetNum) {
            this.fixation();
        }
    }

    handleResize() {
        this.updateFixation();
        this.setPlaceHolderStyle();
    };

    handleScroll(){
        this.updateFixation();
    };

    componentDidMount() {
        this.handleResize();
        window.addEventListener('scroll', this.handleResize.bind(this), false);
        window.addEventListener('resize', this.handleResize.bind(this), false);
    }

    render() {
        const {className, children} = this.props;
        const {placeHolderStyle} = this.state;
        return (
            <div className={className} style={placeHolderStyle} ref={placeHolder => (this.placeHolder = placeHolder)}>
                <div style={{ ...this.getStyle() }}>
                    {children}
                </div>
            </div>
        );
    }
}
Affix.defaultProps = {
    offsetTop: 0,
    zIndex: 10,
    className: ''
};

export default Affix;