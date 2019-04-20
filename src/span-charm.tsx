import * as React from 'react'
import './span-charm/span-charm.css'
const remote = require('electron').remote;
function openDevTools() {
    remote.getCurrentWindow().webContents.openDevTools();
}
function minWindow() {
    remote.getCurrentWindow().minimize();
}
function maxWindow() {
    if (!remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().maximize();
    } else {
        remote.getCurrentWindow().unmaximize();
    }
}
function closeWindow() {
    remote.getCurrentWindow().close();
}
export default class App_SC extends React.Component<{ data: any }, {}> {
    componentDidMount() {
        let body = document.body.clientHeight
        let nav = document.getElementById('nav').clientHeight
        document.getElementById('viewport').style.height = body - nav + 'px'
        document.getElementById('viewport').addEventListener('click', (e) => {

        })
    }
    render() {
        // 标题管理
        let titles = []
        for (let i = 0; i < this.props.data.programs.length; i++) {
            const program = this.props.data.programs[i];
            titles.push(
                <span className="title" key={i}>
                    {program.name}
                    <span className="close">
                        ●
                    </span>
                </span>
            )
        }
        // 内容处理

        return <>
            <nav id='nav'>
                <span className="menu">
                    ≡
                </span>
                {titles}
                <span className="min">
                    ●
                </span>
                <span className="max">
                    ●
                </span>
                <span className="close">
                    ●
                </span>
            </nav>
            <div id='viewport' className="viewport">
                <div className="container">
                    <EraTerminal data={this.props.data.programs[this.props.data.activeProgram]}></EraTerminal>
                </div>
            </div>
        </>
    }
}

class EraTerminal extends React.Component<{ data: any }, {}>{
    componentDidMount() {
        let body = document.body.clientWidth
        let icon = document.getElementById('input-icon').clientWidth
        document.getElementById('input-value').style.width = body - icon + 'px'
        console.log(body,icon,body - icon);
        
    }
    windowActive() {

    }
    render() {
        let output = []
        let input = []
        return <>
            <div className="output">
                <div>EraTerminal [版本 0.1.0-190420]</div>
            </div>
            <div className="input">
                <div id='input-icon' className="input-icon">></div>
                <div id='input-value' className="input-value" contentEditable={true}></div>
            </div>
        </>
    }
}
class EraEngine extends React.Component<{ data: any }, {}>{
    render() {
        return <>
            <div className="output">
                <div>EraTerminal [版本 0.1.0-190420]</div>
            </div>
            <div className="input">
                <div className="input-icon">></div>
                <div className="input-value" contentEditable={true}></div>
            </div>
        </>
    }
}