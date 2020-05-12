import React from 'react';
import UseState from './components/useState.js';
import UseEffect from './components/useEffect.js';
import UseContext from './components/useContext.js';
import UseReducer from './components/useReducer.js';

const App = () => {
    return (
        <div className='app'>
            <UseState />
            <UseEffect />
            <UseContext />
            <UseReducer />
        </div>
    )
}

export default App;