import { logout } from 'src/scripts/auth';

const routes = [
  // landing page
  {
    path: '/',
    component: () => import('src/pages/Landing.vue')
  },

  // dashboard
  {
    path: '/dash',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/dash/people', component: () => import('pages/People.vue') },
      { path: '/dash/items', component: () => import('pages/Items.vue') },
      { path: '/dash/loans', component: () => import('pages/Loans.vue') },
      { path: '/dash/notifications', component: () => import('pages/Notifications.vue') },
      
      { path: '/dash/about', component: () => import('pages/About.vue') },
      { path: '/dash/help', component: () => import('pages/Help.vue') },
      { path: '/dash/settings', component: () => import('pages/Settings.vue') },
    ]
  },

  // logout
  {
    path: '/logout',
    component: () => {logout(); return import('src/pages/Landing.vue')}
  },

  // 404 not found
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
