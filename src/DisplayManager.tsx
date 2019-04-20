import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App_Sem from './semantic-ui'
import App_Ele from './element'
import App_SC from './span-charm'

export default class DisplayManager {
    data = {
        fw: 'Span Charm', // 调用框架
        app: null, // 储存数据
        activeProgram: 0,
        programs: [] // 调用框架
    }
    constructor() {
        this.update()
        this.parseCmd(['EraTerminal'])
    }
    parseCmd(cmdList: string[]) {
        if (cmdList[0] == 'EraTerminal') {
            this.data.programs.unshift({
                name: cmdList[0],
                data: {},
                lines: []
            })
            this.data.activeProgram = 0
        }
        this.update()
    }
    execProgram() {

    }
    update() {
        if (this.data.fw == 'Semantic UI') {
            this.data.app = <App_Sem data={this.data} />
        } else if (this.data.fw == 'Element') {
            this.data.app = <App_Ele data={this.data} />
        } else if (this.data.fw == 'Span Charm') {
            this.data.app = <App_SC data={this.data} />
        }
        ReactDOM.render(
            this.data.app,
            document.getElementById('root')
        )
    }
}