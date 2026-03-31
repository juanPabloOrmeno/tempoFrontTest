# Estructura de Componentes - Pantalla de Transacciones

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── Sidebar.tsx           # Navegación y menú lateral
│   ├── Header.tsx            # Encabezado con título y botón de acción
│   ├── FilterPanel.tsx       # Panel de filtros (merchant, date range, status)
│   ├── TransactionTable.tsx  # Tabla con paginación
│   └── TransactionRow.tsx    # Fila individual de transacción
├── pages/
│   └── TransactionsPage.tsx  # Página principal que integra todos los componentes
├── styles/
│   ├── Sidebar.css
│   ├── Header.css
│   ├── FilterPanel.css
│   ├── TransactionTable.css
│   ├── TransactionRow.css
│   └── TransactionsPage.css
├── types/
│   └── transaction.ts        # Tipos y interfaces TypeScript
├── App.tsx                   # Aplicación principal
├── index.css                 # Estilos globales
└── main.tsx
```

## 🧩 Componentes Creados

### 1. **Sidebar** (`Sidebar.tsx`)
- Navegación principal con items (Dashboard, Transactions, Analytics, Reports, Settings)
- Estado activo de navegación
- Props: `activeItem`, `onNavClick`

### 2. **Header** (`Header.tsx`)
- Título de página
- Descripción opcional
- Botón de acción configurable
- Props: `title`, `description`, `actionButton`

### 3. **FilterPanel** (`FilterPanel.tsx`)
- Input para buscar por nombre de merchant
- Selector de rango de fechas
- Selector de estado (All Transactions, Success, Pending, Failed)
- Botón "Apply Filters"
- Props: `onFilterChange`, `onApplyFilters`

### 4. **TransactionTable** (`TransactionTable.tsx`)
- Tabla con soporte para múltiples transacciones
- Paginación completa con navegación
- Información de registros mostrados
- Props: `transactions`, `totalEntries`, `currentPage`, `totalPages`, `onPageChange`

### 5. **TransactionRow** (`TransactionRow.tsx`)
- Fila individual de transacción
- Columnas: Fecha, Merchant, Categoría, Monto, Estado, Acciones
- Badges con colores según categoría y estado
- Avatar del merchant
- Props: `transaction`

### 6. **TransactionsPage** (`TransactionsPage.tsx`)
- Página principal que integra todos los componentes
- Estado local para filtros y paginación
- Datos de ejemplo (mock data)
- Estructura layout con sidebar fijo

## 🎨 Estilos

Todos los estilos están organizados en archivos CSS separados por componente:
- **Colores**: Azul principal (#0056b3), grises para textos secundarios
- **Diseño**: Responsive para móvil y tablet
- **Tipografía**: Sistema consistente con diferentes pesos y tamaños

## 🔄 Flujo de Datos

La página está estructurada con:
1. **Estado local** en `TransactionsPage` para filtros y paginación
2. **Componentes presentacionales** que reciben props
3. **Handlers** para onChange/onClick listos para conectar funcionalidad

## 📱 Responsive Design

- Layout mobile: Sidebar en bottom (horizontal)
- Layout tablet: Sidebar colapsable
- Layout desktop: Sidebar fijo izquierda

## ✅ Próximos Pasos

Para agregar funcionalidad:
1. Conectar API para obtener transacciones reales
2. Implementar lógica de filtros
3. Agregar paginación funcional
4. Implementar acciones en la tabla
5. Agregar modales/dialogs si es necesario
