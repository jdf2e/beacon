import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './steps.scss';
class Steps extends React.Component {
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
Steps.defaultProps = {
};
Steps.propTypes = {
};

export default Steps;