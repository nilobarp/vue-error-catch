import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * Called when a custom error is triggered anywhere in the component tree.
     *
     * **Propagation rule**
     * - If multiple $catch hook exists on the component tree, all of them will be invoked for the same error.
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
