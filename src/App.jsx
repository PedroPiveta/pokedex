import  useFetch from './hooks/useFetch'

function App() {

  const { data, loading, error } = useFetch("https://pokeapi.co/api/v2/pokemon/");

  console.log(data)

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {data && (
        <div>
          <h1>Pokemons</h1>
          <ul>
            {data.results.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))
            }
          </ul>
        </div>
      )}
    </>
  )
}

export default App
