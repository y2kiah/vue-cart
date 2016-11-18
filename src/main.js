window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');
window._ = require('lodash');

import Vue from 'vue';
import App from './App';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

/* eslint-disable no-new */

new Vue({
	el: '#app',
	components: { App },
	data() {
		return {
		};
	}
})
