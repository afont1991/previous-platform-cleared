import moment from 'moment'
import * as ErrorHandler from './errorHandler'


export function CreateNotification(notification){
  global.database.Notifications.create(notification).then((notiInstance)=>{
    return notiInstance
  }).catch((err)=>{
    const NewError = {
      type: 'Notification',
      reason: 'Error Creating Notification',
      details: (typeof(err) === "object" ? JSON.stringify(err) : err),
      UserId: notification.UserId
    }
    return ErrorHandler.LogError(NewError)
  })
}
