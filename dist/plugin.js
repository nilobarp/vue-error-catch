var ErrorHandler = function ErrorHandler(Vue) {
    var handlers = [];
    var factory = function (handler) {
        handlers = [handler].concat(handlers);
    };
    var trigger = function (err) {
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var fn = handlers_1[_i];
            var result = fn.call({}, err);
            if (result === false) {
                break;
            }
        }
    };
    Object.defineProperties(Vue.prototype, {
        $error: {
            get: function () {
                return trigger;
            }
        }
    });
    Vue.mixin({
        created: function () {
            var handler = this.$catch;
            if (handler) {
                factory(handler);
            }
        }
    });
};
export default ErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxJQUFNLFlBQVksR0FBd0IsU0FBUyxZQUFZLENBQUMsR0FBUTtJQUN0RSxJQUFJLFFBQVEsR0FBc0IsRUFBRSxDQUFDO0lBRXJDLElBQU0sT0FBTyxHQUFHLFVBQUMsT0FBd0I7UUFDdkMsUUFBUSxJQUFJLE9BQU8sU0FBSyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRixJQUFNLE9BQU8sR0FBRyxVQUFBLEdBQUc7UUFDakIsS0FBaUIsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRLEVBQUU7WUFBdEIsSUFBTSxFQUFFLGlCQUFBO1lBQ1gsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUNwQixNQUFNO2FBQ1A7U0FDRjtJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1FBQ3JDLE1BQU0sRUFBRTtZQUNOLEdBQUc7Z0JBQ0QsT0FBTyxPQUFPLENBQUM7WUFDakIsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNSLE9BQU87WUFDTCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVCLElBQUksT0FBTyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQjtRQUNILENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixlQUFlLFlBQVksQ0FBQyJ9