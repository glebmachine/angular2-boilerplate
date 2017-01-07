import 'core-js/es7/reflect'; // 2.3.1 -> 2.4.0

import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../.compiled/frontend/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);