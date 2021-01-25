import React from 'react';
import { getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import {fetchShow as mockFetchShow } from './api/fetchShow';

jest.mock('./api/fetchShow');


const data = {
	data: {
		name: "Show 1",
		summary: "Summary 1",
		image: { original: "original_image", medium: "medium_image", },
		_embedded: {
			episodes: [
				{
					id: 1,
					url: "url1",
					name: "Episode 1",
					season: 1,
					number: 1,
					summary: "Ep_Summary_1",
					runtime: 1,
					image: { medium: "ep1_med_image", }
				},
				{
					id: 2,
					url: "url2",
					name: "Episode 2",
					season: 1,
					number: 2,
					summary: "Ep_Summary_2",
					runtime: 2,
					image: { medium: "ep2_med_image", }
				}
			],
		}
	},
}


//Test that shows state being null so the fetching data can render
test("App renders and fetching data text shows", ()=>{
    mockFetchShow.mockResolvedValueOnce(data);
    render(<App show={null}/>);
    
    const item = screen.queryByText(/fetching data.../i);
    
    expect(item).toBeInTheDocument();
});

//Test that shows state after provided data does render
test('renders api info', () => {
    jest.resetAllMocks();
    mockFetchShow.mockResolvedValueOnce(data);
    render(<App />)

})


//Test that finds certain elements rendered after data does render 
test('renders api info', async () => {
    jest.resetAllMocks();
    mockFetchShow.mockResolvedValueOnce(data);
    render(<App />)

    const title = await screen.findByText(/show 1/i)

    const dropdown = await screen.findByText(/select a season/i)
    userEvent.click(dropdown);
    

    expect(title).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();

})

//Trying to figure our dropdown testing
test('dropdown testing', async () => {
    jest.resetAllMocks();
    mockFetchShow.mockResolvedValueOnce(data);
    render(<App />)

    const dropdown = await screen.findByText(/select a season/i)
    userEvent.click(dropdown);
    
    let options = screen.getByRole('option');
    // userEvent.click(options)

    // expect('Episode 1').toBeInTheDocument();

})