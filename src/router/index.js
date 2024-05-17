import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '../views/ProductListView.vue'
import ProductEditView from '../views/ProductEditView.vue'


const routes = [
  {
    path: '/product',
    name: 'ProductListView',
    component: ProductListView
  },
  {
    path: '/product/edit/:id',
    name: 'ProductEditView',
    component: ProductEditView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

