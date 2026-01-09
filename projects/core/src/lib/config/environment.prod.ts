import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://agro-track-api-production.up.railway.app/api/',
  apiTimeout: 30000,
  enableLogging: false,
  remotes: {
    administration: 'https://tudominio.com/administration/remoteEntry.json',
    base: 'https://tudominio.com/base/remoteEntry.json',
    humanResources: 'https://tudominio.com/human-resources/remoteEntry.json'
  },
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableAnalytics: true
  }
};