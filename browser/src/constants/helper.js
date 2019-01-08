export const addNotificationHelper = (notification, content, notificationType) => {
    notification && notification.addNotification({
      message: content.toString(),
      level: notificationType
    })
    if (notificationType === 'error') {
      console.error(content)
    }
  }