# Vue Error Catch [![Build Status](https://travis-ci.org/nilobarp/vue-error-catch.svg?branch=master)](https://travis-ci.org/nilobarp/vue-error-catch)

Trigger / catch custom errors in vue components.

Setup error listeners within Vue component to listen on errors generated anywhere in the component tree. The plugin makes it easy to trigger custom errors and notify interested components. Errors are propagated hierarchically from bottom to top. Every handler in the chain gets an opportunity to handle the error and or let it propagate it to the parent.

## Install

`npm install vue-error-catch --save`

## Usage

```js
import Vue from "vue";
import ErrorCatch from "vue-error-catch";

Vue.use(ErrorCatch);

const errorView = {
  template: "<div>Error view</div>"
};

const childComponent = {
  template: `<div><error-view v-if="renderErrorView"/></div>`,
  components: {
    errorView
  },
  data: () => ({
    hasError: false
  }),
  computed: {
    renderErrorView() {
      return this.hasError;
    }
  },
  methods: {
    $catch(e: any) {
      if (e.code === 101) {
        // handle the error
        this.hasError = true;

        // stop propagation
        return false;
      }
    }
  }
};

const parentComponent = {
  template: `<div><child/></div>`,
  components: {
    child: childComponent
  },
  methods: {
    $catch(e: any) {
      // this will never be triggered because child component
      // handled the error and returned false.
    }
  }
};

const mainComponent = {
  template: "<div><parent/></div>",
  components: {
    parent: parentComponent
  },
  mounted() {
    // trigger an error on the component tree
    this.$error({
      code: 101,
      message: "A custom error"
    });
  }
};
```

## API

- `$catch`: Called when a custom error is triggered anywhere in the component tree. Receives the thrown error as the only argument.
- `$error`: trigger a custom error. The `error` argument is passed to `$catch` hooks on the component tree until it is handled or the last hook is reached.

## Error Propagation

- `$catch` hooks are invoked from bottom to top, i.e. if a parent and child component both declares $catch hooks then the child's hook will be executed before the parent's.
- A `$catch` hook may return `false` to prevent the error from propagating further.
