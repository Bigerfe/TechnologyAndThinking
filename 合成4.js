
/**
 * 
 * @param {当前节点实例} inst 
 * @param {处理方法} fn 
 * @param {*} arg 
 */
function traverseTwoPhase(inst, fn, arg) {
    var path = [];//存放所有实例 ReactDOMComponent

    while (inst) {
        path.push(inst);
        inst = inst._hostParent;//层级关系
    }

    var i;

    for (i = path.length; i-- > 0;) {
        fn(path[i], 'captured', arg);//处理捕获
    }

    for (i = 0; i < path.length; i++) {
        fn(path[i], 'bubbled', arg);//处理冒泡
    }
}