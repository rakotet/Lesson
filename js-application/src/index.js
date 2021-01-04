import {HeaderComponent} from './components/header.component'
import {NavigationComponent} from './components/navigation.component'
import {CreateComponent} from './components/create.component'
import {PostsComponent} from './components/posts.component'
import {FavoriteComponent} from './components/favorite.component'
import {LoaderComponent} from './components/loader.component'

new HeaderComponent('header') // создаём объект для компанента header

const navigation = new NavigationComponent('navigation')
const loader = new LoaderComponent('loader')

const posts = new PostsComponent('posts', {loader})
const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', {loader})

navigation.registerTabs([ // записуем в массив объекты с доступами к элементам табов
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'favorite', component: favorite}
])

