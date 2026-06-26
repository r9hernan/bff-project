# BFF Project - Contexto y Decisiones

## Origen
Este proyecto fue creado a partir de `ideal-front` (marketplace inmobiliario) migrando solo los módulos genéricos/reutilizables.

## Stack
- **Next.js 15** con App Router
- **TypeScript** strict
- **Tailwind CSS** + shadcn/ui (Radix)
- **TanStack Query** para data fetching
- **React Hook Form** + **Zod** para formularios
- **Sonner** para notificaciones toast
- **Axios** como cliente HTTP
- **Prisma 7.x** con PostgreSQL + driver adapter (pg)
- **pnpm** como package manager
- **Husky** pre-commit (lint + type-check)

## Arquitectura BFF
El proyecto actúa como Backend-For-Frontend. Las API routes en `src/app/api/` son la capa BFF que consume servicios externos.

### API Routes existentes (con mocks)
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Recuperar contraseña
- `POST /api/auth/reset-password` - Resetear contraseña
- `GET /api/users/me` - Perfil del usuario
- `GET/POST /api/projects` - CRUD proyectos

## Roles de Usuario
Solo 2 roles:
- `admin` - Acceso total
- `operator` - Acceso restringido

## Estructura de Rutas

### Sitio Público (`/(public)`)
- `/` - Home
- `/nosotros` - Sobre la empresa
- `/servicios` - Servicios
- `/contacto` - Formulario de contacto

### Panel Interno (`/admin`)
- `/admin` - Dashboard
- `/admin/projects` - Lista de proyectos
- `/admin/projects/new` - Wizard vertical 7 pasos para crear proyecto (con carga de imágenes)
- `/admin/projects/[id]` - Detalle de proyecto

### Login
- `/login` - Página de login

## Componentes Reutilizables Clave

### Wizard/Stepper (`components/wizard/`)
- `WizardStepper` - Stepper vertical con iconos
- `WizardLayout` - Layout completo con sidebar de pasos + contenido

### Form Components (`components/forms/`)
- `FormField` - Input genérico con react-hook-form
- `FormSelect` - Select con react-hook-form
- `FormRutField` - Campo RUT chileno con validación
- `FormEmailField`, `FormPhoneField`, `FormPasswordField`
- `FormSection`, `FormGrid` - Layout helpers

### Common Components (`components/common/`)
- `FileInput` - Carga de archivos con validación (min/max)
- `SortableTable` - Tabla genérica con sort/filter
- `SearchableSelect` - Select con búsqueda
- `PasswordField` - Input password con toggle visibility
- `SuccessRedirect` - Redirect con countdown

### Layout Components (`components/layout/`)
- `AdminLayout` - Shell con sidebar
- `Sidebar` - Sidebar colapsable con navegación
- `AuthGuard` - Protección de rutas
- `PublicHeader/PublicFooter` - Layout público

## Utilidades
- `src/utils/rut.util.ts` - Validación/formato RUT chileno
- `src/utils/date.util.ts` - Formato fechas (es-CL)
- `src/utils/format.util.ts` - Formato números/moneda (CLP)

## Auth
- JWT con access + refresh token en localStorage
- Interceptors Axios para 401/403
- `AuthContext` con `useAuth()` hook

## ESLint
Configuración enterprise balanceada:
- Single quotes, no semicolons
- No console (except warn/error)
- Consistent type imports
- Sin max-lines-per-function ni complexity (relajado vs proyecto original)

## Base de Datos

### Setup Local
- PostgreSQL 18 corriendo en localhost:5432
- BD: `bff_dev`
- Usuario: `postgres`
- `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bff_dev"`

### Comandos Prisma
```bash
npx prisma studio          # UI visual de la BD
npx prisma migrate dev     # Aplicar migraciones en desarrollo
npx prisma migrate deploy  # Aplicar migraciones en producción
npx prisma db seed         # Insertar datos de prueba
npx prisma generate        # Regenerar Prisma Client
```

### Schema
- **Profile**: Usuarios con rol (admin/operator)
- **ProjectType**: Tipos de proyecto configurables
- **ProjectStage**: Etapas por tipo de proyecto (ordenadas)
- **PhotoSlot**: Slots de fotos por tipo (position + name)
- **DocumentSlot**: Slots de documentos por tipo
- **Project**: Proyectos con currentStageId (FK a ProjectStage)
- **ProjectMember**: Relación M:N usuarios-proyectos
- **ProjectPhoto**: Fotos subidas (1 por slot)
- **ProjectDocument**: Documentos subidos (1 por slot)

### Validación de Etapas
- `src/services/project-validation.ts` contiene lógica de avance
- `canAdvanceStage()` valida requisitos de la etapa actual
- `advanceStage()` avanza si es válido

### Migración a Supabase (futuro)
1. Crear proyecto en Supabase
2. Copiar `DATABASE_URL` de Supabase
3. `npx prisma migrate deploy`
4. Configurar Supabase Auth → trigger `auth.users` → `profiles`
5. Configurar Supabase Storage para fotos/documentos

## Próximos Pasos (TODOs en código)

### Crítico (P0)
1. Implementar lógica de autenticación real con JWT
2. Agregar `middleware.ts` para protección server-side de `/admin/*` y `/api/*`
3. Migrar tokens de localStorage a HttpOnly cookies

### Alto (P1)
4. Agregar upload de imágenes a storage (S3, etc.)
5. Implementar refresh token rotation
6. Conectar API routes con Prisma (reemplazar mocks)
7. Completar CRUD de proyectos con validaciones
8. Agregar tests (Vitest + React Testing Library)

### Medio (P2)
9. Crear `src/constants/` para centralizar magic strings (rutas, roles)
10. Agregar validación de variables de entorno con Zod (`env.mjs`)
11. Conectar dashboard a API de proyectos
12. Agregar `robots.txt` y `sitemap.xml` para SEO

### Infraestructura (P3)
13. Configurar CI/CD (GitHub Actions)
14. Agregar Dockerfile y docker-compose.yml
15. Corregir script `start` para usar `next start` en vez de `serve`

## Comandos
```bash
pnpm dev          # Desarrollo
pnpm build        # Build producción
pnpm lint         # ESLint
pnpm lint:fix     # ESLint fix
pnpm type-check   # TypeScript check
```

## Variables de Entorno
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
