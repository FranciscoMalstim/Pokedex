import { useEffect, useState } from "react";
import PokemonThumb from "./components/PokemonThumb";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons= async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    
    function createPokemonObject(result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
    
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (

    <div className="app-container">
      <div className="navbar">
          <h1>Pokedex</h1>
      </div>
      <div className="pokemom-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) =>
            <PokemonThumb
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            />)}
             <button className="load-more" onClick={() => getAllPokemons()}>Carregar Mais Pokemons</button>
        </div>
      </div>
    </div>
  );
}

export default App;
