# Setup do projeto "Caderno" — React + TypeScript + Tailwind

Este arquivo descreve **apenas a criação da estrutura** do projeto. Não implemente telas, lógica, estados ou estilos — cada arquivo deve conter só o mínimo para o projeto compilar.

## 1. Criar o projeto com Vite

```bash
npm create vite@latest caderno -- --template react-ts
cd caderno
npm install
```

## 2. Instalar e configurar o Tailwind CSS (v4, plugin do Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

Substitua o `vite.config.ts` por:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## 3. Limpar o boilerplate do Vite

Remova:

- `src/App.css`
- `src/index.css`
- `src/assets/` (pasta inteira)

## 4. Criar a estrutura de pastas e arquivos

```
caderno/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── initialTasks.ts
│   ├── constants/
│   │   └── calendar.ts
│   ├── utils/
│   │   └── tasks.ts
│   ├── components/
│   │   ├── Icon/
│   │   │   ├── Icon.tsx
│   │   │   └── icons.tsx
│   │   ├── Toggle/
│   │   │   └── Toggle.tsx
│   │   └── Sidebar/
│   │       └── Sidebar.tsx
│   ├── pages/
│   │   ├── Login/
│   │   │   └── Login.tsx
│   │   ├── Agenda/
│   │   │   ├── Agenda.tsx
│   │   │   ├── CalendarGrid.tsx
│   │   │   └── StatsRow.tsx
│   │   ├── Tasks/
│   │   │   ├── Tasks.tsx
│   │   │   ├── TaskFilters.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── Admin/
│   │   │   ├── Admin.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── AdminSummary.tsx
│   │   └── Settings/
│   │       └── Settings.tsx
│   ├── hooks/
│   │   └── usePreferences.ts
│   └── styles/
│       └── global.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

> Com Tailwind, os estilos ficam nas classes dos componentes. Por isso existe só um `global.css`, sem arquivos CSS por tela.

## 5. Conteúdo mínimo de cada arquivo

### `src/styles/global.css`

```css
@import "tailwindcss";

/* O tema escuro é ativado pela classe .dark no container do app */
@custom-variant dark (&:where(.dark, .dark *));
```

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### `src/App.tsx`

```tsx
export default function App() {
  return <div className="p-8 text-2xl font-semibold">Caderno</div>;
}
```

### Componentes e páginas (`components/**` e `pages/**`)

Cada arquivo `.tsx` exporta um componente com o nome do arquivo que retorna `null`. Exemplo para `src/pages/Agenda/Agenda.tsx`:

```tsx
export default function Agenda() {
  return null;
}
```

Exceção: `src/components/Icon/icons.tsx` exporta apenas um objeto vazio:

```tsx
import type { ReactNode } from "react";

export const icons: Record<string, ReactNode> = {};
```

### Arquivos `.ts` (`types`, `data`, `constants`, `utils`, `hooks`)

- `src/types/index.ts` → `export {};`
- `src/data/initialTasks.ts` → `export const initialTasks = [];`
- `src/constants/calendar.ts` → `export {};`
- `src/utils/tasks.ts` → `export {};`
- `src/hooks/usePreferences.ts`:

```ts
export function usePreferences() {
  return {};
}
```

### `index.html`

Ajuste apenas `lang="pt-BR"` na tag `<html>` e o `<title>` para `Caderno`.

### `README.md`

Uma linha de título (`# Caderno`) e os comandos `npm install` e `npm run dev`.

## 6. Verificação

```bash
npm run build
npm run dev
```

O projeto está pronto quando:

- `npm run build` termina sem erros de TypeScript;
- a página abre mostrando "Caderno" com estilo do Tailwind aplicado (texto grande e em negrito);
- todos os arquivos da árvore do passo 4 existem.

## Regras

- **Não** implemente nenhuma tela, lógica, estado ou dado real.
- **Não** instale bibliotecas além de `tailwindcss` e `@tailwindcss/vite`.
- **Não** crie arquivos fora da árvore do passo 4 (além dos gerados pelo Vite, como `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js` e `.gitignore`).
