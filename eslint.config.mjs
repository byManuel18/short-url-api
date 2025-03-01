// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'prettier/prettier': 'error', // Muestra errores cuando el código no sigue las reglas de Prettier
      'no-console': 'warn', // Muestra advertencias si hay console.log
      'no-unused-vars': 'off', // Desactiva esta regla para que no haya conflictos con TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // Ignora variables que comienzan con "_"
      '@typescript-eslint/explicit-function-return-type': 'off', // No obliga a definir el tipo de retorno
      '@typescript-eslint/no-explicit-any': 'warn', // Muestra advertencias si se usa `any`
    },
  },
);
