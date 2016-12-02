/**
 * Created by IamThilina on 4/25/2016.
 */
import React, { PropTypes, Component } from 'react';
import styles from './AlertBox.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class AlertBox extends Component {

  static propTypes = {
    message: PropTypes.String,
    cls: PropTypes.String,
    handleOnClose: PropTypes.func,
  };

  constructor() {
    super();
    this.closeAlert = this.closeAlert.bind(this);
  }
  componentDidMount() {

  }

  closeAlert() {
   this.props.handleOnClose();
  }

  render() {
    return (
      <div className={'alert elf-alert-box ' + this.props.cls}>
        <a href="#" className="close" onClick={this.closeAlert} aria-label="close">&times;</a>
        {this.props.message}
      </div>
    );
  }
}

export default AlertBox;
