export class Progress { 
    node: HTMLDivElement
    size: number
    borderSize: number
    color: string
    num:number = 0
    maxProgress: number = 380
    circle: HTMLElement | undefined 
    circleContainerValue: HTMLElement | undefined 

    constructor({ node, size, borderSize, color, num }: {node:HTMLDivElement, size:number, borderSize:number, color:string, num:number}) { 
        this.node = node
        this.size = size
        this.borderSize = borderSize
        this.color = color

        // 初始化
        this.init()
        this.animation(num)
    }

    init() { 
        const tpl = `
            <div fxtag="progress_circle">
                <svg width="108" height="108" fxtag="progress_circle_svg">
                    <circle fill="none" stroke-miterlimit="1" cx="54" cy="54" r="49" stroke-width="10" id="circleBg"></circle>
                    <circle fill="none" stroke-miterlimit="1" cx="54" cy="54" r="49" stroke-width="10" stroke-dasharray="308" stroke-dashoffset="308" stroke-linecap="round" transform="rotate(-90 54 54)" id="circle"></circle>
                </svg>
                <div fxtag="progress_circle_value">0%</div>
            </div>
        `
        if (!this.node) {
            console.error("请检查挂载点是否正确！");
            return;
        }

        // 渲染dom
        this.node.innerHTML = tpl

        // 获取dom
        const circleContainer = this.node.querySelector('[fxtag="progress_circle"]') as HTMLElement;
        const circleContainerSvg = circleContainer.querySelector('[fxtag="progress_circle_svg"]') as HTMLElement;
        const circleContainerValue = circleContainer.querySelector('[fxtag="progress_circle_value"]') as HTMLElement;
        const circleBg = circleContainer.querySelector('#circleBg') as HTMLElement;
        const circle = circleContainer.querySelector('#circle') as HTMLElement;

        // 初始化css
        circleContainer.style.position = "relative"
        circleContainer.style.width = this.size + 'px'
        circleContainer.style.height = this.size + 'px'
        circleContainerValue.style.position = "absolute"
        circleContainerValue.style.top = "0"
        circleContainerValue.style.right = "0"
        circleContainerValue.style.bottom = "0"
        circleContainerValue.style.left = "0"
        circleContainerValue.style.width = "100%"
        circleContainerValue.style.height = "100%"
        circleContainerValue.style.margin = "auto"
        circleContainerValue.style.display = "flex"
        circleContainerValue.style.alignItems = "center"
        circleContainerValue.style.justifyContent = "center"
        circleBg.style.stroke = 'rgba(0,0,0,.1)'
        circle.style.stroke = this.color

        // 计算属性大小
        const circle_r = (this.size - this.borderSize) / 2
        const circle_stroke_width = this.borderSize
        const circle_max_progress = Math.round(2 * circle_r * Math.PI)
        const circle_cx = circle_r + circle_stroke_width / 2
        const circle_transform = `rotate(${-90} ${circle_cx} ${circle_cx})`

        // 设置属性
        circleContainerSvg.setAttribute('width', this.size.toString())
        circleContainerSvg.setAttribute('height', this.size.toString())
        circle.setAttribute('r', circle_r.toString());
        circle.setAttribute("cx", circle_cx.toString())
        circle.setAttribute("cy", circle_cx.toString())
        circle.setAttribute("stroke-width", circle_stroke_width.toString())
        circle.setAttribute("stroke-dasharray", circle_max_progress.toString())
        circle.setAttribute("stroke-dashoffset", circle_max_progress.toString())
        circle.setAttribute("transform", circle_transform)

        circleBg.setAttribute("r", circle_r.toString())
        circleBg.setAttribute("cx", circle_cx.toString())
        circleBg.setAttribute("cy", circle_cx.toString())
        circleBg.setAttribute("stroke-width", circle_stroke_width.toString())

        this.maxProgress = circle_max_progress
        this.circle = circle
        this.circleContainerValue = circleContainerValue

    }

    public animation(num: number = this.num) {
        if (!this.circle || !this.circleContainerValue) return;
        // 将输入的0-100范围内的值转换为0-1之间的小数
        let normalizedValue = num / 100;
        // 计算当前进度
        let currentProgress = this.maxProgress * (1 - normalizedValue);
        // 设置stroke-dashoffset属性
        this.circle.setAttribute("stroke-dashoffset", currentProgress.toString());
        // 设置进度值
        this.circleContainerValue.innerHTML = num + "%";
    }   
    
    
}