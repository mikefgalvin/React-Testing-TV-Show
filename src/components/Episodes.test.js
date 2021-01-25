import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Episodes from './Episodes';

const episodesArr = [
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
];

//Test that just checks the render
test("Episodes renders without errors", ()=>{
    render(<Episodes episodes={[]}/>);
});


//Test that renders and rerenders with the above provides data and tests to see accuracy
test("renders without errors", () => {
    const { rerender } = render(<Episodes episodes={[]}/>)

    let episodesList = screen.queryAllByTestId('episodes');
    expect(episodesList).toStrictEqual([]);
    expect(episodesList).toHaveLength(0);


    rerender(<Episodes episodes={episodesArr}/>);
    episodesList = screen.queryAllByTestId('episodes');
    expect(episodesList).toHaveLength(2);
    

});