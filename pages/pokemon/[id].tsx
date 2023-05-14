import { Layouts } from '@/components/layouts'
import { Pokemon } from '@/interfaces'
import { getPokemonInfo, localFavorite } from '@/util'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import confetti from 'canvas-confetti'
interface Props {
  pokemon: Pokemon
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorite.existInFavorite(pokemon.id)
  )
  const onToggleFavorite = () => {
    localFavorite.toggleFavorite(pokemon.id)
    setIsInFavorite(!isInFavorite)
    if (isInFavorite) return
    confetti({
      zIndex: 999,
      particleCount: 200,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }
  return (
    <Layouts title={pokemon.name}>
      <Grid.Container gap={2} css={{ marginTop: '5px' }}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  'no-image.png'
                }
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Header
              css={{
                '@media screen and (max-width: 600px)': {
                  flexDirection: 'column'
                },
                'display': 'flex',
                'justifyContent': 'space-between',
                'gap': 9
              }}>
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button
                color='gradient'
                ghost={!isInFavorite}
                onClick={onToggleFavorite}>
                {isInFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container display='flex' direction='row'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layouts>
  )
}
export const getStaticPaths: GetStaticPaths = () => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)
  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }
  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}
export default PokemonPage
