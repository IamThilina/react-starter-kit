/**
 * Created by sudaraka on 11/18/15.
 */
import AppDispatcher from '../core/Dispatcher';
import AppConstants from '../constants/ActionTypes';
import CommonAPI from './../api/CommonAPI';

class HomePageActionCreators {

  static sendInvitationEmail(data) {
    CommonAPI.sendInvitationMail(data).then(status => {
      // AppDispatcher
      AppDispatcher.handleAction({
        actionType: AppConstants.SEND_INVITATION_MAIL,
        data: status,
      });
      alert(JSON.stringify(status));
    });
  }

}

export default HomePageActionCreators;
