import React, { useState } from 'react';
import axios from 'axios';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import './App.scss';

const App = () => {
    const [pokeTypes, setTypes] = useState([]);

    const getData = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        if (response.status === 200) {
            const pokeTypes = [];
            const { data } = response;
            for (let i = 0; i < data.count; i++) {
                const resp = await axios.get(data.results[i].url);
                if (resp.status === 200) {
                    if (resp.data.pokemon.length > 0) {
                        // taking in the data that I need initially for our bubble chart constraction
                        pokeTypes.push({
                            type: data.results[i].name,
                            count: resp.data.pokemon.length,
                            value: resp.data.pokemon.length,
                            data: resp.data,
                        });
                    }
                }
            }
            setTypes(pokeTypes);
        }
    };
    getData();

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
