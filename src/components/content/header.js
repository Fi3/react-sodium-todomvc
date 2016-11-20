import React from 'react';
import {StreamSink} from 'sodiumjs';
import {Left, Right} from '../../either';

export default class Header {

    text;
    sSubmit;
    onEnter;

    constructor()
    {
        const sUserChangesSnk = new StreamSink();

        this.sSubmit = sUserChangesSnk
            .filter(v => v);

        this.onEnter = (event) =>
        {
            const keyPress = event.charCode !== 13
                ? Left.of(null)
                : Right.of(event.target.value);

            keyPress.map((val) =>
                sUserChangesSnk.send(event.target.value));
        }
    }

    render = (props) =>
    {
        return (<header className="header">
            <h1>todos</h1>
            <input onKeyPress={this.onEnter}
                   className="new-todo" placeholder="What needs to be done?"/>
        </header>)
    }
}