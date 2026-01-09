import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'https://agro-track-api-production.up.railway.app/api',
  apiTimeout: 30000,
  enableLogging: true,
  remotes: {
    administration: 'http://localhost:4201/remoteEntry.json',
    base: 'http://localhost:4202/remoteEntry.json',
  },
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableAnalytics: false
  }
};