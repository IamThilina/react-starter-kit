/**
 * Created by IamThilina on 4/23/2016.
 */
import React, { PropTypes, Component } from 'react';
import Header from './../Header/Header';
import styles from './AccessDeniedPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class AccessDeniedPage extends Component {

  static propTypes = {
    message: PropTypes.String,
  };

  constructor() {
    super();
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="elf-not-logged-in-page">
        <Header headerBgClr={'primary-blue-header'} navbarBgClr={'primary-blue-navbar'}/>
        <div className="container-fluid text-center">
          <p className="info-text">{this.props.message}</p>
        </div>
        <script src="/accessDenied.entry.chunk.js"></script>  
      </div>
    );
  }
}

export default AccessDeniedPage;
