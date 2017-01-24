window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');
window._ = require('lodash');
window.moment = require('moment');
window.accounting = require('accounting');

import Vue from 'vue';
import App from './App';
import VeeValidate from 'vee-validate';
import store from './store';

Vue.use(VeeValidate, { strict: false });

/* eslint-disable no-new */

window.bus = new Vue();

window.vm = new Vue({
	el: '#app',

	components: { App },
	
	store
})
