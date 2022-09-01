import { logout, handle_code } from 'src/scripts/auth';

const routes = [
    // landing page
    {
        path: '/',
        component: () =>
            import ('src/pages/Landing.vue')
    },

    // dashboard
    {
        path: '/dash',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/Dashboard.vue')
            },
            {
                path: '/dash/people',
                component: () =>
                    import ('pages/People.vue')
            },
            {
                path: '/dash/items',
                component: () =>
                    import ('pages/Items.vue')
            },
            {
                path: '/dash/loans',
                component: () =>
                    import ('pages/Loans.vue')
            },
            {
                path: '/dash/notifications',
                component: () =>
                    import ('pages/Notifications.vue')
            },

            {
                path: '/dash/about',
                component: () =>
                    import ('pages/About.vue')
            },
            {
                path: '/dash/help',
                component: () =>
                    import ('pages/Help.vue')
            },
            {
                path: '/dash/settings',
                component: () =>
                    import ('pages/Settings.vue')
            },
        ]
    },

    // logout (with funny hack)
    {
        path: '/logout',
        redirect: (to) => { logout(); return "/" }
    },

    // callback
    {
        path: '/callback/:code?/:state?',
        redirect: (to) => { handle_code(to); return "/dash" }
    },

    // invite link
    {
        path: '/invite/:code?',
        redirect: (to) => { return "/" } // do something here to make link work
    },

    // 404 not found
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/ErrorNotFound.vue')
    }
]

export default routes