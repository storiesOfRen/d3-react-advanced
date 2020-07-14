import React from 'react';
import BubbleChart from './components/Vis/Bubble';
import Header from './components/Header';
import './App.scss';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <span className="Line"> place holder for line graph</span>
                <BubbleChart />
                <span className="Family"> placeholder for family tree</span>
            </main>
        </div>
    );
}

export default App;
