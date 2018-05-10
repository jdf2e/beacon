import React from 'react';
import classnames from 'classnames';
import './input.scss';
class Input extends React.Component {
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
Input.defaultProps = {
};

export default Input;