import React from "react";

import { useState, useEffect } from "react";

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

function createStateHook<DataType>(
  initialValue: DataType
): () => [DataType, (value: DataType) => void] {
  const subscribers = createSubscribable<DataType>();
  return () => {
    const [value, setValue] = useState<DataType>(initialValue);

    useEffect(() => subscribers.subscribe(setValue), []);

    return [
      value,
      (v: DataType) => {
        setValue(v);
        subscribers.publish(v);
      },
    ];
  };
}

const useCounter = createStateHook(0);

const Counter = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      <button
        style={{ backgroundColor: "white" }}
        onClick={() => setCount(count + 1)}
      >
        Add One
      </button>
      <div>Count = {count}</div>
    </div>
  );
};

const Test = () => {
  return (
    <div style={{ color: "white" }}>
      <Counter />
      <Nested />
    </div>
  );
};

const Nested = () => {
  return <DeeplyNested />;
};

const DeeplyNested = () => {
  return <DeeplyNestedeee />;
};

const DeeplyNestedeee = () => {
  const [count] = useCounter();

  return <div>{count}</div>;
};

export default Test;
