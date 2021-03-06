window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');
window._ = require('lodash');
window.moment = require('moment');
window.accounting = require('accounting');

import Vue from 'vue';
import App from './App';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, { strict: false });

/* eslint-disable no-new */

window.bus = new Vue();

new Vue({
	el: '#app',

	components: { App },
	
	data() {
		return {
		};
	}
})
