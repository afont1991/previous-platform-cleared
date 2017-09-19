import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
  notifications: [],
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'NOTIFICATIONS_UNMOUNT':
      return intialState
    case "GET_NOTIFICATIONS":
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('notifications', [])
            .set('status', action.status)
            .toJS()
        case 'error':
          return fromJS(state)
            .set('notifications', [])
            .set('status', 'error')
            .set('error', action.response)
            .toJS()
        default:
          return fromJS(state)
            .set('notifications', action.response.body.payload)
            .set('status', 'success')
            .toJS()

      }
    case 'DISMISS_NOTIFICATION':
      const updatedNotifications = state.notifications.map((noti) => {
        if(noti.id === action.NotiId){
          noti.dismissed = true;
        }
        return noti
      });
      return fromJS(state).set('notifications', updatedNotifications).toJS()
    default:
      return state;
  }
};
