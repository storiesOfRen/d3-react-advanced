import React, { useState, useEffect } from 'react';
import './Styles.scss';

export default ({ className, pokemon, selected }) => {
    return (
        <aside className={className}>
            {selected && <h2>{selected} Pokemon</h2>}
            <ul>
                {pokemon.map((monster) => {
                    return (
                        <li className={`${className}__pokemon`}>
                            <button
                                onClick={() => {
                                    setSelectedMon(monster.url);
                                }}
                            >
                                {monster.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};
