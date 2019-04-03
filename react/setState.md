### 关于 react setState 的理解
面试的时候经常会被问  你对setState的理解，setState 是同步的还是异步的，并说明原因！
然而这个题目回答同步还是异步都没有问题，关键还是看你是怎么理解的。

对于猪爸爸来说，我认为 setState 本身是同步的，然而 react处理和渲染的过程给我们的感觉是异步的。内部代码其实都是同步的。

像下面的代码大家应该都知道，无论经过多少次 setState，state 的值是不会更新的。直到render 被调用才会更新到 state 上。

state 内的值是不会累加的，而是会合并和覆盖。你多次+1，最终还是1.

从表象上看，我们不会在实际中去写这样的代码，但是肯定也会存在这样的代码，所以 react 给我们做了处理。调用 react 的目的是为了渲染，而连续多次调用的话那可能就是非正常的调用了，每次都触发渲染其实也是没有必要的。所以react 内部会把数据合并成最终值后再渲染。 具体的机制我后面应该会分析。

```javascript
 componentDidMount(){
        this.setState({
            count: this.state.count + 1
        });
        this.setState({
            count: this.state.count + 1
        });
        this.setState({
            count: this.state.count + 1
        });
        this.setState({
            count: this.state.count + 2
        });
        this.setState({
            count: this.state.count + 5,
            stay: 100
        }, () => {
            console.log('callback1 ', this.state);
        });
        this.setState({
            count: this.state.count + 6,
            temp: 'temp1111'
        }, () => {
            console.log('callback 2 ', this.state);
        });

        this.setState((state, props) => {
            console.log('function in state', state);
            return {
                count: 1,
                temp: '200'
            }
        });
 }

```

#### 模拟合并机制
上面的代码我们都会熟悉吧，那我们来模拟下他的合并机制（代码仅供参考）。

```javascript

function react(){
    this.state={};
    this.nextState=null;
    this.renderEndCallback=[];//渲染完成后需要执行的方法


    this.willMount=function(){
        console.log('willMount');
    }

    this.didMount=function(){
        console.log('didMount');
    }
}

react.prototype.setState=function(obj,callback){
    //obj是对象
    if(obj && typeof obj === 'object'){//如果是对象则进行合并
            this.nextState = {...this.state,...this.nextState,...obj};
            if(typeof callback==='function'){
                this.renderEndCallback.push(callback);
            }
    }

    //obj 是函数
    if(obj  && typeof obj==='function'){
        this.nextState = this.nextState ? this.nextState:({...this.state});
        var tempState = obj(this.nextState);//此处省略 props 参数

        this.nextState = {...this.state,...this.nextState,...tempState};
    }

}

react.prototype.getState=function(){
    this.state={...this.nextState};
    return this.state;
}

react.prototype.render=function(){
   var state=this.getState();
   console.dir('render state');
   console.log(state);

   this.renderEndCallback.forEach((fn)=>(fn.call(this)));
   
}

var title = new react();//实例化一个组件
//初始化 state
title.state={
    count:0,
    name:'zhangsan'
}
//设置 state  1次
title.setState({
    count:1
});

//设置 state  2次
title.setState({
    count:2
},function(){
    console.log('callback',this.state);
});

console.log(title.state);

//设置 state  3次
title.setState((preState)=>{
    return {
        count:preState.count+3,
        age:20,
        address:'北京'
    }
});
console.log(title.state);

//设置 state  4次
title.setState({
    count:1
});

//设置 state  5次
title.setState((preState)=>{
    console.log('title.state',title.state);
    return {
        count:preState.count+3
    }
});

title.render();

```


#### setState 机制

待续......