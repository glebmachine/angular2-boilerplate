import 'zone.js';
import 'core-js/es7/reflect';

import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';
import { AppModule } from './app.module.worker';

platformWorkerAppDynamic().bootstrapModule(AppModule);