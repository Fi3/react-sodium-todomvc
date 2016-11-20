import React, {Component} from 'react';
import {childrenMap, render} from '../core';

class Home extends Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                {childrenMap(this.props)}
            </div>
        );
    }
}

export default render(Home);