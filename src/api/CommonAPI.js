/**
 * Created by wathmal on 11/24/15.
 */
import Promise from 'promise';

class CommonAPI {
  constructor() {

  }

  static sendInvitationMail(to) {
    // AJAX call to server
    // move this to the Action Creator

    return new Promise( (fullfill, reject) => {
      $.ajax({
        method: 'POST',
        url: '/invitebyemail',
        data: {email: to.toString()},
        success: (data) => {
          // alert(data);
          fullfill(data);
        },
        error: (xhr, status, err) => {
          // console.error('', status, err.toString());
          reject(err);
        },
      });
    });
  }

  static getSameGradeStudents(studentID, grade) {
    return new Promise( (fullfill, reject) => {
      $.ajax({
        method: 'GET',
        url: '/same-grade-students?studentID=' + studentID + '&grade=' + grade,
        success: (data) => {
          // alert(data);
          fullfill(data);
        },
        error: (xhr, status, err) => {
          reject(err);
        },
      });
    });
  }

}

export default CommonAPI;
