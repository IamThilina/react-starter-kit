/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Navigation.css'
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    navbarBgClr: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <nav className={'navbar navbar-default elf-navbar ' + this.props.navbarBgClr} >
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle elf-navbar-toggle" data-toggle="collapse" data-target="#elf-main-nav-bar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <img className="logo" src="/logo-elf-wht.png" width="60" height="60"/>
            <a className="elfText-bold700 navbar-brand title" href="/">EDUCATE LANKA</a>
          </div>
          <div className="collapse navbar-collapse elf-navbar-collapse" id="elf-main-nav-bar">
            <ul className="nav navbar-nav navbar-right tabs">
              <li className="elfText-bold700 home-pg-link"><a href="/">EDUCATE LANKA</a></li>
              <li className="elfText-bold700"><a href="/search">SPONSOR A STUDENT</a></li>
              <li className="elfText-bold700 dropdown nav-link-dropdown ">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">DONATE</a>
                <div className="nav-links-wrapper">
                  <ul className="nav-links-container donate-link">
                    <li className="elfText-bold700"><a href="/poolFund">TO EDUCATE LANKA FUND</a></li>
                    <li className="elfText-bold700"><a href="/pledgeYourBirthday">YOUR BIRTHDAY</a></li>
                    <li className="elfText-bold700"><a href="#">A GIFT CARD</a></li>
                  </ul>
                </div>
                <ul className="dropdown-menu mobile-dropdown">
                  <li className="elfText-bold700"><a href="/poolFund">TO EDUCATE LANKA FUND</a></li>
                  <li className="elfText-bold700"><a href="/pledgeYourBirthday">YOUR BIRTHDAY</a></li>
                  <li className="elfText-bold700"><a href="#">A GIFT CARD</a></li>
                </ul>
              </li>
              <li className="elfText-bold700 dropdown nav-link-dropdown ">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">GET INVOLVED</a>
                <div className="nav-links-wrapper">
                  <ul className="nav-links-container get-involved-link">
                    <li className="elfText-bold700"><a href="/joinourteam">JOIN OUR TEAM</a></li>
                    <li className="elfText-bold700"><a href="/becomeavolunteer">BECOME A VOLUNTEER</a></li>
                    <li className="elfText-bold700"><a href="/applyasastudent">APPLY AS A STUDENT</a></li>
                    <li className="elfText-bold700"><a href="/createCampaign">CREATE A FUNDRAISER</a></li>
                    <li className="elfText-bold700"><a href="/startachapter">START A CHAPTER</a></li>
                    <li className="elfText-bold700"><a href="/becomeapatner">BECOME A PARTNER</a></li>
                  </ul>
                </div>
                <ul className="dropdown-menu mobile-dropdown">
                  <li className="elfText-bold700"><a href="/joinourteam">JOIN OUR TEAM</a></li>
                  <li className="elfText-bold700"><a href="/becomeavolunteer">BECOME A VOLUNTEER</a></li>
                  <li className="elfText-bold700"><a href="/applyasastudent">APPLY AS A STUDENT</a></li>
                  <li className="elfText-bold700"><a href="/createCampaign">CREATE A FUNDRAISER</a></li>
                  <li className="elfText-bold700"><a href="/startachapter">START A CHAPTER</a></li>
                  <li className="elfText-bold700"><a href="/becomeapatner">BECOME A PARTNER</a></li>
                </ul>
              </li>
              <li className="elfText-bold700 dropdown nav-link-dropdown ">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">ABOUT US</a>
                <div className="nav-links-wrapper">
                  <ul className="nav-links-container about-us-link">
                    <li className="elfText-bold700"><a href="#">FOUNDER &amp; STORY</a></li>
                    <li className="elfText-bold700"><a href="#">OUR PEOPLE</a></li>
                    <li className="elfText-bold700"><a href="#">HOW WE WORK</a></li>
                    <li className="elfText-bold700"><a href="#">OUR IMPACT </a></li>
                    <li className="elfText-bold700"><a href="#">FINANCIALS</a></li>
                    <li className="elfText-bold700"><a href="#">CONTACT US</a></li>
                  </ul>
                </div>
                <ul className="dropdown-menu mobile-dropdown">
                  <li className="elfText-bold700"><a href="#">FOUNDER &amp; STORY</a></li>
                  <li className="elfText-bold700"><a href="#">OUR PEOPLE</a></li>
                  <li className="elfText-bold700"><a href="#">HOW WE WORK</a></li>
                  <li className="elfText-bold700"><a href="#">OUR IMPACT </a></li>
                  <li className="elfText-bold700"><a href="#">FINANCIALS</a></li>
                  <li className="elfText-bold700"><a href="#">CONTACT US</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default Navigation;
