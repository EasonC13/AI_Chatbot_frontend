/*!

 =========================================================
 * Vue Now UI Kit Pro - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/vue-now-ui-kit-pro
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase"
import "./registerServiceWorker";
//plugins
import NowUIKit from './plugins/now-ui-kit';
import $ from 'jquery'  //加上這句話
Vue.prototype.$ = $;   // 當然還有這句話 給vue原型上新增 $

Vue.config.productionTip = false;



const config = {
  apiKey: "AIzaSyBPIziWQjHUG2qZK2zQh0UE1BYc-aXuC5I",
  authDomain: "test-307522.firebaseapp.com",
  projectId: "test-307522",
  storageBucket: "test-307522.appspot.com",
  messagingSenderId: "316746676259",
  appId: "1:316746676259:web:fe7d1e84baec2a054f9996",
  measurementId: "G-J732FB1MMG"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    Vue.use(NowUIKit);
    var app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

