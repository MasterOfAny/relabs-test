import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createStore } from "vuex";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueNativeSock from "vue-native-websocket-vue3";

const store = createStore({
    state() {
        return {
            isLogged: false
        }
    }
})

const app = createApp(App)

app
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .use(ElementPlus)
    .use(VueNativeSock, " ", {
        "connectManually": true, "reconnection": true,
        "reconnectionAttempts": 5,
        "reconnectionDelay": 3000
    })
    .mount('#app')
