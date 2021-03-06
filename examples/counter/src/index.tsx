import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/store-next';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// 1️⃣ Create a custom hook as usual
function useCounter() {
  const [count, setCount] = useState(0);
  const decrement = () => setCount(count - 1);
  const decrementAsync = async () => {
    await delay(1000);
    decrement();
  };

  return {
    count,
    decrement,
    decrementAsync,
  };
}

const models = {
  counter: useCounter,
};

// 2️⃣ Create the store
const store = createStore(models);

// 3️⃣ Consume model
const { useModel, getModel } = store;
function Button() {
  function getCounter() {
    return getModel('counter');
  }
  function handleDecrementAsync() {
    getCounter().decrementAsync();
  }
  function handleDecrement() {
    getCounter().decrement();
  }

  console.log('Render Button.');
  return (
    <>
      <button type="button" onClick={handleDecrement}>-</button>
      <button type="button" onClick={handleDecrementAsync}>Async-</button>
    </>
  );
}
function Count() {
  const { count } = useModel('counter');

  console.log('Render Count.');
  return (<span>{count}</span>);
}

// 4️⃣ Wrap your components with Provider
const { Provider } = store;
function App() {
  return (
    <Provider>
      <Count />
      <Button />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
