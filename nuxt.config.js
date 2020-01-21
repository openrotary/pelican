module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: '醍醐代码生成器',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {
            src: '~/plugins/vueRx.js',
            ssr: true
        },
        {
            src: '~/plugins/vuesax.js',
            ssr: true
        }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: ['@nuxtjs/axios'],
    axios: {
        baseURL: 'http://127.0.0.1:3022'
    },
    server: {
        port: 3022,
        host: '0.0.0.0' // default: localhost
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.tea$/,
                loader: 'tea-loader'
            })
        }
    }
}
