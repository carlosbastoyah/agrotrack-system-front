# Guía de Despliegue - AgroTrack Frontend en AWS Amplify

Esta guía describe cómo configurar y desplegar la aplicación AgroTrack Frontend en AWS Amplify con soporte para microfrontends usando Module Federation.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración Inicial en AWS Amplify Console](#configuración-inicial-en-aws-amplify-console)
- [Variables de Entorno](#variables-de-entorno)
- [Configuración de Rewrites y Redirects](#configuración-de-rewrites-y-redirects)
- [Configuración de Branches](#configuración-de-branches)
- [Estructura de Despliegue](#estructura-de-despliegue)
- [Proceso de Build](#proceso-de-build)
- [Troubleshooting](#troubleshooting)

## Requisitos Previos

- Cuenta de AWS activa
- Repositorio Git (GitHub, GitLab, Bitbucket, o CodeCommit)
- Aplicación configurada localmente y funcionando
- Acceso a AWS Amplify Console

## Configuración Inicial en AWS Amplify Console

### 1. Conectar Repositorio

1. Accede a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Haz clic en **"New app"** > **"Host web app"**
3. Selecciona tu proveedor de Git (GitHub, GitLab, Bitbucket, etc.)
4. Autoriza la conexión y selecciona tu repositorio
5. Selecciona la rama principal (`main` o `master`)

### 2. Configurar Build Settings

AWS Amplify detectará automáticamente el archivo `amplify.yml` en la raíz del proyecto. Asegúrate de que esté presente en tu repositorio.

Si necesitas configurar manualmente, usa las siguientes opciones:
- **Build settings**: `amplify.yml` (ya configurado en el repositorio)
- **Base directory**: Dejar vacío (el archivo `amplify.yml` maneja esto)
- **Build image**: Dejar por defecto (Amazon Linux 2)

### 3. Variables de Entorno

Configura las siguientes variables de entorno en **App settings** > **Environment variables**:

#### Para Ambiente de Desarrollo (branch: `develop`)

```bash
APP_DOMAIN=https://develop.yourdomain.amplifyapp.com
API_URL=https://agro-track-api-production.up.railway.app/api
AMPLIFY_ENV=development
NODE_ENV=production
```

#### Para Ambiente de Producción (branch: `main`)

```bash
APP_DOMAIN=https://yourdomain.com
API_URL=https://agro-track-api-production.up.railway.app/api
AMPLIFY_ENV=production
NODE_ENV=production
```

**Nota**: Reemplaza `yourdomain.com` con tu dominio real. AWS Amplify también proporciona un dominio automático con el formato `https://[branch-name].[app-id].amplifyapp.com`

## Configuración de Rewrites y Redirects

Para que las SPAs funcionen correctamente, necesitas configurar rewrites en Amplify Console:

1. Ve a **App settings** > **Rewrites and redirects**
2. Haz clic en **"Manage redirects"**
3. Selecciona **"Open text editor"**
4. Copia y pega el contenido del archivo `amplify-rewrites.json` o usa las siguientes reglas:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|eot)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  },
  {
    "source": "/administration</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|eot)$)([^.]+$)/>",
    "target": "/administration/index.html",
    "status": "200",
    "condition": null
  }
]
```

**Explicación de las reglas:**
- La primera regla redirige todas las rutas que no sean archivos estáticos a `/index.html` (para la app principal)
- La segunda regla redirige rutas bajo `/administration/*` que no sean archivos estáticos a `/administration/index.html` (para el microfrontend)

## Configuración de Branches

### Configurar Branch para Desarrollo

1. En Amplify Console, ve a tu aplicación
2. Haz clic en **"Add branch"** o selecciona **"Manage branches"**
3. Conecta la rama `develop` (o la rama que uses para desarrollo)
4. Configura las variables de entorno específicas para desarrollo (ver sección anterior)
5. Opcionalmente, habilita **"Auto deploy"** para desplegar automáticamente en cada push

### Configurar Branch para Producción

1. La rama principal (`main` o `master`) ya está conectada
2. Configura las variables de entorno para producción
3. Configura **Custom domain** si tienes un dominio personalizado:
   - Ve a **Domain management** > **Add domain**
   - Sigue las instrucciones para configurar tu dominio
   - Asigna el dominio a la rama de producción

## Estructura de Despliegue

La aplicación se despliega con la siguiente estructura:

```
/
├── index.html                 # App principal (main)
├── *.js, *.css, *.json       # Assets de main
├── remoteEntry.json          # Entry point de main (si es remote)
└── administration/
    ├── index.html            # Microfrontend administration
    ├── *.js, *.css, *.json  # Assets de administration
    └── remoteEntry.json      # Entry point de administration
```

### URLs de Acceso

- **App Principal**: `https://yourdomain.com/` o `https://[branch].[app-id].amplifyapp.com/`
- **Microfrontend Administration**: `https://yourdomain.com/administration/` o `https://[branch].[app-id].amplifyapp.com/administration/`

## Proceso de Build

El proceso de build ejecuta los siguientes pasos (definidos en `amplify.yml`):

1. **Pre-build**:
   - Instala dependencias con `npm ci`
   - Genera archivos de environment usando variables de entorno
   - Configura variables de ambiente (NODE_ENV, AMPLIFY_ENV)

2. **Build**:
   - Construye librería `core` (compartida)
   - Construye librería `vendors` (compartida)
   - Construye aplicación `main` (host)
   - Construye aplicación `administration` (remote)
   - Organiza la salida en `.amplify-hosting/`

3. **Post-build**:
   - Verifica que el build se completó exitosamente

### Comandos de Build Locales

Puedes probar el build localmente usando:

```bash
# Build completo (como en Amplify)
npm run build:all

# Build individual
npm run build:core
npm run build:vendors
npm run build:main
npm run build:administration
```

## Configuración de Module Federation

### URLs de Remotes

Las URLs de los remotes se configuran automáticamente basándose en:
- Variable de entorno `APP_DOMAIN`
- Configuración en `projects/main/federation.config.js`

En desarrollo local, los remotes usan `http://localhost:4201`.
En producción, usan `${APP_DOMAIN}/administration/remoteEntry.json`.

### Verificación de Module Federation

Para verificar que Module Federation funciona correctamente:

1. Verifica que `remoteEntry.json` es accesible:
   - `https://yourdomain.com/administration/remoteEntry.json`
   - Debe devolver un JSON válido

2. Verifica los headers CORS en `remoteEntry.json`:
   - `Access-Control-Allow-Origin: *`
   - `Cache-Control: public, max-age=300`

3. Revisa la consola del navegador para errores de carga de remotes

## Troubleshooting

### Problema: Build falla en Amplify

**Solución**:
- Revisa los logs de build en Amplify Console
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que `node_modules` esté en `.gitignore`
- Verifica que el archivo `amplify.yml` esté en la raíz del repositorio

### Problema: Las rutas de Angular no funcionan (404 en refresh)

**Solución**:
- Verifica que los rewrites estén configurados correctamente en Amplify Console
- Usa el archivo `amplify-rewrites.json` como referencia
- Asegúrate de que las reglas estén aplicadas al branch correcto

### Problema: Module Federation no carga remotes

**Solución**:
- Verifica que `remoteEntry.json` sea accesible públicamente
- Revisa los headers CORS en la consola del navegador
- Verifica que las URLs en `federation.config.js` sean correctas
- Revisa la variable de entorno `APP_DOMAIN`

### Problema: Assets no se cargan (404 en CSS/JS)

**Solución**:
- Verifica la estructura de directorios en `.amplify-hosting/`
- Revisa que los assets se copiaron correctamente durante el build
- Verifica la configuración de `baseDirectory` en `amplify.yml`

### Problema: Variables de entorno no se aplican

**Solución**:
- Asegúrate de que las variables estén configuradas en el branch correcto
- Verifica que el script `generate-env.js` se ejecute en preBuild
- Revisa los logs de build para confirmar que las variables se están usando

## Scripts Disponibles

```bash
# Generar archivos de environment manualmente
npm run generate:env

# Build completo
npm run build:all

# Build individual
npm run build:core
npm run build:vendors
npm run build:main
npm run build:administration
```

## Próximos Pasos

1. Configura un dominio personalizado en Amplify Console
2. Configura SSL/TLS automático (ya incluido en Amplify)
3. Configura notificaciones de despliegue (email, Slack, etc.)
4. Configura protección de ramas de producción (requiere aprobación manual)
5. Configura monitoreo y alertas

## Referencias

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Angular Module Federation](https://www.angulararchitects.io/en/blog/more-on-module-federation-and-angular/)
- [Amplify Hosting Rewrites](https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html)
