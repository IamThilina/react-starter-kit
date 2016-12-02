
import React, {PropTypes, Component } from 'react';
import styles from './HomePage.css';
import withStyles from '../../decorators/withStyles';
import Header from'../Header/Header';

@withStyles(styles)
class HomePage extends Component {

  static propTypes = {
    studentStories: PropTypes.array,
    sponsorStories: PropTypes.array,
    alumniStories: PropTypes.array,
    statSliderData: PropTypes.array,
    students: PropTypes.array,
    poolfund: PropTypes.object,
    totalStudents: PropTypes.number,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header headerBgClr={'transparent-header'} navbarBgClr={'transparent-navbar'}/>
          <h2>Home Page</h2>
        <script src="/home.entry.chunk.js"></script>
      </div>
    );
  }
}

export default HomePage;

