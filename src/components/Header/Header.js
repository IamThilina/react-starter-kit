/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';


@withStyles(styles)
class Header extends Component {

  static propTypes = {
    headerBgClr: PropTypes.string,
    navbarBgClr: PropTypes.string,
  };

  constructor() {
    super();
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <div className={'header ' + this.props.headerBgClr}>
          <div className="container-fluid">
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
