import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './gotop.scss';
class Gotop extends React.Component {
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
Gotop.defaultProps = {
};
Gotop.propTypes = {
};

export default Gotop;