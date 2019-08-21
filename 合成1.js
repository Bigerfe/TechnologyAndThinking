//
//进行事件合成，根据事件类型获得指定的合成类
var SimpleEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        //代码已生略
        var EventConstructor;

        switch (topLevelType) {
            //代码已省略....
            case 'topClick'://【这里有一个不解的地方】 topLevelType = topClick,执行到这里了，但是这里没有做任何操作
                if (nativeEvent.button === 2) {
                    return null;
                }
            //代码已生略...
            case 'topContextMenu'://而是会执行到这里，获取到鼠标合成类
                EventConstructor = SyntheticMouseEvent;
                break;

 
            case 'topAnimationEnd':
            case 'topAnimationIteration':
            case 'topAnimationStart':
                EventConstructor = SyntheticAnimationEvent;//动画类合成事件
                break;

            case 'topWheel':
                EventConstructor = SyntheticWheelEvent;//鼠标滚轮类合成事件
                break;

            case 'topCopy':
            case 'topCut':
            case 'topPaste':
                EventConstructor = SyntheticClipboardEvent;
                break;
        }

        var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;//
    }