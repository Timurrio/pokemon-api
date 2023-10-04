
enum Type {
    NORMAL = "normal",
    FIGHTING = "fighting",
    FLYING = "flying",
    POISON = "poison",
    GROUND = "ground",
    ROCK = "rock",
    BUG = "bug",
    GHOST = "ghost",
    STEEL = "steel",
    FIRE = "fire",
    WATER = "water",
    GRASS = "grass",
    ELECTRIC = "electric",
    PHYSIC = "psychic",
    ICE = "ice",
    DRAGON = "dragon",
    DARK = "dark",
    FAIRY = "fairy",
    UNKNOWN = "unknown",
    SHADOW = "shadow"
}

type PokemonType = {
    slot: number,
    type: {
        name: Type,
        url: string
    }
}

export default PokemonType