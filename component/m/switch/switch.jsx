import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './switch.scss';
class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
   	render() {
        let cls = classnames({
        })
     	return (
     		<div className={cls}>
     		</div>
 		);
  	}
}
Switch.defaultProps = {
};
Switch.propTypes = {
};

export default Switch;