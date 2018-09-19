import { mount, createLocalVue } from "@vue/test-utils";
import ErrorHandler from "./plugin";

describe("Vue error plugin", () => {
  it("mounts the plugin", () => {
    const Vue = createLocalVue();
    Vue.use(ErrorHandler);

    const mainComponent = {
      template: "<div/>"
    };

    const wrapper = mount(mainComponent, {
      localVue: Vue
    });

    expect(wrapper.vm.$error).toBeInstanceOf(Function);
  });

  it("triggers $catch in all component", () => {
    const Vue = createLocalVue();
    Vue.use(ErrorHandler);

    const childHandler = jest.fn();
    const grandChildHandler = jest.fn();

    const grandChildComponent = {
      template: "<div>grandchild component</div>",
      methods: {
        $catch(e: Error) {
          grandChildHandler(e);
        }
      }
    };
    const childComponent = {
      template: "<div><grandchild/></div>",
      components: {
        grandchild: grandChildComponent
      },
      methods: {
        $catch(e: Error) {
          childHandler(e);
        }
      }
    };
    const mainComponent = {
      template: "<div><child/></div>",
      components: {
        child: childComponent
      },
      mounted() {
        this.$error(new Error("error in mounted method"));
      }
    };

    const wrapper = mount(mainComponent, {
      localVue: Vue
    });

    expect(childHandler).toHaveBeenCalled();
    expect(grandChildHandler).toHaveBeenCalled();
  });

  it("triggers handlers bottom to top", () => {
    const Vue = createLocalVue();
    Vue.use(ErrorHandler);

    const callSequence = [];

    const grandChildComponent = {
      template: "<div>grandchild component</div>",
      methods: {
        $catch(e: Error) {
          callSequence.push("GRANDCHILD");
        }
      }
    };
    const childComponent = {
      template: "<div><grandchild/></div>",
      components: {
        grandchild: grandChildComponent
      },
      methods: {
        $catch(e: Error) {
          callSequence.push("CHILD");
        }
      }
    };
    const mainComponent = {
      template: "<div><child/></div>",
      components: {
        child: childComponent
      },
      mounted() {
        this.$error(new Error("error in mounted method"));
      }
    };

    mount(mainComponent, {
      localVue: Vue
    });

    expect(callSequence).toEqual(["GRANDCHILD", "CHILD"]);
  });

  it("stops propagation on returning false", () => {
    const Vue = createLocalVue();
    Vue.use(ErrorHandler);

    const childOneHandler = jest.fn();
    const childTwoHandler = jest.fn();

    const childOne = {
      template: "<div/>",
      methods: {
        $catch(e: Error) {
          childOneHandler(e);
        }
      }
    };
    const childTwo = {
      template: "<div/>",
      methods: {
        $catch(e: Error) {
          childTwoHandler(e);
          return false;
        }
      }
    };
    const mainComponent = {
      template: "<div><child-one/><child-two/></div>",
      components: {
        childOne,
        childTwo
      },
      mounted() {
        this.$error(new Error("error in mounted method"));
      }
    };

    mount(mainComponent, {
      localVue: Vue
    });

    expect(childOneHandler).not.toHaveBeenCalled();
    expect(childTwoHandler).toHaveBeenCalled();
  });

  it("error can be any object", () => {
    const Vue = createLocalVue();
    Vue.use(ErrorHandler);

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
            this.hasError = true;

            // stop error propagation
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
          // this will never be triggered
        }
      }
    };

    const mainComponent = {
      template: "<div><parent/></div>",
      components: {
        parent: parentComponent
      },
      mounted() {
        this.$error({
          code: 101,
          message: "A custom error"
        });
      }
    };

    const wrapper = mount(mainComponent, { localVue: Vue });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("div").text()).toBe("Error view");
    });
  });
});
