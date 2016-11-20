import React, {Component} from 'react';
import {childrenMap, render} from '../core';

class Page extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div>
            <h1>A Page</h1>
            {childrenMap(this.props)}
        </div>;
    }
}

export default render(Page);