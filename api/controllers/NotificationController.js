
import responseHandler from '../helpers/responseHelper';
import * as ErrorHandler from '../helpers/errorHandler.js'

export function getUnreadNotifications(req, res){
  const notiQuery = {
    where: {
      UserId: req.user.get().id,
      status: 'unread',
    }
  }
  global.database.Notifications.findAll(notiQuery)
  .then((notificationInstances)=>{
    let formattedNotifications = [];
    notificationInstances.forEach((notificationInstance) => {
      formattedNotifications.push(notificationInstance.get());
    });
    return responseHandler(res, 'Success', formattedNotifications);
  }).catch((err)=>{
    const NewError = {
      type: 'Notifications',
      reason: 'Error getting unread notifications',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting unread notifications', err);
  });
}

export function dismissNotification(req, res){
  const DismissQuery = {
    where: {
      id: req.body.NotiId,
      UserId: req.user.get().id,
    }
  }
  const UpdateInfo = {
    status: 'read',
  }
  global.database.Notifications.update(UpdateInfo, DismissQuery).then((updatedInstance)=>{
    return responseHandler(res, 'Success', []);
  }).catch(()=>{
    const NewError = {
      type: 'Notifications',
      reason: 'Error dismissing notification',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error dismissing notification', err);
  })
}
