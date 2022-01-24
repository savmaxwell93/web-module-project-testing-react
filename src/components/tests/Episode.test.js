import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id: 1,
    name: '',
    image: 'http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg',
    season: 1,
    number: 1,
    summary: 'this is the test summary',
    runtime: 1
}

const testEpisodeNoImage = {
    id: 1,
    name: '',
    image: null,
    season: 1,
    number: 1,
    summary: 'this is the test summary',
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={testEpisode} />)
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={testEpisode}/>)
    const summary = screen.queryByText(/this is the test summary/i);
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent(/this is the test summary/i);
    expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisodeNoImage}/>);
    const defaultImage = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(defaultImage).toBeInTheDocument();
});
