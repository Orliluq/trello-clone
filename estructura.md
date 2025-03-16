# 📂 Estructura de Carpetas del Proyecto

```
trello-clone/
├── public/               # Archivos estáticos (favicon, imágenes, etc.)
├── src/                  # Código fuente principal
│   ├── components/       # Componentes reutilizables
│   │   ├── Board/        # Componentes relacionados con los tableros
│   │   ├── List/         # Componentes relacionados con las listas
│   │   └── Task/         # Componentes relacionados con las tareas
│   ├── context/          # Manejo del estado global (Context API)
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas principales de la aplicación
│   ├── styles/           # Archivos de estilos (CSS/Tailwind)
│   └── utils/            # Utilidades y funciones auxiliares
├── .gitignore            # Archivos y carpetas ignorados por Git
├── package.json          # Dependencias y scripts del proyecto
└── README.md             # Documentación principal del proyecto
```

# 📊 Diagrama UML Dinámico

```mermaid
sequenceDiagram
    actor Usuario
    Usuario->>Página de Inicio: Accede a la aplicación
    Página de Inicio->>Context API: Solicita datos de tableros
    Context API-->>Página de Inicio: Retorna datos de tableros
    Usuario->>Tablero: Crea/edita/elimina un tablero
    Tablero->>Context API: Actualiza datos en localStorage
    Usuario->>Lista: Agrega/edita/elimina una lista
    Lista->>Context API: Actualiza datos en localStorage
    Usuario->>Tarea: Crea/edita/mueve/elimina una tarea
    Tarea->>Context API: Actualiza datos en localStorage
```

# 🌳 Diagrama Markmap

```markmap
# Proyecto Trello Clone
## public
- Archivos estáticos (favicon, imágenes, etc.)
## src
- Código fuente principal
  - components
    - Board: Componentes relacionados con los tableros
    - List: Componentes relacionados con las listas
    - Task: Componentes relacionados con las tareas
  - context: Manejo del estado global (Context API)
  - hooks: Hooks personalizados
  - pages: Páginas principales de la aplicación
  - styles: Archivos de estilos (CSS/Tailwind)
  - utils: Utilidades y funciones auxiliares
## .gitignore
- Archivos y carpetas ignorados por Git
## package.json
- Dependencias y scripts del proyecto
## README.md
- Documentación principal del proyecto
```

¡Este archivo ayuda a entender la estructura y el flujo dinámico del proyecto! ✨
