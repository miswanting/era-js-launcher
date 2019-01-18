import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { remote, ipcRenderer } from "electron";
// 前端选择
// antd
// import App from "./antd/App";
// sematic-ui-react
import App from "./sematic-ui-react/App";
import { Delaunay } from "d3-delaunay"
import * as d3 from 'd3'
import * as SimplexNoise from 'simplex-noise'
// onmessage = function (e) {
//     function randomPoints(n) {
//         var points = []
//         for (let i = 0; i < n; i++) {
//             var [w, h] = remote.getCurrentWindow().getContentSize()
//             let x = Math.random() * w
//             let y = Math.random() * h
//             points.push([x, y])
//         }
//         return points
//     }
//     var points = []
//     points = randomPoints(5000)
//     // relaxPoints(10)
//     postMessage(points, '123')
// }


/**
 * 侦听鼠标点击
 */
document.getElementById('root').addEventListener("mouseup", (e) => {
    console.log('[DEBG]鼠标点击：', e.which);
    let bag = {
        type: 'MOUSE_CLICK',
        from: 'r',
        to: 'b',
        value: e.which
    }
    send(bag)
})
window.addEventListener("keyup", (e) => {
    console.log('[DEBG]键盘按下：', e.key);
    if (e.key == '`') {
        app.isConsole = !app.isConsole
    }
    update()
})
remote.Menu.getApplicationMenu().getMenuItemById('code-editor').click = function () {
    alert('123321')
}

/**
 * 自m接受信息
 */
ipcRenderer.on('bag', (event: any, data: string) => {
    var raw = data.toString()
    // 由main打包并发送的bag不需要解除叠包
    var piece = raw.split('}{')
    for (let i = 0; i < piece.length; i++) {
        if (i != piece.length - 1) {
            piece[i] += '}'
        }
        if (i != 0) {
            piece[i] = '{' + data[i]
        }
    }
    for (let i = 0; i < piece.length; i++) {
        // console.log('[DEBG]接收：', piece[i]); // 生产环境下请注释掉
        let bag: any = JSON.parse(piece[i])
        parseBag(bag)
    }
    // 由main打包并发送的bag不需要解除叠包
    // console.log('[DEBG]接收：', raw); // 生产环境下请注释掉
    // var bag: any = JSON.parse(raw)
    // parseBag(bag)
})

/**
 * 发射信息至m
 * @param bag 
 */
function send(bag: any) {
    console.log('[DEBG]发送：', JSON.stringify(bag)); // 生产环境下请注释掉
    ipcRenderer.send('bag', JSON.stringify(bag))
}

/**
 * 解析接收到的Bag
 * @param bag 
 */
