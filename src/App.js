<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 01-get-data
import axios from 'axios';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import './App.scss';

const App = () => {
    const [pokeTypes, setTypes] = useState([]);
<<<<<<< HEAD
    const [selectedType, setSelected] = useState('');
=======
>>>>>>> 01-get-data

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
<<<<<<< HEAD
    useEffect(() => {
        // this is wehere we will make additional api calls to get related data to the selected Type
        if (selectedType) console.log(selectedType);
    }, [selectedType]);
=======

>>>>>>> 01-get-data
    return (
        <div className="App">
            <Header />
            <main>
<<<<<<< HEAD
                <span className="MonList"> place holder for Pokemon List</span>
                <BubbleChart bubbleData={pokeTypes} setSelected={setSelected} selected={selectedType} />
                <span className="Detail"> placeholder for Detail</span>
=======
                <span className="Line"> place holder for line graph</span>
                <BubbleChart bubbleData={pokeTypes} />
                <span className="Family"> placeholder for family tree</span>
>>>>>>> 01-get-data
            </main>
        </div>
    );
};

export default App;
