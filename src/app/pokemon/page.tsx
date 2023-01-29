type PokemonList = {
  count: number
  next: string
  results: Array<{
    name: string
    url: string
  }>
}

const getPokemonList = async () => {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
  )
  const json = (await res.json()) as PokemonList
  const pokemons = json.results.map((pokemon) => {
    const id = pokemon.url.split('/').at(-2)
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    const url = `/pokemon/${id}`

    return { ...pokemon, id, url, imgSrc }
  })

  return pokemons
}

const PokemonIndexPage = async () => {
  const pokemons = await getPokemonList()

  return (
    <>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h4>
            {pokemon.id} - {pokemon.name}
          </h4>
          <a href={pokemon.url}>{pokemon.name}</a>
          <img src={pokemon.imgSrc} alt={pokemon.name} />
        </div>
      ))}
    </>
  )
}

export default PokemonIndexPage
