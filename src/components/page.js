import React from 'react';
import {childrenMap, render} from '../core';

class Home extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div>
            {childrenMap(this.props)}
        </div>;
    }
}

export default render(Home);