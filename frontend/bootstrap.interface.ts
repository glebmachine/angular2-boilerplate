import 'zone.js';

import {
  bootstrapWorkerUi,
  WORKER_UI_LOCATION_PROVIDERS,
  ServiceMessageBrokerFactory,
  PRIMITIVE,
} from '@angular/platform-webworker';

const workerScriptUrl = URL.createObjectURL(new Blob([`
  var importScripts_ = this.importScripts;
  this.importScripts = function importScripts() {
    for (var i = 0, scripts = new Array(arguments.length); i < scripts.length; ++i) {
      var script = arguments[i];
      if (script.indexOf('http:') !== 0 || script.indexOf('https:') !== 0) {
        script = '${window.location.origin}' + (script[0] === '/' ? script : '/' + script);
      }
      scripts[i] = script;
    }
    return importScripts_.apply(this, scripts);
  };
  importScripts('build/webworker.js');
`], {
    type: 'text/javascript'
}));

bootstrapWorkerUi(workerScriptUrl, [
  ...WORKER_UI_LOCATION_PROVIDERS,
]).then((hWnd) => {
  // register methods the WebWorker needs to run on the UI thread.
  let brokerFactory: ServiceMessageBrokerFactory = hWnd.injector.get(ServiceMessageBrokerFactory);
  let broker = brokerFactory.createMessageBroker('UI_THREAD_CHANNEL', false);

  broker.registerMethod('redirect', [PRIMITIVE],  (href: string) => {
      window.location.href = href;
  });
});