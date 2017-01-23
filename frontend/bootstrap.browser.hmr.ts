import 'core-js/es7/reflect'; // 2.3.1 -> 2.4.0

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { bootloader } from '@angularclass/hmr';


function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

// boot on document ready
bootloader(main);