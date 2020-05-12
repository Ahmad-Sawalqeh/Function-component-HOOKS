import React, { Fragment, useState } from "react";
import "../style.css";

// A Hook is a special function that lets you “hook into” React features for a function component
// NEVER EVER call Hooks inside loops, conditions, or nested functions

/*

State Hook – useState
- used to declare a “state variable”
- returns a pair of values: the current state and a function that updates it, [0, dispatchAction()]
- const [currentState, functionToUpdateCurrentState] = useState(initialState)
- can use multiple useState hook inside the component

Effect Hook – useEffect
* explained in the useEffect.js file

Context Hook – useContext
* explained in the useContext.js file

Reducer Hook – useReducer
* explained in the useReducer.js file

*/

// first component
const Example = () => {
  const [count, setCount] = useState(0);

  let set = () => {
    let counter = count + 1;
    setCount(counter);
  };

  return (
    <Fragment>
      {console.log(`render`)}
      <div className='state'>
        <h2>useState hook</h2>
        <p>You clicked {count} times</p>
        <button onClick={set}>Click me</button>
      </div>
    </Fragment>
  );
};

export default Example;

