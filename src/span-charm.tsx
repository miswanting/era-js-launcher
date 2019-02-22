import * as React from 'react'
import * as ReactDOM from 'react-dom'
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
            dsa
        </>
    }
}