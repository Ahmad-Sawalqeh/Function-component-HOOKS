import React, { Component, Fragment, useState, createContext, useContext } from "react";
import "../style.css";
  
// A Hook is a special function that lets you “hook into” React features for a function component
// NEVER EVER call Hooks inside loops, conditions, or nested functions

/*

Context Hook – useContext
- provides a way to pass data through the component tree (share state) without having to pass props down manually at every level,
- used for examples theme-color or preferred-language.
- can use multiple useContext hook inside the component

these are the main 3 steps should been taken each time using context:
1- create the context:
* singleton pattern to install "single" instance of a class. This is useful when exactly one object is needed to coordinate actions across the system
* const { Provider, Consumer } = createContext(defaultValue);

2- provide a context value:
* to provide data to the sub-components want to access to when wrapping a group of components

3- consume the context value:
* subscribe to the provider to get access to the data it holds

NOTEs:
- if you are using class component you can have access to the contextState [consume data] through property (this.context) when you use this line of code:
static contextType = yourContextNameThatYouCreatedBefore;
- if you are using function component you can have access to the contextState [consume data] through defined variable (contextState) when you use this line of code:
const contextState = useContext(yourContextNameThatYouCreatedBefore)

*/

// creating context
// const { Provider, Consumer } = createContext();
const MyContext = createContext();
const ContextProvider = MyContext.Provider;
const ContextConsumer = MyContext.Consumer;

// provider component
const GlobalContextComponent = props => {
  const [color, setColor] = useState(`blue`);
  const [toggle, setToggle] = useState(true);

  const contextState = {
    color,
    toggle,
    setColor,
    setToggle
  };

  return (
    <ContextProvider value={contextState}>{props.children}</ContextProvider>
  );
};

// *****************************************   consumer first approach
// function component
// consumer component
const App1 = () => {
  const { color, toggle, setColor, setToggle } = useContext(MyContext);
  const toggleColor = () => {
    if (toggle) {
      setColor(`red`);
      setToggle(false);
    } else {
      setColor(`blue`);
      setToggle(true);
    }
  };
  return (
    <Fragment>
      <div style={{ color: color }}>
        <h3>Function component</h3>
        <p>Hello from App component,<br/> and the color of the font is {color}</p>
        <button onClick={toggleColor}>Toggle Colors</button>
      </div>
    </Fragment>
  );
};

// *****************************************   consumer second approach
// class component
// consumer component
class App2 extends Component {
  static contextType = MyContext;
  render() {
    const { color, toggle, setColor, setToggle } = this.context;
    const toggleColor = () => {
      if (toggle) {
        setColor(`red`);
        setToggle(false);
      } else {
        setColor(`blue`);
        setToggle(true);
      }
    };
    return (
      <div style={{ color: color }}>
        <h3>Class component 1st</h3>
        <p>Hello from App component,<br/> and the color of the font is {color}</p>
        <button onClick={toggleColor}>Toggle Colors</button>
      </div>
    );
  }
}

// *****************************************   consumer third approach
// class component
// consumer component
class App3 extends Component {
  static contextType = MyContext;
  render() {
    const { color, toggle, setColor, setToggle } = this.context;
    const toggleColor = () => {
      if (toggle) {
        setColor(`red`);
        setToggle(false);
      } else {
        setColor(`blue`);
        setToggle(true);
      }
    };
    return (
      // when use consumer: we must create render-props-function
      <ContextConsumer>
        {contextValue => {
          return (
            <div style={{ color: color }}>
              <h3>Class component 2nd</h3>
              <p>
                Hello from App component,<br/> and the color of the font is {color}
              </p>
              <button onClick={toggleColor}>Toggle Colors</button>
            </div>
          );
        }}
      </ContextConsumer>
    );
  }
}

// context wrapper component
const Main = () => {
  return (
    <GlobalContextComponent>
      <div className='context'>
        <h2>useContext hook</h2>
        <App1 />
        <hr />
        <App2 />
        <hr />
        <App3 />
      </div>
    </GlobalContextComponent>
  );
};
  
export default Main;

  