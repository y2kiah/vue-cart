<template>
	<div>
		<Navbar :items="items" :wishList="wishList" :user="user"></Navbar>
		<div class="row">
			<div class="col-md-12">
				<h1>Shopping Cart</h1>
				<h4>
					<span v-if="items.length">Items in Cart ({{ items.length }})</span>
					<span v-else>You have no items in your cart</span>
				</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8 col-lg-9 clearfix">
				<CartItems :items="items" :discounts="discounts" :wishList="wishList" :user="user"></CartItems>
			</div>
			<div class="col-md-4 col-lg-3">
				<PurchaseSummary :items="items" :discounts="discounts"></PurchaseSummary>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Navbar from './components/Navbar';
	import CartItems from './components/CartItems';
	import PurchaseSummary from './components/PurchaseSummary';
	import Note from './components/Note';

	export default {
		name: 'App',

		components: { Navbar, CartItems, PurchaseSummary, Note },

		data() {
			return {
				discounts: [
				{
					id: 0,
					name: '10% early-bird',
					footnote: 'Discount applied at checkout for registering more than 60 days early'
				}],

				nextItemId: 2,
				nextAttendeeId: 0,

				items: [
				{
					uniqueId: 0,
					id: 0,
					name: 'History & Application of sUAS',
					offerings: [
					{
						id: 0,
						date: 'Jan. 9 - Feb. 6, 2017',
						length: '4 weeks',
						location: 'Online',
						cost: '399',
						discounts: [0]
					},
					{
						id: 1,
						date: 'Mar. 11 - Apr. 16, 2017',
						length: '4 weeks',
						location: 'Online',
						cost: '399',
						discounts: [0]
					}],
					attendees: []
				},
				{
					uniqueId: 1,
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
					}],
					attendees: []
				}],

				wishList: [],

				user: {
					authenticated: true,
					firstname: "Jeff",
					middleinitial: "J",
					lastname: "Kiah",
					email: "kiahj@erau.edu",
					phone: "386-226-7047",
					dob: "09/06/1981",
					erauid: "0660215",
					companyname: "ERAU",
					jobtitle: "Manager of Applications Development and Integration",
					address: "600 S. Clyde Morris Blvd.",
					city: "Daytona Beach",
					state: "FL",
					zip: "32114",
					country: "United States of America"
				}
			};
		},

		methods: {
			cloneItem(index) {
				let copy = JSON.parse(JSON.stringify(this.items[index]));
				copy.uniqueId = this.nextItemId++;
				copy.attendees.splice(0);
				this.items.push(copy);
				this.addAttendee(this.items.length - 1);
			},

			removeItem(index) {
				this.items.splice(index, 1);
			},

			addAttendee(itemIndex, attendee) {
				if (attendee === undefined) {
					attendee = {
						valid: false,
						firstname: "",
						middleinitial: "",
						lastname: "",
						email: "",
						phone: "",
						dob: "",
						erauid: "",
						companyname: "",
						jobtitle: "",
						address: "",
						city: "",
						state: "",
						zip: "",
						country: ""
					};
				}
				
				attendee.uniqueId = this.nextAttendeeId++;
				this.items[itemIndex].attendees.push(attendee);
			},

			removeAttendee(itemIndex, attendeeIndex) {
				this.items[itemIndex].attendees.splice(attendeeIndex, 1);
			}

		},
		
		created() {
			bus.$on('cloneItem', (index) => {
				this.cloneItem(index);
			});

			bus.$on('addAttendee', (itemIndex, attendee) => {
				this.addAttendee(itemIndex, attendee);
			});

			bus.$on('removeAttendee', (itemIndex, attendeeIndex) => {
				this.removeAttendee(itemIndex, attendeeIndex);
			});

			for (let i = 0; i < this.items.length; ++i) {
				this.addAttendee(i);
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
