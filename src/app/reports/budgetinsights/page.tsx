"use client";

import React from 'react';
import ChartComponent from './ChartComponent';

const App = () => {
    const data = [
        { budget: "Bills", total: 20000 },
        { budget: "Personal", total: 34122 },
        { budget: "Education", total: 23122 },
        { budget: "Travel", total: 53223 },
        { budget: "Transporation", total: 21312 },
        { budget: "Pets", total: 41242 },
        { budget: "Groceries", total: 21242 },
    ];


    return (
        <div className='w-8/12 mx-auto'>
            <div className='w-3/5 mx-auto'>
                <p className='text-6xl text-center text-lime-100 font-semibold p-4'>TOTAL EXPENDITURES</p>
            </div>
            <div className='bg-white rounded-lg p-4'>
                <ChartComponent data={data} />
            </div>
        </div>
    );
};

export default App;