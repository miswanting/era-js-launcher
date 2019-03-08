import * as React from 'react'
import * as ReactDOM from 'react-dom'
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
    render() {
        return <>
            <nav>
                <span className="menu">
                    ≡
                </span>
                <span className="title">
                    EraTerminal
                </span>
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
            <div className="viewport">
                <div className="container">
                    <div className="output">
                        <div>Span Charm [版本 0.1.0]</div>
                    </div>
                    <div className="input">
                        <div className="input-icon">></div>
                        <div className="input-value" contentEditable={true}></div>
                    </div>
                </div>
            </div>
        </>
    }
}