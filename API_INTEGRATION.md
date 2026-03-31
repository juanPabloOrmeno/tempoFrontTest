# Integración con TempoService API

## Descripción

El frontend ha sido conectado con el TempoService (backend Java Spring Boot). La integración utiliza:

- **Axios**: Cliente HTTP para consumir los endpoints
- **Repositorio Pattern**: Encapsulación de las consultas API
- **Zustand**: Estado global que se sincroniza con el backend
- **Type-Safe**: Tipos TypeScript alineados con los DTOs del backend

## Estructura de Archivos

```
src/
├── config/
│   └── axiosClient.ts           # Configuración de Axios y base URL
├── api/
│   ├── transactionRepository.ts # Métodos CRUD para transacciones
│   ├── tempistaRepository.ts    # Métodos CRUD para tempistas
│   └── index.ts                  # Exportaciones de repositorios
├── types/
│   ├── transaction.ts           # Tipos del frontend
│   └── api.ts                   # Tipos alineados con la API
├── store/
│   └── transactionStore.ts      # Zustand store actualizado
└── components/
    ├── TransactionForm.tsx      # Formulario adaptado a TransactionRequest
    ├── TransactionRow.tsx       # Componente actualizado sin categoria
    └── TransactionTable.tsx     # Tabla sin columna de categoria
```

## Endpoints Implementados

### Transacciones
- `GET /transaction` - Obtener todas las transacciones
- `POST /transaction` - Crear nueva transacción
- `GET /transaction/:transactionId` - Obtener transacción por ID

### Tempistas
- `GET /tempistas` - Obtener todos los tempistas
- `POST /tempistas` - Crear nuevo tempista
- `GET /tempistas/:name` - Obtener tempista por nombre

## Configuración

### Paso 1: Instalar Axios
```bash
npm install axios
```

### Paso 2: Configurar la URL base
Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Si el backend está en otro puerto, ajustar según sea necesario.

### Paso 3: Iniciar el Backend
El TempoService debe estar ejecutándose en `http://localhost:8080` (o la URL configurada).

## Cambios en los Componentes

### TransactionForm
**Antes:**
- Campos: merchantName, category, amount, transactionDate, notes
- Status fijo: 'Pending'

**Ahora:**
- Campos: transactionId, merchant, amount, transactionDate, tempistaId
- Carga lista de tempistas dinámicamente
- Envía `TransactionRequest` al backend

### TransactionRow & TransactionTable
- Removida la columna de CATEGORY
- El campo `tempistaName` se muestra en lugar de `merchantInvoice`
- Status siempre es "Completed" (desde el backend)
- Formateo dinámico de fechas ISO

### TransactionsPage
- Carga transacciones al montar el componente
- Muestra estado de carga
- Muestra errores si falan las transacciones

## Uso en Componentes

### Cargar Transacciones
```typescript
import { useTransactionStore } from '../store/transactionStore';

const MyComponent = () => {
  const { transactions, fetchTransactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return <div>{transactions.map(t => t.merchant)}</div>;
};
```

### Crear Transacción
```typescript
import { transactionRepository } from '../api/transactionRepository';

const handleCrear = async () => {
  const response = await transactionRepository.createTransaction({
    transactionId: 1001,
    merchant: 'Acme Corp',
    amount: 5000,
    tempistaId: 1,
    transactionDate: '2026-03-28T10:00:00',
  });
};
```

### Obtener Tempistas
```typescript
import { tempistaRepository } from '../api/tempistaRepository';

const tempistas = await tempistaRepository.getAllTempistas();
```

## Manejo de Errores

El axios client captura automáticamente errores y los registra en consola. Los repositorios lanzan excepciones que pueden ser capturadas:

```typescript
try {
  await transactionRepository.createTransaction(data);
} catch (error: any) {
  console.error('Error:', error.message); // "Error al crear transacción"
  console.error('Status:', error.status);  // 400, 409, 500, etc.
}
```

## Tipos TypeScript

Todos los tipos están sincronizados con los DTOs del backend:

### TransactionRequest (enviado al backend)
```typescript
{
  transactionId: number;
  amount: number;
  merchant: string;
  tempistaId: number;
  transactionDate: string; // ISO format
}
```

### TransactionResponse (recibido del backend)
```typescript
{
  transactionId: number;
  amount: number;
  merchant: string;
  tempistaName: string;
  transactionDate: string;
  createdAt: string;
}
```

## Próximos Pasos

- [ ] Implementar filtros funcionales usando repositorio
- [ ] Agregar paginación en el backend
- [ ] Implementar actualización de transacciones (PUT)
- [ ] Implementar eliminación de transacciones (DELETE)
- [ ] Agregar validación de errores más detallada
- [ ] Implementar lógica de re-intento para fallos de red
- [ ] Agregar caché de datos

## Notas Importantes

- El backend retorna `createdAt` solo en GET, no en POST response detallado
- El campo `amount` es Integer en el backend (no Float)
- El `transactionId` debe ser único en el backend
- El `tempistaId` debe existir en la base de datos
- Las fechas deben enviarse en formato ISO 8601
