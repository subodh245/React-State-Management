import { useQuery } from "@tanstack/react-query";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void;
} {
  //   const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  //   const [search, setSearcj] = useState("");

  const { data: pokemon } = useQuery<Pokemon>(
    ["pokemon"],
    () => fetch("/pokemon.json").then((res) => res.json()),
    {
      initialData: [],
    }
  );
  type PokemonState = {
    search: string;
  };
  type PokemonAction =
    // | { type: "setPokemon"; payload: Pokemon[] }
    { type: "setSearch"; payload: string };
  const [{ search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      search: "",
    }
  );

  // useEffect(() => {
  //   fetch("/pokemon.json")
  //     .then((response) => response.json())
  //     .then((data) =>
  //       dispatch({
  //         type: "setPokemon",
  //         payload: data,
  //       })
  //     );
  // }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  const filteredPokemon = useMemo(
    () =>
      pokemon.filter((p) => p.name.toLowerCase().includes(search)).slice(0, 20),
    [pokemon, search]
  );
  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );

  return { pokemon: sortedPokemon, search, setSearch };
}

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

export function usePokemon() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
