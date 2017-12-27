import Vue from 'vue'
import Router from 'vue-router'
import App from '@/app'
import goods from '@/components/goods'
import ratings from '@/components/ratings'
import seller from '@/components/seller'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'app',
        component: App,
        children: [
            { path: '/', name: 'goods', component: goods },
            { path: 'ratings', name: 'ratings', component: ratings },
            { path: 'seller', name: 'seller', component: seller }
        ]
    }]
})