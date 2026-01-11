# SRN Spaceships

Aplicación full-stack de naves espaciales de Star Wars utilizando un monorepo con Express API y Expo React Native.

## Estructura del Monorepo

Este proyecto utiliza npm workspaces para gestionar múltiples paquetes en un solo repositorio:

```
srn-spaceships/
├── apps/
│   ├── api/                    # Backend - API REST con Express + TypeScript
│   │   ├── src/
│   │   │   ├── index.ts        # Servidor Express
│   │   │   └── data.json       # Dataset de naves espaciales
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── mobile/                 # Frontend - Aplicación React Native con Expo
│       ├── app/
│       │   ├── (tabs)/
│       │   │   └── index.tsx   # Pantalla principal con listado y filtrado
│       │   └── spaceship/
│       │       └── [id].tsx    # Pantalla de detalle de nave
│       ├── services/
│       │   └── api.ts          # Servicio para consumir la API
│       └── package.json
│
├── packages/
│   └── shared-types/           # Tipos TypeScript compartidos
│       ├── src/
│       │   └── index.ts        # Interfaces compartidas (Spaceship, Faction)
│       └── package.json
│
├── docker-compose.yml          # Configuración Docker para el API
└── package.json                # Configuración raíz del workspace
```

## Características

### Backend (API)
- ✅ Express + TypeScript
- ✅ Endpoint `GET /spaceships` que retorna 10 naves espaciales
- ✅ CORS habilitado
- ✅ Dataset en JSON con naves de Star Wars
- ✅ Docker support

### Frontend (Mobile)
- ✅ React Native con Expo (Router v6)
- ✅ Listado optimizado con FlatList
- ✅ Filtrado por facción (Empire, Rebels, Republic, etc.)
- ✅ Navegación a pantalla de detalle
- ✅ Componentes con tema (light/dark mode)
- ✅ TypeScript
- ✅ Gestión de estados de carga y error

### Shared Types
- ✅ Tipos compartidos entre API y Mobile
- ✅ Consistencia de tipos en todo el monorepo

## Requisitos Previos

- Node.js 18 o superior
- Docker (opcional, para ejecutar el API en contenedor)
- Expo Go app en tu dispositivo móvil (opcional)

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd srn-spaceships
```

2. Instalar dependencias de todos los workspaces:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cd apps/mobile
cp .env.example .env
```
Edita el archivo `.env` según tu plataforma (ver sección "Configuración de Conectividad")

4. Compilar los paquetes TypeScript:
```bash
npm run build
```

## Ejecución

### Opción 1: Ejecutar todo localmente

#### 1. Iniciar el API (en una terminal):
```bash
npm run api
```
El API estará disponible en `http://localhost:3000`

#### 2. Iniciar la aplicación móvil (en otra terminal):
```bash
npm run mobile
```

Esto abrirá Expo Dev Tools. Desde ahí puedes:
- Escanear el QR con Expo Go (Android/iOS)
- Presionar `w` para abrir en el navegador
- Presionar `a` para abrir en emulador Android
- Presionar `i` para abrir en simulador iOS

### Opción 2: Ejecutar API con Docker

#### 1. Iniciar el API con Docker Compose:
```bash
docker-compose up
```
El API estará disponible en `http://localhost:3000`

#### 2. Iniciar la aplicación móvil:
```bash
npm run mobile
```

## Configuración de Conectividad

La aplicación móvil usa variables de entorno para configurar la URL del API. Edita el archivo `apps/mobile/.env` según tu plataforma:

### Android Emulator
```bash
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

### iOS Simulator o Web
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### Dispositivo Físico
```bash
EXPO_PUBLIC_API_URL=http://TU_IP_LOCAL:3000
```
Por ejemplo: `http://192.168.1.10:3000`

**Nota**: Para encontrar tu IP local:
- **Windows**: `ipconfig` (busca "IPv4 Address")
- **Mac/Linux**: `ifconfig` o `ip addr`

Después de cambiar el `.env`, reinicia el servidor Expo para que los cambios tomen efecto.

## Scripts Disponibles

### Raíz del proyecto
- `npm run build` - Compila shared-types y API
- `npm run api` - Inicia el API en modo desarrollo
- `npm run mobile` - Inicia la aplicación Expo

### API (apps/api)
- `npm run dev` - Inicia el servidor con ts-node
- `npm run build` - Compila TypeScript a JavaScript
- `npm run start` - Ejecuta el servidor compilado

### Mobile (apps/mobile)
- `npm start` - Inicia Expo
- `npm run android` - Abre en emulador Android
- `npm run ios` - Abre en simulador iOS
- `npm run web` - Abre en navegador
- `npm test` - Ejecuta los tests con Jest
- `npm run test:watch` - Ejecuta los tests en modo watch
- `npm run test:coverage` - Ejecuta los tests con reporte de cobertura

## Endpoints del API

### GET /
Información general del API
```json
{
  "message": "Welcome to SRN Spaceships API",
  "endpoints": {
    "spaceships": "/spaceships"
  }
}
```

### GET /spaceships
Obtiene el listado de 10 naves espaciales
```json
[
  {
    "id": 1,
    "name": "Millennium Falcon",
    "description": "Un carguero ligero YT-1300 corelliano muy modificado...",
    "faction": "Rebels"
  },
  ...
]
```

## Tecnologías Utilizadas

### Backend
- Express 4.x
- TypeScript 5.x
- Node.js 18+
- CORS

