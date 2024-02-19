import { useEffect } from "react";
import { useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(time);
      setTime((t) => {
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>Time: {time}</div>;
};

function App() {
  const [names, setName] = useState([]);
  useEffect(() => {
    fetch("/name.json")
      .then((resopose) => resopose.json())
      .then((data) => setName(data));
  }, []);

  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  const [selectedName, setSelectedName] = useState(null);

  // useEffect(() => {
  //   fetch(`/${selectedName}.json`)
  //     .then((resopose) => resopose.json())
  //     .then((data) => setSelectedNameDetails(data));
  // }, [selectedName]);

  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
      .then((resopose) => resopose.json())
      .then((data) => setSelectedNameDetails(data));
  };

  return (
    <>
      <div>
        <Stopwatch />
        {names.map((name) => (
          <button onClick={() => onSelectedNameChange(name)}>{name}</button>
        ))}
      </div>
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </>
  );
}

export default App;
