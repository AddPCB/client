import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState({});

  async function getPokemon() {
    try {
      const API = `/pokemon`;
      const res = await axios.get(API);
      setPokemon(res.data);
    } catch (error) {
      console.error(error);
      setPokemon({});
    }
  }

  return (
    <div className="App">
      <button onClick={getPokemon}>Who's that pokemon?!</button>
      {Object.keys(pokemon).length > 0 && (
        <div className={`pokemon-card type-${pokemon.types[0].type.name}`}>
          <h2>{pokemon.name}</h2>
          {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />}
          <div className="pokemon-info">
            <div className="info-category-abilities">
              <h3>🎓 Abilities</h3>
              <ul>
                {pokemon.abilities &&
                  pokemon.abilities.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}
              </ul>
            </div>
            <div className="info-category-stats">
              <h3>📈 Base Stats</h3>
              <ul className="base-stats">
                {pokemon.stats &&
                  pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      <span className={`stat-icon-${stat.stat.name}`}></span>
                      <span className={`stat-name-${stat.stat.name}`}>{stat.stat.name}:</span>
                      <span className="stat-value">{stat.base_stat}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="info-category-type">
              <h3> Type</h3>
              <ul>{pokemon.types && pokemon.types.map((type) => <li key={type.type.name}>{type.type.name}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
      {Object.keys(pokemon).length === 0 && <p>Press the button to get a Pokemon!</p>}
    </div>
  );
}

export default App;
