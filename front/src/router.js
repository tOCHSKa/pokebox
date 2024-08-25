import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import About from './views/About.vue'
import PokemonList from './views/PokemonList.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/pokemons/:page?',
        name: 'pokemons',
        id: 'id',
        component: PokemonList
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
});