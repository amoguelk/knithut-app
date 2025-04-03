import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

const checkNotificationPermission = async () => {
  const settings = await notifee.getNotificationSettings();
  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    return true;
  }
  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    return false;
  }
  return false;
};

const displayNotification = async ({
  id,
  title,
  body,
  importance = AndroidImportance.DEFAULT,
  color = null,
  autoCancel = true,
  ongoing = false,
  pressActionId = 'default',
}) => {
  // Create channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    id,
    title,
    body,
    android: {
      channelId,
      pressAction: { id: pressActionId },
      importance,
      color,
      autoCancel,
      ongoing,
    },
  });
};

export default { displayNotification, checkNotificationPermission };
