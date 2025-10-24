import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['node_modules', 'dist', 'client/dist', 'server/dist', '**/*.d.ts']),

  // Base settings (shared)
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: [],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },

  // Client (React + Vite)
  {
    files: ['client/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Server (Node)
  {
    files: ['server/**/*.{ts,js}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },
])
