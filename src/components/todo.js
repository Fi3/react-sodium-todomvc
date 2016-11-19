import {compose} from '../core';

import Page from './page';
import Home from './home';
import {ContentA as Top, ContentB as Middle, ContentC as Bottom} from './content';

const contentBlock = [
    Top,
    Middle,
    Bottom
];

class Todo {
    constructor(initState = {id: 10})
    {
        const todoComponent = compose(Page, Home)(contentBlock);
    }
}

export default compose(Page, Home)(contentBlock);