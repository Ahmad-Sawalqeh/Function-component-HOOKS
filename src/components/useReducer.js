import React, { Fragment, useState, useReducer, useEffect } from "react";
import "../style.css";

// A Hook is a special function that lets you “hook into” React features for a function component
// NEVER EVER call Hooks inside loops, conditions, or nested functions

/*

Reducer Hook – useReducer
- an alternative to useState hook. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method
- how its work:
1- it doesn't change the state directly, we dispatch an action (object) with the type and payload properties to the reducer function 
2- reducer function looking to the type property and handle the action accordingly with different cases by using switch case statement
3- finally return new state or by default the current state

- used when have complex state logic or next state depend on previous state
- helps to reduce all functions that interact with the state
- const [currentState, dispatchActionMethod] = useReducer(reducerFunction, initialState, functionForDefaultState);
- reducerFunction(currentState, action): its switch statment, interact with state/data depending on the action through (action.type) property, return the state
- dispatchActionMethod({type:'yourAction', payload: state}): send the action to the reducerFunction

NOTE: functionForDefaultState argument is optional

*/

// using useReducer
// function component
const App1 = () => {
  const initialState = {
    color: `blue`,
    toggle: false
  };

  const colorReducer = (state, action) => {
    let { type, payload } = action;
    switch (type) {
      case "setColor":
        return { ...state, color: payload };
      case "setToggle":
        return { ...state, toggle: payload };
      default:
        return state;
    }
  };

  // optional: this just to save my state in the local storage
  const functionForDefaultState = () => {
    const localData = localStorage.getItem("state");
    return localData ? JSON.parse(localData) : initialState;
  };

  const [state, dispatch] = useReducer(
    colorReducer,
    initialState,
    functionForDefaultState
  );

  // optional: this just to save my state in the local storage
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const toggleColor = () => {
    if (state.toggle) {
      dispatch({ type: "setColor", payload: `blue` });
      dispatch({ type: "setToggle", payload: !state.toggle });
    } else {
      dispatch({ type: "setColor", payload: `red` });
      dispatch({ type: "setToggle", payload: !state.toggle });
    }
  };

  return (
    <Fragment>
      <div style={{ color: state.color }}>
        <h3>Function component using useReducer</h3>
        <p>
          Hello from App component,<br/> and the color of the font is {state.color}
        </p>
        <button onClick={toggleColor}>Toggle Colors</button>
      </div>
    </Fragment>
  );
};

// using useState
// function component
const App2 = () => {
  const [color, setColor] = useState(`blue`);
  const [toggle, setToggle] = useState(false);

  const toggleColor = () => {
    if (toggle) {
      setColor(`blue`);
      setToggle(false);
    } else {
      setColor(`red`);
      setToggle(true);
    }
  };

  return (
    <Fragment>
      <div style={{ color: color }}>
        <h3>Function component using useState</h3>
        <p>Hello from App component,<br/> and the color of the font is {color}</p>
        <button onClick={toggleColor}>Toggle Colors</button>
      </div>
    </Fragment>
  );
};

const Main = () => {
  return (
    <Fragment>
      <div className='reducer'>
        <h2>useReducer hook</h2>
        <App1 />
        <hr />
        <App2 />
      </div>
    </Fragment>
  );
};

export default Main;

