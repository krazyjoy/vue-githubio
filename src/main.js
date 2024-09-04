import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faCircleInfo, faEye, faEyeSlash, faPencil, faR, faRotate, fas} from '@fortawesome/free-solid-svg-icons'
import { library} from '@fortawesome/fontawesome-svg-core';


import App from './App.vue'
import router from './router'



library.add(faCircleInfo)
library.add(faEye)
library.add(faEyeSlash)
library.add(faRotate)
library.add(fas)
library.add(faR)
library.add(faPencil)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
