import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueSocialSharing from 'vue-social-sharing';
import GSignInButton from 'vue-google-signin-button'
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'videojs-youtube';

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(VueSocialSharing);
Vue.use(GSignInButton);
Vue.use(VueVideoPlayer);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
