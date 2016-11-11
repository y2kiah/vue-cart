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
			<div class="col-md-9">
				<CartItems :items="items" :discounts="discounts" :wishList="wishList" :user="user"></CartItems>
			</div>
			<div class="col-md-3">
				<PurchaseSummary :items="items" :discounts="discounts"></PurchaseSummary>
			</div>
		</div>
		<pre>{{ $data }}</pre>
	</div>
</template>

<script>
	import Navbar from './components/Navbar'
	import CartItems from './components/CartItems'
	import PurchaseSummary from './components/PurchaseSummary'

	export default {
		name: 'App',

		components: { Navbar, CartItems, PurchaseSummary },

		data() {
			return {
				discounts: [
				{
					id: 0,
					name: '10% early-bird',
					footnote: 'Discount applied at checkout for registering more than 60 days early'
				}],

				items: [
				{
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

				wishList: [],

				user: {
					authenticated: false,
					//firstName: "Jeff",
					//lastName: "Jeff",
					//email: "kiahj@erau.edu"
				}
			};
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
