import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store";

import "common/stylus/base.styl";

new Vue({
  el: '#app',
  router,
  store,
  render: (createElement) => {
    return createElement(App);
  }
});
