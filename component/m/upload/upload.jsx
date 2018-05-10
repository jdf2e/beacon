import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './upload.scss';
class Upload extends React.Component {
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
Upload.defaultProps = {
};
Upload.propTypes = {
};

export default Upload;