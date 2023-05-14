import { pokeApi } from "@/api"
import { Pokemon } from "@/interfaces"

export const getPokemonInfo = async (nameorId: string) => {

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameorId}`)
  return {
    ...data,
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }
}
