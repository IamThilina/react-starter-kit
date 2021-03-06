import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();
dispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'API_ACTION',
    action: action,
  });
};



export default dispatcher;
