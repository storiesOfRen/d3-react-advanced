/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import PokeList from './components/PokeMons';
import './App.scss';

const App = () => {
    const [pokeTypes, setTypes] = useState([]);
    const [selectedType, setSelected] = useState('');
    const [selectedPokemon, setSelectedMon] = useState('');
    const [pokemonList, setPokeList] = useState([]);

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

    const getPokemons = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
            const pokeList = [];
            data.pokemon.forEach((mon) => {
                const { pokemon } = mon;
                pokeList.push(pokemon);
            });
            setPokeList(pokeList);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // this is wehere we will make additional api calls to get related data to the selected Type
        if (selectedType) {
            getPokemons();
        }
    }, [selectedType]);

    useEffect(() => {
        if (selectedPokemon) console.log(selectedPokemon);
    }, [selectedPokemon]);
    return (
        <div className="App">
            <Header />
            <main>
                <PokeList
                    className="MonList"
                    pokemon={pokemonList}
                    selected={selectedType}
                    setSelectedMon={setSelectedMon}
                />
                <BubbleChart
                    bubbleData={pokeTypes}
                    setSelected={setSelected}
                    selected={selectedType}
                    setPokeList={setPokeList}
                />
                <span className="Detail"> placeholder for Detail</span>
            </main>
        </div>
    );
};

export default App;
