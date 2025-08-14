# Plan de Accesibilidad — S5 Hardening

Este documento describe el plan para la revisión y mejora de la accesibilidad de la aplicación, con el objetivo de cumplir con los criterios de nivel AA de las Pautas de Accesibilidad al Contenido Web (WCAG 2.1).

## 1. Objetivo

Asegurar que la aplicación sea usable por el mayor número de personas posible, incluyendo aquellas con discapacidades visuales, auditivas, motoras o cognitivas. El objetivo es alcanzar la conformidad **WCAG 2.1 Nivel AA**.

## 2. Alcance

La revisión de accesibilidad se centrará en los componentes de la interfaz de usuario más críticos y de mayor interacción. Se utilizarán herramientas automáticas y pruebas manuales para la validación.

## 3. Componentes a Revisar

La siguiente tabla lista los componentes clave que serán auditados y, si es necesario, remediados.

| Componente                | Ubicación              | Criterios Clave a Validar (WCAG 2.1 AA)                                       |
|---------------------------|------------------------|-------------------------------------------------------------------------------|
| **Formulario de Registro**  | `src/components/Registration.tsx` | - **1.4.3 Contraste Mínimo**: El texto tiene suficiente contraste.               |
|                           |                        | - **2.4.6 Encabezados y Etiquetas**: Campos de formulario etiquetados.          |
|                           |                        | - **3.3.2 Etiquetas o Instrucciones**: Se proveen instrucciones claras.       |
|                           |                        | - **4.1.2 Nombre, Rol, Valor**: Elementos de formulario accesibles por teclado. |
| **Navegación Principal**    | `src/components/ui/sidebar.tsx` | - **2.1.1 Teclado**: Toda la funcionalidad es operable con teclado.           |
|                           |                        | - **2.4.4 Propósito de los Enlaces**: El propósito de cada enlace es claro.     |
|                           |                        | - **2.4.7 Foco Visible**: El foco del teclado es siempre visible.             |
| **Tabla de Datos**        | `src/components/ui/table.tsx`   | - **1.3.1 Información y Relaciones**: Encabezados de tabla asociados.     |
|                           |                        | - **1.4.1 Uso de Color**: La información no se transmite solo por color.      |
| **Diálogos Modales**      | `src/components/ui/dialog.tsx`  | - **2.1.2 Sin Trampas para el Teclado**: El foco se gestiona dentro del modal. |
|                           |                        | - **2.4.3 Orden del Foco**: El orden de tabulación es lógico.                 |

## 4. Herramientas

- **Análisis Automático**: `axe DevTools`, `Lighthouse`
- **Lectores de Pantalla**: `JAWS` (Windows), `VoiceOver` (macOS)
- **Validación Manual**: Navegación con teclado, revisión de contraste de color.

## 5. Criterios de Salida

- Todos los componentes listados deben cumplir con los criterios WCAG 2.1 Nivel AA.
- Un reporte de `axe DevTools` sin violaciones críticas o serias en los flujos principales.
- Verificación manual de que todos los flujos son operables utilizando únicamente el teclado.
