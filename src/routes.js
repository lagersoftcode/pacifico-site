import Login from './components/login/Component'
import Dashboard from './components/dashboard/Component'
import AddTrophy from './components/catalogs/addTrophy/Component'
import AddMedal from './components/catalogs/addMedal/Component'
import TrophyList from './components/catalogs/trophyList/Component'
import MedalList from './components/catalogs/medalList/Component'
import GiveTrophy from './components/actions/giveTrophy/Component'
import GiveMedal from './components/actions/giveMedal/Component'
import NewUser from './components/newUser/Component'
import NoMatch from './components/noMatch/Component'

export default [
  { name: 'login', path: '/login', component: Login, meta: { requiresAuth: false } },
  { name: 'dashboard', path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { name: 'addTrophy', path: '/addTrophy', component: AddTrophy, meta: { requiresAuth: true } },
  { name: 'trophyList', path: '/trophyList', component: TrophyList, meta: { requiresAuth: true } },
  { name: 'addMedal', path: '/addMedal', component: AddMedal, meta: { requiresAuth: true } },
  { name: 'medalList', path: '/medalList', component: MedalList, meta: { requiresAuth: true } },
  { name: 'giveTrophy', path: '/giveTrophy', component: GiveTrophy, meta: { requiresAuth: true } },
  { name: 'giveMedal', path: '/giveMedal', component: GiveMedal, meta: { requiresAuth: true } },
  { name: 'newUser', path: '/newUser', component: NewUser, meta: { requiresAuth: true } },
  { name: 'logout', path: '/logout' },
  { path: '*', component: NoMatch }
]