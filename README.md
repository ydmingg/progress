# progress 环形进度条

### 使用方法

#### 安装

```
git clone git@github.com:ydmingg/progress.git

```

#### 渲染DOM

```
import { Progress } from 'progress'

const app = document.querySelector('#app') as HTMLDivElement;
const progress = new Progress({
    node: app,
    size: 108,
    borderSize: 10,
    color: "yellow",
    num:5 
});

```

#### 动态进度

```
let i = 0
setInterval(() => { 
    if (i >= 100) { i = 0}
    i++
    progress.animation(i)
},1000/36)

```