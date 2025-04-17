import webPush from 'web-push';
import config from '../app/config';

webPush.setVapidDetails(
  'mailto:ibrahimsikder5033@gmail.com',
  config.VAPID_PUBLIC_KEY || '',
  config.VAPID_PRIVATE_KEY || '',
);
