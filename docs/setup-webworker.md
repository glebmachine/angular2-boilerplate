### Установить недостающие компоненты:
```bash
yarn add @angular/platform-webworker @angular/platform-webworker-dynamic
```

### Создать точку входа. Она будет загружаться внутри вебворкера:
```ts
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';
import { AppModule }                from './app.module';

platformWorkerAppDynamic().bootstrapModule(AppModule);
```

### Заменить бутстрап всего фреймворка на бутстрап интерфейса от вебворкера
```ts
import { platformWorkerUi } from '@angular/platform-webworker';
import { AppModule }        from './app.module';

platformWorkerUi().bootstrapModule(AppModule);
```
### Сделать отдельный конфиг вебпака, с `target: 'webworker'`