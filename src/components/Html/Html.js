/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import Config from '../../config';
class Html extends Component {

  // props types of the component
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    myProps: PropTypes.object,
  };


  // default props types
  static defaultProps = {
    title: '',
    description: '',
  };

  trackingCode() {
    return ({__html:
    `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
    `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
    `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
    `e.src='https://www.google-analytics.com/analytics.js';` +
    `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
    `ga('create','${Config.googleAnalyticsId}','auto');ga('send','pageview');`,
    });
  }

  render() {
    return (
      <html className="no-js" lang="">
      <head >
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.story} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" href="apple-touch-icon.png" />

        <script src="../js/jquery-2.1.4.min.js"></script>
        <script src="../js/jquery.easing.min.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/jquery.form-validator.min.js"></script>
          
        <link rel="stylesheet" href="../css/bootstrap.min.css"/>
        <link rel="stylesheet" href="../css/font-awesome.min.css"/>
        <link rel="stylesheet" href="../css/material-icons.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic" />
        
        <style id="css" dangerouslySetInnerHTML={{__html: this.props.css}} />
        
      </head>

      <body data-spy="scroll" data-target="#subnav" data-offset="200" position = "relative">

      <div id="app" dangerouslySetInnerHTML={{__html: this.props.body}} />

      <script dangerouslySetInnerHTML={this.trackingCode()} />
     </body>
      </html>
    );
  }

}

export default Html;
