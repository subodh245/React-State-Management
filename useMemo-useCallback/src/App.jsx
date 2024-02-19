import { useCallback } from "react";
import { useMemo, useState } from "react";

function SortedList({ list, sortFunc }) {
  console.log("SortedList render");

  const sortedList = useMemo(() => {
    console.log("running sort");
    return [...list].sort(sortFunc);
  }, [list, sortFunc]);
  return <div>{sortedList.join(", ")}</div>;
}

function App() {
  const [numbers] = useState([10, 20, 38]);

  const total = useMemo(
    () => numbers.reduce((acc, numbers) => acc + numbers, 0),
    [numbers]
  );
  const [names] = useState(["subodh", "sumedh", "sanjivanee"]);

  const sortedNames = useMemo(() => [...names].sort(), [names]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = count1 + count2; //useMemo(() => count1 + count2, [count1,count2])

  const sortFunc = useCallback((a, b) => a.localeCompare(b), []);

  return (
    <>
      <div>Total:{total}</div>
      <div>Name:{names.join(", ")}</div>
      <SortedList list={names} sortFunc={sortFunc} />
      <button onClick={() => setCount1(count1 + 1)}>Count: {count1}</button>
      <button onClick={() => setCount2(count2 + 2)}>Count: {count2}</button>
      <div>Total:{countTotal}</div>
    </>
  );
}

export default App;
