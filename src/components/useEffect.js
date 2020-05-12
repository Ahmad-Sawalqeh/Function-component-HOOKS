import React, { Fragment, useState, useEffect } from "react";
import "../style.css";

// A Hook is a special function that lets you “hook into” React features for a function component
// NEVER EVER call Hooks inside loops, conditions, or nested functions

/*

Effect Hook – useEffect
- equal to ComponentDidMount, componentDidUpdate and componentWillUnmount
- need it for side Effects happen to the function components, for example: data-fetching, cleaning-up, updating-local-storage
- helps access to the state variable (or any props) in the component
- by default triggered everytime component render
- can use multiple useEffect hook inside the component

*/

// first component
const Example = () => {
  const [count, setCount] = useState(0);

  useEffect((state, props) => {
    // triggered on everytime component render
    console.log(`Component rendered/re-rendered`);
  });

  useEffect(() => {
    /* ComponentDidMount */
    // triggered only once, in the first time component render
    console.log(`Component Did Mount`);
  }, []);

  useEffect(() => {
    /* componentDidUpdate */
    // triggered only each time state variable (count) change
    console.log(`Component Did Update`);
  }, [count]);

  useEffect(() => {
    return () => {
      /* componentWillUnmount */
      // triggered before component destroyed or removed from DOM
      // used for closing socket/Unsubscribe, removing eventListener
      console.log(`Component will Unmount`);
    };
  }, []);

  let set = () => {
    let counter = count + 1;
    setCount(counter);
  };

  return (
    <Fragment>
      {console.log(`render`)}
      <p>You clicked {count} times</p>
      <button onClick={set}>Click me</button>
    </Fragment>
  );
};

// second component
const Main = () => {
  const [mount, setMount] = useState(true);

  let toggleComponent = () => {
    setMount(!mount);
  };

  return (
    <>
      <div className='effect'>
        <h2>useEffect hook</h2>
        <button onClick={toggleComponent}>Mount / unMount</button>
        {mount && <Example />}
      </div>
    </>
  );
};

export default Main;

