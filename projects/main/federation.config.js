const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

// Obtener el dominio base desde variables de entorno o usar localhost para desarrollo
const APP_DOMAIN = process.env.APP_DOMAIN || 'http://localhost:4201';
const isProduction = process.env.NODE_ENV === 'production' || process.env.AMPLIFY_ENV === 'production';

// Construir URL del remote de administration
const getAdministrationRemoteUrl = () => {
  if (!isProduction) {
    return 'http://localhost:4201/remoteEntry.json';
  }
  // En producción, usar el dominio base configurado
  const baseUrl = APP_DOMAIN.endsWith('/') ? APP_DOMAIN.slice(0, -1) : APP_DOMAIN;
  return `${baseUrl}/administration/remoteEntry.json`;
};

module.exports = withNativeFederation({

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  remotes: {
    "administration": getAdministrationRemoteUrl(),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ]
});