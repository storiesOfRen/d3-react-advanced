import React, { useState } from 'react';
import axios from 'axios';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import './App.scss';

const App = () => {
    const [pokeTypes, setTypes] = useState([]);

    const getInitialData = async () => {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/type');
            const types = [];
            for (let i = 0; i < data.count; i++) {
                const response = await axios.get(data.results[i].url);
                if (response.status === 200 && response.data.pokemon.length > 0) {
                    types.push({
                        type: data.results[i].name,
                        count: response.data.pokemon.length,
                        value: response.data.pokemon.length,
                        data: response.data,
                    });
                }
            }
            setTypes(types);
        } catch (err) {
            console.error(err);
        }
    };
    getInitialData();

    return (
        <div className="App">
            <Header />
            <main>
                <span className="Line"> place holder for line graph</span>
                <BubbleChart bubbleData={pokeTypes} />
                <span className="Family"> placeholder for family tree</span>
            </main>
        </div>
    );
};

export default App;
