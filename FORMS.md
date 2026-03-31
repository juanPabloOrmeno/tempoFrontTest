# Nuevas Pantallas - Formularios de Transacciones y Tempistas

## 📋 Pantalla "Create New Transaction"

**Archivo:** [AddTransactionPage.tsx](src/pages/AddTransactionPage.tsx)

### Campos del Formulario:
- **Merchant Name** (requerido) - Nombre completo del proveedor
- **Category** (requerido) - Categoría de la transacción (Materials, Software, Operations, Fees)
- **Amount** (requerido) - Monto (debe ser mayor a 0)
- **Transaction Date** (requerido) - Fecha (no permite fechas futuras)
- **Additional Notes** (opcional) - Notas contextuales

### Validaciones:
- ✓ Validación en tiempo real
- ✓ Indicador visual de campos completados
- ✓ Mensajes de error específicos
- ✓ Estado "Draft Saved Locally" después de guardar

### Acciones:
- **Cancel** - Volver a la lista de transacciones
- **Save Transaction** - Guardar y volver a la lista

---

## 👤 Pantalla "Add New Tempista"

**Archivo:** [AddTempistaPage.tsx](src/pages/AddTempistaPage.tsx)

### Campos del Formulario:
- **Full Name** (requerido) - Nombre completo del miembro
- **Email** (requerido) - Email válido
- **Phone Number** (opcional) - Teléfono de contacto
- **Specialty** (requerido) - Especialidad (Architect, Engineer, Designer, etc)
- **Biography / Description** (opcional) - Experiencia y expertise

### Validaciones:
- ✓ Email válido
- ✓ Campos requeridos
- ✓ Indicador visual de campos completados
- ✓ Mensajes de error específicos

### Acciones:
- **Cancel** - Volver a la lista de tempistas
- **Save Tempista** - Guardar y volver a la lista

---

## 🎨 Componentes de Formulario

### TransactionForm.tsx
- Componente reutilizable para formulario de transacciones
- Props: `onSubmit`, `onCancel`
- Gestiona validación e estado local

### TempistaForm.tsx
- Componente reutilizable para formulario de tempistas
- Props: `onSubmit`, `onCancel`
- Gestiona validación e estado local

---

## 🔄 Navegación

La navegación entre páginas se controla desde `App.tsx`:
- **transactions** → Lista de transacciones
- **add-transaction** → Crear nueva transacción
- **add-tempista** → Agregar nuevo tempista

### Cómo navegar:
1. Desde la lista, haz clic en "New Transaction" o "Transactions" en el sidebar
2. Los botones "Cancel" en los formularios regresan a la página anterior

---

## 🎯 Características de Diseño

✅ **Consistencia Visual:**
- Mismo diseño y colors scheme que la pantalla de transacciones
- Sidebar fijo con navegación
- Header con descripción
- Breadcrumb para navegación

✅ **Responsive:**
- Mobile, Tablet, Desktop
- Formularios se adaptan a diferentes tamaños de pantalla

✅ **UX:**
- Validación en tiempo real
- Indicadores visuales de progresión
- Mensajes de error claros
- Feedback de guardado

---

## 💾 Integración con Zustand

El formulario de transacciones integra automáticamente con el store de Zustand:
- Las nuevas transacciones se agregan al estado global
- Los datos persisten en la lista

Para el formulario de tempista:
- Por implementar: conectar con store de tempistas cuando se cree

---

## 📝 Próximos Pasos

1. Crear store de tempistas en Zustand
2. Implementar API calls para guardar datos
3. Agregar validación adicional si es necesaria
4. Mejorar mensajes de error