function parseBag(bag: any) {
    if (bag.type == 'connected') {
        console.log('[DEBG]后端已连接！')
        app.isConnected = true
        update()
    } else if (bag.type == 'loaded') {
        console.log('[DONE]后端数据加载完成！')
        app.isLoaded = true
        update()
    } else if (bag.type == 'title') {
        document.title = bag.value
    } else if (['connected'].indexOf(bag.type) != -1) { }
    else if ([
        't',
        'b',
        'h',
        'progress',
        'rate',
        'radio',
        'input',
        'divider',
        'chart',
        'dropdown'
    ].indexOf(bag.type) != -1) {
        // 确保pages不为空
        if (app.pages.length == 0) {
            app.pages.push({ type: 'page', children: [] })
        }
        // 确保page不为空
        let lastPageIndex = app.pages.length - 1 // 最后一个Page的index
        if (bag.type == 't' && bag.value.text == '' && app.mode[0] == 'default') { // 最后一个t的值为空：空行
            app.pages[lastPageIndex].children.push({ type: 'line', children: [] })
        } else {
            if (app.pages[lastPageIndex].children.length == 0) {
                app.pages[lastPageIndex].children.push({ type: 'line', children: [] })
            }
            // 在最后一个块的末尾加上控件
            let lastBlockIndex = app.pages[lastPageIndex].children.length - 1 // 最后一个Line的index
            if ([
                'b',
                'rate',
                'radio',
                'input',
                'dropdown'
            ].indexOf(bag.type) != -1) {
                bag.value.func = send // 向虚拟树中装载发射函数
            }
            app.pages[lastPageIndex].children[lastBlockIndex].children.push(bag)
        }
        update()
    }
    // else if (bag.type == 't') { // 文本
    //     // page
    //     if (app.pages.length == 0) { // 确保生成t之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (bag.value.text == '') { // 最后一个t的值为空：空行
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     } else {
    //         if (app.pages[iPage].children.length == 0) { // 确保生成t之前存在Line
    //             app.pages[iPage].children.push({ type: 'line', children: [] })
    //         }
    //         // 在最后page的line中加t
    //         let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //         app.pages[iPage].children[iLine].children.push(bag)
    //     }
    //     update()
    // } else if (bag.type == 'b') { // 按钮
    //     if (app.pages.length == 0) { // 确保生成b之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成b之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加b
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     bag.value.func = send // 向虚拟树中装载发射函数
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'h') { // 标题
    //     if (app.pages.length == 0) { // 确保生成h之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成h之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加h
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'progress') { // 进度条
    //     if (app.pages.length == 0) { // 确保生成progress之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成progress之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加progress
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'rate') { // 评分
    //     if (app.pages.length == 0) { // 确保生成rate之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成rate之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加b
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     bag.value.func = send // 向虚拟树中装载发射函数
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'radio') { // 单项选择
    //     if (app.pages.length == 0) { // 确保生成radio之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成radio之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加b
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     bag.value.func = send // 向虚拟树中装载发射函数
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'input') { // 单项选择
    //     if (app.pages.length == 0) { // 确保生成input之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成input之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加b
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     bag.value.func = send // 向虚拟树中装载发射函数
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'divider') { // 分割线
    //     if (app.pages.length == 0) { // 确保生成divider之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成divider之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加b
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'chart') { // 分割线
    //     if (app.pages.length == 0) { // 确保生成chart之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成chart之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加chart
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // } else if (bag.type == 'dropdown') { // 下拉列表
    //     if (app.pages.length == 0) { // 确保生成dropdown之前存在Page
    //         app.pages.push({ type: 'page', children: [] })
    //     }
    //     let iPage = app.pages.length - 1 // 最后一个Page的index
    //     if (app.pages[iPage].children.length == 0) { // 确保生成dropdown之前存在Line
    //         app.pages[iPage].children.push({ type: 'line', children: [] })
    //     }
    //     // 在最后page的line中加dropdown
    //     let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
    //     bag.value.func = send // 向虚拟树中装载发射函数
    //     app.pages[iPage].children[iLine].children.push(bag)
    //     update()
    // }
    else if (bag.type == 'page') { // 页面
        app.pages.push({ type: 'page', data: bag.value, children: [] })
        for (let i = 0; i < app.pages.length - 20; i++) { // 超出20页就删除老的
            app.pages.splice(0, 1)
        }
        update()
    } else if (bag.type == 'mode') { // 改变显示模式
        app.mode = bag.value
        if (app.mode[0] == 'grid') {
            if (app.pages.length == 0) { // 确保生成dropdown之前存在Page
                app.pages.push({ type: 'page', children: [] })
            }
            let iPage = app.pages.length - 1 // 最后一个Page的index
            app.pages[iPage].children.push({ type: bag.value[0], value: bag.value, children: [] })
            update()
        }
    } else if (bag.type == 'clear') { // 清除所有内容
        if (bag.value['num'] == 0) {
            app.pages = []
        } else {
            for (let i = 0; i < bag.value['num']; i++) {
                app.pages.pop()
            }
        }
        update()
    } else if (bag.type == 'exit') { // 清除所有内容
        var window = remote.getCurrentWindow();
        window.close();
    } else if (bag.type == 'shake') { // 屏幕抖动
        var window = remote.getCurrentWindow();
        var basePosition: number[] = window.getPosition();
        var time: number = 0
        function shakeOnce() {
            var dx = parseInt((Math.random() * 10).toString())
            var dy = parseInt((Math.random() * 10).toString())
            window.setPosition(basePosition[0] + dx, basePosition[1] + dy)
            time += 1
            if (time >= bag.value.duration) {
                clearInterval(timer)
                window.setPosition(basePosition[0], basePosition[1])
            }
        }
        var timer: NodeJS.Timer = setInterval(shakeOnce, 1)
    } else if (bag.type == 'result') { // 控制台返回结果
        app.result = bag.value
        update()
    } else if (bag.type == 'load_text') { // 加载文本
        app.load_text = bag.value
        update()
    } else if (bag.type == 'avantar_editor') { // 加载文本
        app.avantar_editor = bag.value
        update()
    } else if (bag.type == 'map_editor') { // 加载文本
        app.map_editor = bag.value
        update()
    } else if (bag.type == 'code_editor') { // 加载文本
        app.code_editor = bag.value
        update()
    } else if (bag.type == 'generate_map') { // 加载文本
        const [w, h] = remote.getCurrentWindow().getContentSize()
        var points = []
        function randomPoints(n) {
            for (let i = 0; i < n; i++) {
                let x = Math.random() * w
                let y = Math.random() * h
                points.push([x, y])
            }
        }
        function relaxPoints(n) {
            for (let i = 0; i < n; i++) {
                const delaunay = Delaunay.from(points);
                const voronoi = delaunay.voronoi([0, 0, w, h])
                for (let j = 0; j < points.length; j++) {
                    var cvt: [number, number][] = []
                    for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
                        var [x, y] = voronoi.cellPolygon(j)[k]
                        cvt.push([x, y])
                    }
                    [points[j][0], points[j][1]] = d3.polygonCentroid(cvt);
                }
            }
        }
        function generateHeight() {
            var simplex = new SimplexNoise()
            const delaunay = Delaunay.from(points);
            var new_points = []
            for (let i = 0; i < delaunay.points.length / 2; i++) {
                var x = delaunay.points[2 * i]
                var y = delaunay.points[2 * i + 1]
                var rate = simplex.noise2D(x * 0.003, y * 0.003)
                rate = (rate + 1) / 2
                rate *= rate
                var height = rate * 10000 - 2000
                new_points.push([x, y, height])
            }
            return new_points
        }
        function generateMap() {
            var simplex = new SimplexNoise()
            const delaunay = Delaunay.from(points);
            var new_points = []
            var node = delaunay.hull
            for (let i = 0; i < delaunay.points.length / 2; i++) {
                var point = {
                    i: i,
                    x: delaunay.points[2 * i],
                    y: delaunay.points[2 * i + 1],
                    h: 0,
                    n: [],
                }
                var rate = simplex.noise2D(point.x * 0.003, point.y * 0.003)
                rate = (rate + 1) / 2
                rate *= rate
                point.h = rate * 10000 - 2000
                var tmp = delaunay.neighbors(i)
                while (true) {
                    var n = tmp.next()
                    if (n.done) { break }
                    point.n.push(n.value)
                }
                new_points.push(point)
                console.log(node.next);
            }
            // do {
            //     var point = {
            //         i: node.i,
            //         x: node.x,
            //         y: node.y,
            //         h: 0,
            //         n: [],
            //     }
            //     var rate = simplex.noise2D(node.x * 0.003, node.y * 0.003)
            //     rate = (rate + 1) / 2
            //     rate *= rate
            //     point.h = rate * 10000 - 2000
            //     var tmp = delaunay.neighbors(node.i)
            //     while (true) {
            //         var n = tmp.next()
            //         if (n.done) { break }
            //         point.n.push(n.value)
            //     }
            //     new_points.push(point)
            //     console.log(node.next);

            // } while ((node = node.next) !== delaunay.hull)
            return new_points
        }
        var generator = new Promise((resolve, reject) => {
            setTimeout(function () {
                randomPoints(5000)
                relaxPoints(10)
                resolve(generateMap())
            }, 100);
        })
        generator.then(function (value) {
            let bag = {
                type: 'MAP_GENERATED',
                from: 'r',
                to: 'b',
                value: value
            }
            send(bag)
        })
    }
}
function parse_cmd(cmd_text: string) {
    let cmd = cmd_text.split(' ')
    if (cmd[0] == 'help') {
        app.result = 'test msg\n123'
        update()
    } else {
        let bag = {
            type: 'CMD',
            value: cmd,
            from: 'r',
            to: 'b'
        }
        send(bag)
    }
}
let tmp: any[] = []
let app = {
    isConnected: false,
    isLoaded: false,
    isConsole: false,
    avantar_editor: false,
    map_editor: false,
    code_editor: false,
    cmd_func: parse_cmd,
    result: '',
    load_text: '',
    pages: tmp,
    mode: ['default']
}
// var app = {
//     isConnected: false,
//     isLoaded: false,
//     isConsole: false,
//     avantar_editor: false,
//     map_editor: false,
//     code_editor: false,
//     cmd_func: parse_cmd,
//     result: '',
//     load_text: '',
//     pages: [
//         {
//             type: 'page',
//             data: {
//                 color: ''
//             },
//             children: [
//                 {
//                     type: 'line',
//                     data: {
//                         color: ''
//                     },
//                     children: [
//                         {

//                         }
//                     ]
//                 },
//                 {
//                     type: 'mode',
//                     value: ['grid', 5]
//                 },
//                 {
//                     type: 'grid',
//                     data: {
//                         color: ''
//                     },
//                     children: [
//                         {

//                         }
//                     ]
//                 }
//             ]
//         }
//     ],
//     mode: ['default']
// }
update()
function update() {
    ReactDOM.render(
        <App data={app} />,
        document.getElementById('root')
    )
}