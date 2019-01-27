import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Menu, Dropdown, Image, Icon, Button, List } from 'semantic-ui-react'
const remote = require('electron').remote;
import 'semantic-ui-css/semantic.min.css'
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
export default class App_Sem extends React.Component<{ data: any }, {}> {
    menuBar
    constructor(props) {
        super(props)
        this.menuBar = React.createRef();
    }
    render() {
        let gameList = this.props.data.gameList.map((gameName) =>
            // <Segment style={{ margin: 1 + 'em' }}>{gameName}</Segment>
            <List.Item>
                <Image />
                <List.Content>
                    <List.Header>{gameName}</List.Header>
                    <List.Description>aaaaaaaa</List.Description>
                </List.Content>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
            </List.Item>
        )
        return <>
            {/* <Menu size='tiny' borderless fixed='top'> */}
            <Menu size='tiny' borderless fixed='top' style={{ margin: 0 }} ref={this.menuBar}>
                <Menu.Item header style={{ webkitAppRegion: 'drag' }}>
                    <Image src='./res/icon.png' avatar></Image>
                    Era.js<br />Launcher
                </Menu.Item>
                <Dropdown text='文件' item icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Item disabled>打开</Dropdown.Item>
                        <Dropdown.Item disabled>打开文件夹</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={closeWindow}>退出</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown text='编辑' item icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Item disabled>头像</Dropdown.Item>
                        <Dropdown.Item disabled>地图</Dropdown.Item>
                        <Dropdown.Item disabled>图形化代码</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown text='调试' item icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={openDevTools}>前端</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown text='窗口' item icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Item disabled>放大</Dropdown.Item>
                        <Dropdown.Item disabled>缩小</Dropdown.Item>
                        <Dropdown.Item disabled>重置</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown text='帮助' item icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Item disabled>教程</Dropdown.Item>
                        <Dropdown.Item disabled>文档</Dropdown.Item>
                        <Dropdown.Item disabled>API 参考</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled>支持</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled>更新</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled>关于</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Menu position='right'>
                    <Menu.Item onClick={minWindow} link>
                        <Icon name='minus'></Icon>
                    </Menu.Item>
                    <Menu.Item onClick={maxWindow} link>
                        <Icon name='plus'></Icon>
                    </Menu.Item>
                    <Menu.Item onClick={closeWindow} link>
                        <Icon name='close'></Icon>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <List style={{ 'overflow-y': 'auto', margin: 0, height: 100 + 'px' }}>
                {gameList}
            </List>
        </>
    }
}