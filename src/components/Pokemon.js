import React from 'react';
import Stats from './Vis/Stats';

export default ({ pokemon }) => {
    return (
        <aside className="Detail">
            <header aria-label="Selected Pokemon header">
                <h2>{pokemon.name}</h2>
            </header>
            <main aria-label="Selected Pokemon main">
                <img alt={`${pokemon.name} default front`} src={pokemon.sprites.front_default} />
                <Stats data={pokemon.stats} />
            </main>
        </aside>
    );
};
