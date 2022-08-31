
const routes = [
  {
    path: '/',
    component: () => import('src/pages/Landing.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/people', component: () => import('pages/People.vue') },
      { path: '/loans', component: () => import('pages/Loans.vue') },
      { path: '/notifications', component: () => import('pages/Notifications.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
    ]
  },

  // 404 not found
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
