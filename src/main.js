window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');
window._ = require('lodash');
window.moment = require('moment');
window.accounting = require('accounting');
window.BootstrapDialog = require('bootstrap3-dialog');

import Vue from 'vue';
import App from './App';
import VeeValidate from 'vee-validate';
import store from './store';
import 'font-awesome/css/font-awesome.css';

Vue.use(VeeValidate, { strict: false });

/* eslint-disable no-new */

window.vm = new Vue({
	el: '#app',

	components: { App },
	
	store
})
