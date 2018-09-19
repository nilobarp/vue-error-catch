import { PluginFunction } from "vue";

type HandlerFunction = (err: any) => boolean;

const ErrorHandler: PluginFunction<any> = function ErrorHandler(Vue: any) {
  let handlers: HandlerFunction[] = [];

  const factory = (handler: HandlerFunction) => {
    handlers = [handler, ...handlers];
  };

  const trigger = err => {
    for (const fn of handlers) {
      const result = fn.call({}, err);
      if (result === false) {
        break;
      }
    }
  };

  Object.defineProperties(Vue.prototype, {
    $error: {
      get() {
        return trigger;
      }
    }
  });

  Vue.mixin({
    created() {
      const handler = this.$catch;
      if (handler) {
        factory(handler);
      }
    }
  });
};

export default ErrorHandler;
