import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './icon.scss';
class Icon extends React.Component {
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
Icon.defaultProps = {
};
Icon.propTypes = {
};

export default Icon;