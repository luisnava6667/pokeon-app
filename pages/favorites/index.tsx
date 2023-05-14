import React, { useEffect, useState } from 'react'
import { Layouts } from '@/components/layouts'
import { FavoritePokemons } from '@/components/pokemon'
import { NoFavorites } from '@/components/ui'
import { localFavorite } from '@/util'

const FavoritesPages = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  useEffect(() => {
    setFavoritePokemons(localFavorite.pokemons())
  }, [])
  return (
    <Layouts title='Pokemons - Favorites'>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layouts>
  )
}

export default FavoritesPages
