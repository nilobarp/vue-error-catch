import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    /**
     * Called when a custom error is triggered anywhere in the component tree.
     *
     * **Propagation rule**
     * - $catch hooks are invoked from bottom to top, i.e. a child's hook is invoked before the parent's.
     * - A $catch hook can return `false` to prevent the error from propagating further.
     */
    $catch(err: any): boolean | void;
    /**
     * Trigger custom error on the component tree.
     *
     * The `err` argument will be passed to `$catch` hooks on the component tree until it is handled or the last hook is reached.
     */
    $error(err: any): void;
  }
}
