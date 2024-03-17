# Ссылка на [deploy](https://vk.com/app51879045) 
Я старался сделать эту работу хорошо и на нее было потрачено не мало сил, по этому был бы очень благодарен если вы оставите комментарий хотя бы в ишью.
## Разделил проект на main и deploy
## Как запустить проект.
## Для запуска проекта по основному заданию склонируйте ветку main и выполните следующие команды.
### для локального запуска используется node v21.1.0 npm 8.19.4
1. Выполнить в директории проекта

```bash
npm install
```

2. Для запуска в режиме разработки выполнить

```bash
npm run dev
```
## Для запуска проекта по deploy перейдите в ветку deploy.
Для деплоя также нужно добавить в package.json
```json
"@vkontakte/vk-bridge": "^2.14.1",
"@vkontakte/vk-bridge-react": "^1.0.1",
"@vkontakte/vk-mini-apps-router": "^1.4.3",
"@vkontakte/vk-miniapps-deploy": "^0.1.6",
"@vkontakte/vk-tunnel": "^0.1.4",
```
И изменить в vk-hosting-config.json на ваш id приложения
также нужно изменить vite.configs.ts (отличающийся от запуска по локальной сети)
```ts

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code: string, id: string) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '');
      }
      return { code };
    },
  };
}
export default defineConfig({
  base: './',

  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],

  build: {
    outDir: 'build',
  },
});
```
## Что требовалось по заданию 
### Приложение должно состоять из двух частей:
1. По API получить факт о котах и установить данную строку в поле и установить в поле курсор после первого слова.
2. Сделать запрос по API и получить в ответ возраст и вывести его под текстовым полем.
2.1 Также нужно было предусмотреть предотвращение дублирующих запросов и прерывание запроса.
### Дополнительные задания
1. Использовать VKUI
2. Реализовать валидацию поля ввода имени.
3. Развернуть данное в виде мини-приложения в ВК
4. Следовать архитектуре Feature-Sliced Design
   TanStack Query для работы с запросами
   Typescript 
   React-Hook Form + Yup для работы с формой и валидаций
Я выполнил основные задания, а также использовал VKUI, сделал валидацию , которая предотвращала некоректный ввод и сообщала пользователю об этом
сделал deploy в виде мини-приложения ВК сделал проект на TypeScript старался следовать Feature-Sliced Design и использовал библиотеку TanStak Query для запросов.

