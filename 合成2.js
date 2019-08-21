
/**
 * 
 * @param {一个配置对象 包含当前的事件依赖 ["topClick"]，冒泡和捕获事件对应的名称 bubbled: "onClick",captured: "onClickCapture"} dispatchConfig
 * @param {组件实例ReactDomComponent} targetInst 
 * @param {原生事件对象} nativeEvent 
 * @param {事件源 e.target = div.child} nativeEventTarget 
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {

    this.dispatchConfig = dispatchConfig;
    this._targetInst = targetInst;
    this.nativeEvent = nativeEvent;//将原生对象保存到 this.nativeEvent
    //此处代码略.....
    var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;

    //处理事件的默认行为
    if (defaultPrevented) {
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    } else {
        this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
    }


    //处理事件冒泡 ,thatReturnsFalse 默认返回 false，就是不阻止冒泡
    this.isPropagationStopped = emptyFunction.thatReturnsFalse;
    return this;
}