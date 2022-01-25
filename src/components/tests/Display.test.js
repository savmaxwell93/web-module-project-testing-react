import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow')

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

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show =  await screen.findByTestId(/show-container/i);
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId(/season-option/i);
        expect(seasonOptions).toHaveLength(2);
    })
});

test('displayFunc is called when the fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const mockDisplayFunc = jest.fn();
    render(<Display displayFunc={mockDisplayFunc} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(mockDisplayFunc).toHaveBeenCalled();
    })
})
