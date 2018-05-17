import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './test.scss';
class Test extends React.Component {
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
Test.defaultProps = {
};
Test.propTypes = {
};

export default Test;