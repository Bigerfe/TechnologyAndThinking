

/**EventPropagators.js
 * 查找事件回调后，把实例和回调保存到合成对象内
 * @param {组件实例} inst 
 * @param {事件类型} phase 
 * @param {合成事件对象} event 
 */
function accumulateDirectionalDispatches(inst, phase, event) {
    var listener = listenerAtPhase(inst, event, phase);
    if (listener) {//如果找到了事件回调，则保存起来 （保存在了合成事件对象内）
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);//把事件回调进行合并返回一个新数组
        event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);//把组件实例进行合并返回一个新数组
    }
}

/**
 * EventPropagators.js
 * 中间调用方法 拿到实例的回调方法
 * @param {实例} inst 
 * @param {合成事件对象} event 
 * @param {名称，捕获capture还是冒泡bubbled} propagationPhase
 */
function listenerAtPhase(inst, event, propagationPhase) {
    var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
    return getListener(inst, registrationName);
}

/**EventPluginHub.js
 * 拿到实例的回调方法
 * @param {object} inst 组件实例
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} 返回回调方法
 */
getListener: function getListener(inst, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];

    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
        return null;
    }

    var key = getDictionaryKey(inst);
    return bankForRegistrationName && bankForRegistrationName[key];
}