// 普通加载路由
// import KEY from './KEY.vue'
// 懒加载路由
const KEY = () => import('./KEY.vue')
export default {
  path: '/key',
  name: 'KEY',
  component: KEY,
  children: [
  ]
}