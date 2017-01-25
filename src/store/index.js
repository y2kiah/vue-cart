import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',

	state: {
		discounts: [
		{
			id: 0,
			name: '10% early-bird',
			footnote: 'Discount applied at checkout for registering more than 60 days early',
			percent: 10
		},
		{
			id: 1,
			name: 'ERAU alumni 10% discount',
			couponCode: 'ERAUALUMN',
			percent: 10,
			limit: 1
		},
		{
			id: 2,
			name: 'Promotional $50 discount',
			couponCode: 'ERAUPROMO',
			amount: 50,
			applied: 'total'
		}],

		courses: [{
			id: 0,
			name: 'History & Application of sUAS',
			offerings: [
			{
				id: 0,
				date: 'Jan. 9 - Feb. 6, 2017',
				length: '4 weeks',
				location: 'Online',
				cost: '399',
				discounts: []
			},
			{
				id: 1,
				date: 'Mar. 11 - Apr. 16, 2017',
				length: '4 weeks',
				location: 'Online',
				cost: '399',
				discounts: [0]
			}]
		},
		{
			id: 1,
			name: 'sUAS Design & Configuration',
			offerings: [
			{
				id: 2,
				date: 'Anytime',
				length: '4 weeks',
				location: 'Online',
				cost: '399',
				discounts: []
			}]
		}],

		items: [],

		wishList: [],

		coupons: [],

		user: {
			authenticated: true,
			firstname: "Jeff",
			middleinitial: "J",
			lastname: "Kiah",
			email: "kiahj@erau.edu",
			phone: "000-000-0000",
			dob: "08/15/1980",
			erauid: "1234567",
			companyname: "ERAU",
			jobtitle: "Manager of Applications Development and Integration",
			address: "600 S. Clyde Morris Blvd.",
			city: "Daytona Beach",
			state: "FL",
			zip: "32114",
			country: "United States of America"
		}
	},

	actions,
	mutations,
	getters
});

export default store;