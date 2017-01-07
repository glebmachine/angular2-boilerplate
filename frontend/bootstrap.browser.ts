import 'core-js/es7/reflect'; // 2.3.1 -> 2.4.0
import '@types/systemjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);