import React, {
    Component,
} from 'react';
import './limitedinfiniteload.scss';

class Limitedinfiniteload extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            page: 0
        }
    }

    componentWillMount () {
        this.state.page = this.props.page;
    }

    render() {
        const {
            className,
            limitValue,
            children,
            hasMore,
            loader,
            unMoreLoader,
            limitLoader,
            useWindow,
            page,
            loadMore,
        } = this.props;
        const {
            isLoading
        } = this.state;

        const cloneLimitLoader = limitValue ? React.cloneElement(limitLoader, {
            onClick: () => {
                loadMore(this.stopLoading.bind(this), page + 1);
            }
        }) : null;

        return (
            <div className={className} ref={scroller => (this.scroller = scroller)}>
                {children}
                {hasMore && (isLoading ? loader : limitValue && limitValue > page ? null : cloneLimitLoader)}
                {!hasMore && unMoreLoader}
            </div>
            //(page < limitValue &&)
        );
    }

    componentDidMount() {
        const {
            loadMore,
            initialLoad,
            page,
            limitValue,
        } = this.props;

        if (initialLoad && loadMore) {
            loadMore(null, page + 1);
        }

        if ((limitValue && limitValue > page) || !limitValue) {
            this.scrollListener();
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.children.length < nextProps.children.length) {
            this.setState({
                isLoading: false
            })
        }
    }

    componentDidUpdate (prevProps, prevState) {
        const {
            limitValue,
            page
        } = this.props;
        if ((!limitValue || page < limitValue) && this.props.children.length > prevProps.children.length) {
            setTimeout(() => {
                this.scrollListener()
            }, 0)
        }
    }

    componentWillUnmount() {
    }

    stopLoading() {
        this.setState({
            isLoading: false
        });
    }

    scrollListener(type) {
        const scrollEl = useWindow ? window : this.scroller;
        const {
            useWindow,
        } = this.props;

        const handleScroll = () => {
            const {
                hasMore,
                loadMore,
                page,
            } = this.props;


            if (!hasMore || !this.isScrollAtBottom() || this.state.isLoading) {
                return false;
            }

            scrollEl.removeEventListener('scroll', handleScroll, false);
            scrollEl.removeEventListener('resize', handleScroll, false);

            if (typeof loadMore === 'function') {
                this.setState({
                    isLoading: true,
                });

                if (loadMore.length > 0) {
                    loadMore(this.stopLoading.bind(this), page + 1);
                } else {
                    loadMore(null, page + 1)
                        .then(() => {
                            this.stopLoading();
                        })
                        .catch(() => {
                            this.stopLoading();
                        });
                }
            }
        }

        scrollEl.addEventListener('scroll', handleScroll, false);
        scrollEl.addEventListener('resize', handleScroll, false);
    }


    calculateTopPosition(el) {
        if (!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }

    getWindowScrollTop() {
        return window.pageYOffset !== undefined ?
            window.pageYOffset :
            (document.documentElement || document.body.parentNode || document.body)
            .scrollTop;
    }

    isScrollAtBottom() {
        const {
            threshold,
            useWindow
        } = this.props;

        let offsetDistance;

        if (useWindow) {
            const windowScrollTop = this.getWindowScrollTop();
            offsetDistance =
                this.calculateTopPosition(this.scroller) +
                this.scroller.offsetHeight -
                windowScrollTop - window.innerHeight;
        } else {
            const {
                scrollHeight,
                clientHeight,
                scrollTop
            } = this.scroller;
            offsetDistance = scrollHeight - clientHeight - scrollTop;
        }

        return offsetDistance <= threshold;
    }
}

Limitedinfiniteload.defaultProps = {
    hasMore: true,
    threshold: 20,
    page: 0,
    limitValue: null,
    initialLoad: false,
    useWindow: true,
    className: 'bui-m-limitedinfiniteload',
    limitLoader: <p className="bui-m-limitedinfiniteload-loading">点击加载更多</p>,
    loader: <p className="bui-m-limitedinfiniteload-loading">加载中...</p>,
    unMoreLoader: <p className="bui-m-limitedinfiniteload-loading">没有更多了</p>
}

export default Limitedinfiniteload;