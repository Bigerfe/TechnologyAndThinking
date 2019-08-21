
/**
 * 
 * @param {*} event 合成事件对象
 * @param {*} simulated false
 * @param {*} listener 事件回调
 * @param {*} inst 组件实例
 */
function executeDispatch(event, simulated, listener, inst) {
    var type = event.type || 'unknown-event';
    event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);

    if (simulated) {//调试环境的值为 false，按说生产环境是 true 
        //方法的内容请往下看
        ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event);
    } else {
        //方法的内容请往下看
        ReactErrorUtils.invokeGuardedCallback(type, listener, event);
    }

    event.currentTarget = null;
}

/** ReactErrorUtils.js
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
var caughtError = null;
function invokeGuardedCallback(name, func, a) {
    try {
        func(a);//直接执行回调方法
    } catch (x) {
        if (caughtError === null) {
            caughtError = x;
        }
    }
}

var ReactErrorUtils = {
    invokeGuardedCallback: invokeGuardedCallback,
    invokeGuardedCallbackWithCatch: invokeGuardedCallback,
    rethrowCaughtError: function rethrowCaughtError() {
        if (caughtError) {
            var error = caughtError;
            caughtError = null;
            throw error;
        }
    }
};

if (process.env.NODE_ENV !== 'production') {//非生产环境会通过自定义事件去触发回调
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');

        ReactErrorUtils.invokeGuardedCallback = function (name, func, a) {
            var boundFunc = func.bind(null, a);
            var evtType = 'react-' + name;
            fakeNode.addEventListener(evtType, boundFunc, false);
            var evt = document.createEvent('Event');
            evt.initEvent(evtType, false, false);
            fakeNode.dispatchEvent(evt);
            fakeNode.removeEventListener(evtType, boundFunc, false);
        };
    }
}
