import { useState, useEffect, createContext, useContext } from "react";

import { PokemonProvider, usePokemon } from "./store";

// interface Pokemon {
//   id: number;
//   name: string;
//   type: string[];
//   hp: number;
//   attack: number;
//   defense: number;
//   special_attack: number;
//   special_defence: number;
//   speed: number;
// }

// function usePokemonSource() {
//   const [pokemon, setPokemon] = useState<Pokemon[]>([]);

//   useEffect(() => {
//     fetch("/pokemon.json")
//       .then((response) => response.json())
//       .then((data) => setPokemon(data));
//   });

//   return { pokemon };
// }

// const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
//   {} as unknown as ReturnType<typeof usePokemonSource>
// );
// function uesPokemon() {
//   return useContext(PokemonContext)!;
// }

const PokemonList = () => {
  const { pokemon } = usePokemon();
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

function App() {
  return (
    <>
      <PokemonProvider>
        <div className="mx-auto max-w-3xl">
          <PokemonList />;
        </div>
      </PokemonProvider>
    </>
  );
}

export default App;
