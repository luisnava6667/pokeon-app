import { pokeApi } from '@/api'
import { Layouts } from '@/components/layouts'
import { GetStaticProps, NextPage } from 'next'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { PokemonCard } from '@/components/pokemon'
interface Props {
  pokemons: SmallPokemon[]
}
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layouts title='Listado de Pokémon'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </Grid.Container>
    </Layouts>
  )
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}
export default HomePage
