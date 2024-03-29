//
import { Progress } from '../index'

const app = document.querySelector('#app') as HTMLDivElement;

const progress = new Progress({
    node: app,
    size: 108,
    borderSize: 10,
    color: "white",
    num:5 
});


// 动画
let i = 0
setInterval(() => { 
    if (i >= 100) { i = 0}
    i++
    progress.animation(i)
},1000/36)