/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles)
class Footer extends Component {
  constructor() {
    super();
    this.state = {email: ''};
    this.patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    this.handleChange = this.handleChange.bind(this);
    this.addSubscriber = this.addSubscriber.bind(this);
  }


  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };
  addSubscriber(){
    $.ajax({
      method: 'PUT',
      url: '/add-email-to-list/subscribers',
      data: {
        email: this.state.email,
      },
      success: (data) => {
        alert('You have been subscribed');
        $('#subscriptionModal').modal('hide');
      },
      error: (xhr, status, err) => {
        alert('error');
        $('#subscriptionModal').modal('hide');
      },
    });
  }
  handleChange(event){
    this.setState({email: event.target.value});
  }
  render() {
    // This is just an example how one can render css
    const { width, height } = this.props.viewport;
    this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);

    return (
      <div className="container-fluid footer">
        <div>
          <div className="row">
            <div className="copyright-section">
              <div className=" privacy-policy col-md-5 col-sm-12">
                <p><a href="">privacy policy  </a>|<a href="">  terms and conditions </a>|<a className="email-subscription" data-toggle="modal" data-target="#subscriptionModal" href="#subscriptionModal">  get our awesome emails!  </a></p>
              </div>
              <div className="copyright-ELF col-md-7 col-sm-12">
                <p>Copyrights 2016 <span className="copyright-elf elfText-bold700">Educate Lanka Foundation</span>. Designed and Powerd by <span className="powerd-by elfText-bold700">CAKE Labs</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Footer;
