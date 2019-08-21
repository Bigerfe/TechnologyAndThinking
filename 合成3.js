
//在合成类原型上增加preventDefault和stopPropagation方法
_assign(SyntheticEvent.prototype, {
    preventDefault: function preventDefault() {
        // ....略

        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    },
    stopPropagation: function stopPropagation() {
        //....略

        this.isPropagationStopped = emptyFunction.thatReturnsTrue;
    }
);