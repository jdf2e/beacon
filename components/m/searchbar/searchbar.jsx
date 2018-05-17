import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './searchbar.scss';
class Searchbar extends React.Component {
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
Searchbar.defaultProps = {
};
Searchbar.propTypes = {
};

export default Searchbar;