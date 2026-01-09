export interface Environment {
  production: boolean;
  apiUrl: string;
  apiTimeout: number;
  enableLogging: boolean;
  remotes?: {
    [key: string]: string;
  };
  features?: {
    enableDarkMode: boolean;
    enableNotifications: boolean;
    enableAnalytics: boolean;
  };
}