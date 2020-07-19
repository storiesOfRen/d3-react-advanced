import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import './App.scss';

const App = () => {
    const [pokeTypes, setTypes] = useState([]);
    const [selectedType, setSelected] = useState('');

    const getBubbleData = async () => {
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
    getBubbleData();
    useEffect(() => {
        // this is wehere we will make additional api calls to get related data to the selected Type
        if (selectedType) console.log(selectedType);
    }, [selectedType]);
    return (
        <div className="App">
            <Header />
            <main>
                <span className="Line"> place holder for line graph</span>
                <BubbleChart bubbleData={pokeTypes} setSelected={setSelected} selected={selectedType} />
                <span className="Family"> placeholder for family tree</span>
            </main>
        </div>
    );
};

export default App;
