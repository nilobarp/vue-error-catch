import { mount, createLocalVue } from "@vue/test-utils";
import ErrorHandler from "./plugin";

describe("Vue error plugin", () => {
  it("mounts the plugin", () => {
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

    expect(wrapper.vm.$error).toBeInstanceOf(Function);
    expect(childHandler).toHaveBeenCalled();
    expect(grandChildHandler).toHaveBeenCalled();
  });
});