### Frontend
- React Native
- Expo SDK 54
- Expo Router 6
- TypeScript 5.x

### DevOps
- Docker
- Docker Compose
- npm Workspaces

## Video Demo

[![Ver demostración de la aplicación funcionando](https://img.youtube.com/vi/zhIt194jwh8/0.jpg)](https://youtube.com/shorts/zhIt194jwh8?si=0kmEgzM-EyFJqjWP)


## Preguntas Técnicas

### 1. EAS Build: Configuración para generar .apk e .ipa de producción

Para generar builds de producción con EAS (Expo Application Services), se requiere:

**Configuración en `eas.json`:**
- Definir perfiles de build: `development`, `preview` y `production`
- Para Android: configurar `buildType` como `aab` (producción) o `apk` (testing)
- Para iOS: configurar `simulator: false` en producción
- Opcionalmente configurar sección `submit` con credenciales para envío automático a stores

**Configuración en `app.json`:**
- Definir `bundleIdentifier` (iOS) y `package` (Android) únicos
- Configurar `version`, `buildNumber` (iOS) y `versionCode` (Android)
- Configurar íconos y assets necesarios

**Pasos generales:**
1. Instalar EAS CLI globalmente: `npm install -g eas-cli`
2. Login: `eas login`
3. Configurar proyecto: `eas build:configure`
4. Generar build de Android: `eas build --platform android --profile production`
5. Generar build de iOS: `eas build --platform ios --profile production`
6. Opcionalmente enviar a stores: `eas submit --platform [android|ios]`

**Requisitos previos:**
- Cuenta de Expo
- Cuenta de Apple Developer (para iOS)
- Cuenta de Google Play Console (para Android)
- Credenciales configuradas mediante `eas credentials`

### 2. Offline First: Estrategia de BD local

Para implementar funcionalidad offline-first, usaría **WatermelonDB** como solución de base de datos local.

**Razones para elegir WatermelonDB:**
- Performance optimizada para React Native con lazy loading y queries eficientes
- Sistema de sincronización bidireccional built-in
- Operaciones en hilos separados (multi-threading) para mantener UI fluida
- Excelente soporte de TypeScript
- Integración reactiva con React hooks mediante observables

**Alternativas consideradas:**
- **SQLite + expo-sqlite**: Más ligero pero requiere implementar sincronización manualmente
- **AsyncStorage + Redux Persist**: Solo viable para datos simples, no óptimo para queries complejos

**Estrategia de implementación:**
1. Sincronización inicial al abrir la app (si hay conexión)
2. Todas las lecturas desde BD local (garantiza funcionalidad offline)
3. Sincronización en background periódica
4. Indicador visual del estado de sincronización
5. Queue de operaciones pendientes para sincronizar cuando se recupere conexión
6. Manejo de conflictos con estrategia "last write wins" o resolución custom

### 3. Apple Guideline 4.2: Solución para rechazo por "Minimum Functionality"

Si Apple rechaza la app por la guideline 4.2 (Minimum Functionality o "spam app"), propondría las siguientes soluciones:

#### Soluciones Técnicas y de Producto:

**1. Expandir Funcionalidad Core:**

- **Sistema de Favoritos**: Permitir guardar naves favoritas con persistencia local
- **Comparador de Naves**: Pantalla para comparar especificaciones de 2-3 naves lado a lado
- **Search & Advanced Filters**: Búsqueda por nombre + filtros múltiples combinados
- **Estadísticas**: Dashboard con analytics de las naves (cantidad por facción, gráficos, etc.)
- **Modo Offline Completo**: Implementar sincronización y caché como se describe arriba

**2. Agregar Contenido Único:**

- **Visualizaciones Interactivas**: Modelos 3D o imágenes de alta calidad de las naves
- **Ficha Técnica Expandida**: Agregar campos como velocidad, armamento, tripulación, etc.
- **Timeline Histórico**: Mostrar apariciones de cada nave en películas/series
- **Galería Multimedia**: Screenshots de escenas icónicas de cada nave

**3. Funcionalidad Social/Gamification:**

- **Sistema de Rating**: Permitir a usuarios valorar sus naves favoritas
- **Quiz/Trivia**: Mini-juego de preguntas sobre las naves
- **Logros**: Sistema de achievements por explorar el catálogo
- **Compartir**: Share cards visuales de naves en redes sociales

**4. Argumentación en App Review:**

Si las funcionalidades están implementadas pero el rechazo persiste:

- **Demo Video Detallado**: Mostrar todas las features en un video de revisión
- **Release Notes Descriptivas**: Explicar claramente el valor único de la app
- **Diferenciación**: Destacar qué hace esta app diferente a otras similares
- **Roadmap**: Compartir el plan de features futuras si es apropiado

Esta combinación demuestra que la app no es solo un "wrapper" de una web o JSON estático, sino una experiencia mobile nativa con valor real para los usuarios.

## Troubleshooting

### El API no se conecta desde el emulador Android
Asegúrate de usar `http://10.0.2.2:3000` en lugar de `localhost:3000`

### Error "Cannot find module '@srn-spaceships/shared-types'"
Ejecuta `npm run build` para compilar el paquete de tipos compartidos

### Metro bundler error
1. Detén el servidor Expo
2. Ejecuta `cd apps/mobile && npx expo start --clear`

### TypeScript errors después de cambios
Ejecuta `npm run build` para recompilar los paquetes