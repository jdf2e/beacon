/**
 * # React翻页组件
 *
 * ## 使用方法
 * ```
 *		<Pagination 
 *           prevBtn={"<"}
 *           nextBtn={">"}
 *           current={2}
 *           breakClassName={"break-me"}
 *           total={10}
 *           visiblePages={5}
 *           onPageChange={this.handlePageChanged}
 *           cointerWrapClass={"pagination"}
 *           activeClass={"active"} 
 *       />
 * ```
 * ```
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

class Pagination extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			select: props.current,
			num: ""
        };
		this.renderPages        = this.renderPages.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleNextPage     = this.handleNextPage.bind(this);
		this.handlePageChanged  = this.handlePageChanged.bind(this);
		this.handleGoPage       = this.handleGoPage.bind(this);
		this.handleNumChange    = this.handleNumChange.bind(this);
		

	}
	 /* ========================= 生命周期 ==============================*/
	componentDidMount() {
		
        const {current, initFirst} = this.props;
        // Call the callback with the current item:
        if (typeof(current) !== 'undefined' && !initFirst) {
			
			this.props.onPageChange(current);
        }
    }

    componentWillReceiveProps(nextProps) {
       
        this.setState({select: nextProps.current});
        
	}
	
    /* ========================= 辅助函数 ==============================*/
	pageInit(index) {
        const {select} = this.state;
        const {pageClassName, activeClass} = this.props;

        return <Page
            key={index}
            onClick={this.handlePageChanged.bind(null, index)}
            select={select === index}
            pageClassName={pageClassName}
            activeClass={activeClass}
            href="javascript:;"
            page={index + 1}/>
    }

	/* ========================= 事件处理 =============================*/
	handleNumChange(event){
		this.setState({ num : event.target.value });
	}

	handleGoPage(){
		if (this.state.num!="") {
			this.handlePageChanged(Number(this.state.num-1));
			this.setState({num: ""});
		}
	}

	handlePreviousPage(e){
        e.preventDefault();
        const {select} = this.state;

        if (select > 0) {
            this.handlePageChanged(select - 1, e);
        }
    };

    handleNextPage(e){
		e.preventDefault();
        const {select} = this.state;
        const {total} = this.props;
        if (select < total - 1) {
            this.handlePageChanged(select + 1, e);
        }
    };

    handlePageChanged(select, e){
        if (e) e.preventDefault();
        if (this.state.select === select) 
            return;
        this.setState({select: select});
        this.props.onPageChange(select);
    };

    /* ========================= 页面渲染 ==============================*/
    /**
     * ### renderPages()
     * 渲染分页和按钮.
     * @param Null
     * @return {React.Element[]}
     */
	renderPages(){
        const items = [];
        const {visiblePages, total, alwaysShowPages} = this.props;

        const {select} = this.state;

        if (total <= visiblePages) {

            for (let index = 0; index < total; index++) {
                items.push(this.pagesInit(index));
            }

        } else {

            let leftSide = (visiblePages / 2);
            let rightSide = (visiblePages - leftSide);

            if (select > total - visiblePages / 2) {
                rightSide = total - select;
                leftSide = visiblePages - rightSide;
            } else if (select < visiblePages / 2) {
                leftSide = select;
                rightSide = visiblePages - leftSide;
            }

            let index;
            let page;
            let breakView;
            let createPageView = (index) => this.pageInit(index);
            for (index = 0; index < total; index++) {
                page = index + 1;
                if (page <= alwaysShowPages) {
                    items.push(createPageView(index));
                    continue;
                }
                if (page > total - alwaysShowPages) {
                    items.push(createPageView(index));
                    continue;
                }
                if ((index >= select - leftSide) && (index <= select + rightSide)) {
                    items.push(createPageView(index));
                    continue;
                }
                if (items[items.length - 1] !== breakView) {
					breakView = (<li key={index} className="break"><a>...</a></li>);
                    items.push(breakView);
                }
            }
        }
        return items;
    };


	render() {
        const {
            disabledClass,
            prevClass,
            nextClass,
            total,
            cointerWrapClass,
            prevBtn,
            nextBtn
        } = this.props;

        const {select} = this.state;
        const previousClasses = prevClass + (select === 0
            ? ` ${disabledClass}`
            : '');
        const nextClasses = nextClass + (select === total - 1
            ? ` ${disabledClass}`
            : '');
        return (
			
			<ul className={cointerWrapClass}>
				<li className={previousClasses}>
					<a
						onClick={this.handlePreviousPage}
						href="javascript:;"
						tabIndex="0"
						onKeyPress={this.handlePreviousPage}>
						{prevBtn}
					</a>
				</li>

				{this.renderPages()}

				<li className={nextClasses}>
					<a
						onClick={this.handleNextPage}
						href="javascript:;"
						tabIndex="0"
						onKeyPress={this.handleNextPage}>
						{nextBtn}
					</a>
				</li>
				{this.props.showGo&&
					<li className="go-nums-bar">
						<p>到第<input type="text" 
									value={this.state.num}
									onChange={this.handleNumChange}
						/>页</p>
						<button onClick={this.handleGoPage}>确定</button>
					</li>
				}
			</ul>
				
		
            
			
        );
    }
}

Pagination.propTypes = {
	total      : PropTypes.number.isRequired,
	visiblePages    : PropTypes.number.isRequired,
	alwaysShowPages : PropTypes.number.isRequired,
	initFirst       : PropTypes.bool,
	showGo          : PropTypes.bool,
	prevBtn         : PropTypes.node,
	nextBtn         : PropTypes.node,
	onPageChange    : PropTypes.func,
	current         : PropTypes.number,
	cointerWrapClass: PropTypes.string,
	pageClassName   : PropTypes.string,
	activeClass     : PropTypes.string,
	prevClass       : PropTypes.string,
	nextClass       : PropTypes.string,
	disabledClass   : PropTypes.string,
};

Pagination.defaultProps = {
	total      : 10,
	visiblePages    : 2,
	alwaysShowPages : 1,
	initFirst       : false,
	showGo          : false,
	activeClass     : "active",
	prevClass       : "previous",
	nextClass       : "next",
	prevBtn         : "<",
	nextBtn         : ">",
	current         : 0,
	disabledClass   : "disabled",
	cointerWrapClass: "pagination"
};





/* ========================= 子组件 =============================*/
//翻页按钮
const Page = (props) => {
	let cssClassName = props.pageClassName;
	const onClick = props.onClick;
	const href = props.href;
	
	if (props.select) {
		
		if (typeof(cssClassName) !== 'undefined') {
			cssClassName = cssClassName + ' ' + props.activeClass;
		} else {
			cssClassName = props.activeClass;
		}
	}

  	return (
		<li className={cssClassName}>
			<a onClick={onClick}
				href={href}
				onKeyPress={onClick}>
				{props.page}
			</a>
		</li>
  	)
}

export default Pagination;
