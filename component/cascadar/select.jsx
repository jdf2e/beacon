import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './cascadar.scss';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    selectChange(e) {
        let data = this.props.data[e.target.value];
        this.props.onChange && this.props.onChange(data);
    }
   	render() {
        let props = this.props;
        let cls = classnames({
        })
     	return (
            <select className={cls} onChange={this.selectChange.bind(this)}>
                <option>{this.props.defaultTxt}</option>
                {
                    props.data.map ((item, index) => {
                        return <option value={index} key={index}>{item[props.nodeKey]}</option>
                    })
            }
     		</select>
 		);
  	}
}
Select.defaultProps = {
    defaultTxt: '',
    data: [],
    nodeKey: 'n',
    selected: '',
    childKey: 's',
    onChange: null
};
Select.propTypes = {
    defaultTxt: PropTypes.string,
    data: PropTypes.array,
    nodeKey: PropTypes.string,
    childKey: PropTypes.string,
    selected: PropTypes.string,
    onChange: PropTypes.func
};

export default Select;