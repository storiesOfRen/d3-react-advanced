import React from 'react';
import './Styles.scss';

export default ({ className, pokemon, selected, setSelectedMon }) => {
    if (!pokemon) return;
    return (
        <aside className={className}>
            {selected.type && <h2>{selected.type} Pokemon</h2>}
            <ul>
                {pokemon.map((monster, index) => {
                    return (
                        <li key={index} className={`${className}__pokemon`}>
                            <button
                                onClick={() => {
                                    setSelectedMon(monster.pokemon.url);
                                }}
                            >
                                {monster.pokemon.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};
