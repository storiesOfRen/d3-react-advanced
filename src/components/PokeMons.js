import React from 'react';
import Spinner from './Loading';
import './Styles.scss';

export default ({ className, pokemon, selected, setSelectedMon, listLoading }) => {
    if (listLoading) return <Spinner />;
    return (
        <aside className={className}>
            {selected && <h2>{selected} Pokemon</h2>}
            <ul>
                {pokemon.map((monster, index) => {
                    return (
                        <li key={index} className={`${className}__pokemon`}>
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
