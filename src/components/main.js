import React from 'react';
import {childrenMap, render} from '../core';

class Main extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <section className="main">
            {childrenMap(this.props)}
        </section>;
    }
}

export default render(Main);