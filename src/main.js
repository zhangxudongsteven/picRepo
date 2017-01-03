import Vue from 'vue'
import App from './App.vue'

require('./app.css');
require('vue-strap');

Vue.use(require('vue-resource'));

new Vue({
    el: '#app',
    render: h => h(App)
})
