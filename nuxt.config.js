require('dotenv').config()
export default {
    
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0);
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/index.vue'),
                    children: [
                        {
                            name: 'Home',
                            path: '',
                            component: resolve(__dirname, 'pages/home.vue')
                        },
                        {
                            name: 'Login',
                            path: '/login',
                            component: resolve(__dirname, 'pages/login.vue')
                        },
                        {
                            name: 'Register',
                            path: '/register',
                            component: resolve(__dirname, 'pages/login.vue')
                        },
                        {
                            name: 'Setting',
                            path: '/setting',
                            component: resolve(__dirname, 'pages/setting.vue')
                        },
                        {
                            name: 'Editor',
                            path: '/editor',
                            component: resolve(__dirname, 'pages/edit.vue')
                        },
                        {
                            name: 'Article',
                            path: '/article/:slug',
                            component: resolve(__dirname, 'pages/article.vue')
                        },
                        {
                            name: 'Profile',
                            path: '/profile/:username',
                            component: resolve(__dirname, 'pages/profile.vue')
                        },
                    ]
                }
            ])
        }
    },
    // server: {
    //     host: '0.0.0.0',
    //     port: 3000
    // },

    plugins: [
        './plugins/request.js',
        './plugins/day.js'
    ]
}