import * as React from 'react'
import { Grid } from "semantic-ui-react";
import Text from "./Text";
import EButton from "./EButton";
import EHeader from "./EHeader";
import EProgress from "./EProgress";
import ERate from "./ERate";
import ERadio from "./ERadio";
import EInput from "./EInput";
import EDivider from "./EDivider";
import EChart from "./EChart";
import EDropdown from './EDropdown';

/**
 * 标题
 * BUG: <Header> 不应该位于 <p> 中。
 */
export default class EGrid extends React.Component<{ data: any }, {}> {
    render() {
        var rows = []
        function addItem(item: any) {
            if (rows.length == 0) {
                rows.push([])
            }
            if (rows[rows.length - 1].length == 0) {
                rows[rows.length - 1].push([])
            }
            rows[rows.length - 1][rows[rows.length - 1].length - 1].push(item)
        }
        function tab(props) {
            if (rows.length == 0) {
                rows.push([])
            }
            if (rows[rows.length - 1].length == 0) {
                rows[rows.length - 1].push([])
            }
            if (rows[rows.length - 1].length == props.data.value[1]) {
                rows.push([])
            } else {
                rows[rows.length - 1].push([])
            }
        }
        for (let i = 0; i < this.props.data.children.length; i++) {
            var item = this.props.data.children[i]
            if (item.type == 't') {
                if (item.value.text == '') {
                    tab(this.props)
                }
                else {
                    addItem(<Text key={i} data={item.value} />)
                }
            } else if (item.type == 'b') {
                addItem(<EButton key={i} data={item.value} />)
            } else if (item.type == 'h') {
                addItem(<EHeader key={i} data={item.value} />)
            } else if (item.type == 'progress') {
                addItem(<EProgress key={i} data={item.value} />)
            } else if (item.type == 'rate') {
                addItem(<ERate key={i} data={item.value} />)
            } else if (item.type == 'radio') {
                addItem(<ERadio key={i} data={item.value} />)
            } else if (item.type == 'input') {
                addItem(<EInput key={i} data={item.value} />)
            } else if (item.type == 'divider') {
                addItem(<EDivider key={i} data={item.value} />)
            } else if (item.type == 'chart') {
                addItem(<EChart key={i} data={item.value} />)
            } else if (item.type == 'dropdown') {
                addItem(<EDropdown key={i} data={item.value} />)
            }
        }
        var rs = rows.map((row, i) => {
            var cs = row.map((column, j) => {
                var is = column.map((column, j) => {
                    return <>{column}</>
                })
                return <Grid.Column>{is}</Grid.Column>
            })
            return <Grid.Row>{cs}</Grid.Row>
        })
        return <Grid textAlign='center' columns={this.props.data.value[1]}>
            {rs}
        </Grid>
    }
}