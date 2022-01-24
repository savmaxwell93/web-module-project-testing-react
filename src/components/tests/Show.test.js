import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders without errors', ()=>{
    render(<Show show={testShow} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loading = screen.queryByTestId(/loading-container/i);
    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow} selectedSeason={'none'}/>)
    const seasonOptions = screen.queryAllByTestId(/season-option/i);
    expect(seasonOptions).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={'none'} handleSelect={mockHandleSelect}/>)
    const selectMenu = screen.getByLabelText(/Select a season/i);
    userEvent.selectOptions(selectMenu, ['0'])
    expect(mockHandleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason={'none'}/>)
    let episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason={1} />);
    episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).toBeInTheDocument();
});
