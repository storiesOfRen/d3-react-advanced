import React from 'react';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import './App.scss';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <BubbleChart />
            </main>
        </div>
    );
}

export default App;
