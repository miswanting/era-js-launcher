import { app, Menu, ipcMain, BrowserWindow, Tray } from 'electron'
import * as events from 'events'
export default class WindowManager {
    data = {
        tray: null,
        splash: null,
        main: null,
        child: []
    }
    constructor() {
        app.on('ready', () => {
            this.createTray()
            this.createMainWindow()
        })
    }
    createTray(): void {
        this.data.tray = new Tray('src/res/icon.png')
        const contextMenu = Menu.buildFromTemplate([
            { label: '退出程序' }
        ])
        this.data.tray.setToolTip('Era.js Launcher')
        this.data.tray.setContextMenu(contextMenu)
    }
    createSplashWindow(): void {

    }
    createMainWindow(): void {
        this.data.main = new BrowserWindow({
            width: 1024,
            height: 768,
            transparent: true,
            frame: false,
            center: true
        })
        this.data.main.loadFile('src/main.html')
        this.data.main.webContents.openDevTools()
    }
}