# Tests Unitarios - Mobile App

Este directorio contiene las pruebas unitarias para los componentes de la aplicación móvil.

## Configuración

Las pruebas están configuradas usando:
- **Jest**: Framework de testing
- **React Testing Library**: Utilidades para testing de componentes React Native
- **jest-expo**: Preset de Jest optimizado para proyectos Expo

## Estructura de Tests

### FactionFilter.test.tsx
Pruebas para el componente de filtrado por facción:
- ✅ Renderizado correcto con el nombre de la facción
- ✅ Llamada a la función `onPress` cuando se presiona
- ✅ Aplicación correcta de estilos cuando está seleccionado
- ✅ Aplicación correcta de estilos cuando no está seleccionado
- ✅ Renderizado de diferentes facciones (Empire, Rebels, Republic)
- ✅ Toggle del estado de selección
- ✅ Manejo de múltiples presiones

**Total: 7 tests**

**Tipos de Facción:** Los tests utilizan los tipos definidos en `@srn-spaceships/shared-types`:
`'Empire' | 'Rebels' | 'Republic' | 'Independent' | 'Bounty Hunters' | 'All'`

### CustomHeader.test.tsx
Pruebas para el componente de header personalizado:
- ✅ Renderizado con título desde options
- ✅ Renderizado con nombre de ruta cuando no hay título
- ✅ Renderizado del botón de retroceso cuando la navegación puede volver
- ✅ No renderizado del botón de retroceso cuando no se puede volver
- ✅ Retorno de null cuando headerShown es false
- ✅ Aplicación correcta de colores del tema oscuro
- ✅ Aplicación correcta de colores del tema claro
- ✅ Renderizado correcto en plataforma iOS
- ✅ Renderizado correcto en plataforma Android
- ✅ Manejo de colorScheme null

**Total: 10 tests**

## Ejecutar los Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

## Resumen de Resultados

```
Test Suites: 2 passed, 2 total
Tests:       17 passed, 17 total
```

## Mocks Configurados

Los siguientes módulos están mockeados en `jest.setup.js`:
- `expo-router`: Para pruebas de navegación
- `react-native-safe-area-context`: Para áreas seguras
- `@expo/vector-icons`: Para iconos
- Globales de Expo Winter para compatibilidad con Expo 54

## Notas Técnicas

1. Se usa `jest-expo` como preset porque el proyecto utiliza Expo 54
2. Los tests verifican tanto funcionalidad como renderizado correcto
3. Se mockean dependencias externas para aislar los componentes bajo prueba
4. Los tests cubren casos de uso comunes y edge cases
