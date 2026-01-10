const fs = require('fs');
const path = require('path');

// Obtener variables de entorno
const APP_DOMAIN = process.env.APP_DOMAIN || 'https://tudominio.com';
const API_URL = process.env.API_URL || 'https://agro-track-api-production.up.railway.app/api';
const ENV = process.env.AMPLIFY_ENV || process.env.AWS_BRANCH || 'production';

// Normalizar API_URL (asegurar que termine con /)
const normalizeApiUrl = (url) => {
  return url.endsWith('/') ? url : `${url}/`;
};

// Construir URLs de remotes basadas en el dominio
const getRemoteUrl = (remoteName) => {
  // Si APP_DOMAIN termina con /, removerlo
  const baseUrl = APP_DOMAIN.endsWith('/') ? APP_DOMAIN.slice(0, -1) : APP_DOMAIN;
  return `${baseUrl}/${remoteName}/remoteEntry.json`;
};

// Template para environment.prod.ts
const envProdTemplate = `import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: '${normalizeApiUrl(API_URL)}',
  apiTimeout: 30000,
  enableLogging: ${ENV !== 'production' && ENV !== 'main'},
  remotes: {
    administration: '${getRemoteUrl('administration')}',
    base: '${getRemoteUrl('base')}',
    humanResources: '${getRemoteUrl('human-resources')}'
  },
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableAnalytics: ${ENV === 'production' || ENV === 'main'}
  }
};
`;

// Ruta al archivo environment.prod.ts
const envProdPath = path.join(__dirname, '../projects/core/src/lib/config/environment.prod.ts');

// Escribir el archivo
fs.writeFileSync(envProdPath, envProdTemplate, 'utf8');

console.log('✅ Environment file generated successfully');
console.log(`   Domain: ${APP_DOMAIN}`);
console.log(`   API URL: ${normalizeApiUrl(API_URL)}`);
console.log(`   Environment: ${ENV}`);
console.log(`   Administration remote: ${getRemoteUrl('administration')}`);
