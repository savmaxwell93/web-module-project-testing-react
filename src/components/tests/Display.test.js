import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

const testShow = {
    name: 'test show',
    summary: 'this is the test summary',
    seasons: [{
        id: 0,
        name: 'test season 1',
        episodes: []
    },
    {
        id: 1,
        name: 'test season 2',
        episodes: []
    }]
}

test('renders without errors with no props', ()=>{
    render(<Display/>)
});

test('renders Show component when the button is clicked ', ()=>{});

test('renders show season options matching your data when the button is clicked', ()=>{});
