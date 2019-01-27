import * as React from 'react'
import { Menu } from 'element-react'
import 'element-theme-default'
/**
 * 窗口
 */
export default class App_Ele extends React.Component<{ data: any }, {}> {
    render() {
        return <>
            <Menu mode='horizontal' >
                <Menu.Item index='1' style={{ display: 'flex', '-webkit-app-region': 'drag', height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    <img src='./res/icon.png' style={{ height: 25 + 'px', margin: 'auto' }}></img>
                    <div style={{ lineHeight: 1, margin: 'auto' }}>Era.js<br />Launcher</div>
                </Menu.Item>
                <Menu.Item index='2' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    文件
                </Menu.Item>
                <Menu.Item index='3' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    编辑
                </Menu.Item>
                <Menu.Item index='4' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    调试
                </Menu.Item>
                <Menu.Item index='5' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    窗口
                </Menu.Item>
                <Menu.Item index='6' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    帮助
                </Menu.Item>
                <Menu.Item index='7' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    <i className="el-icon-minus"></i>
                </Menu.Item>
                <Menu.Item index='8' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    <i className="el-icon-plus"></i>
                </Menu.Item>
                <Menu.Item index='9' style={{ height: 50 + 'px', lineHeight: 3, paddingLeft: 1 + 'em', paddingRight: 1 + 'em' }}>
                    <i className="el-icon-close"></i>
                </Menu.Item>
            </Menu>
        </>
    }
}