import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Input } from "semantic-ui-react";

/**
 * 行
 */
export default class EInput extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    onChange = (e: any, data: any) => {
        let bag = {
            type: 'INPUT_CHANGE',
            from: 'r',
            to: 'b',
            hash: this.state.data.hash,
            value: data['value']
        }
        this.state.data.func(bag)
    }
    render() {
        return <Input
            defaultValue={this.props.data.default}
            size='tiny'
            onChange={this.onChange}
        />
    }
}