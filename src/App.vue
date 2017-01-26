<template>
	<div>
		<Navbar :items="items" :wishList="wishList" :courses="courses" :user="user"></Navbar>
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
			<div class="col-md-8 clearfix">
				<div id="cartItems">
					<ul class="list-unstyled">
						<transition-group name="itemsTransition" tag="li">
							<CartItem v-for="(item, index) in items" :key="item.uniqueId" :item="item" :index="index"
									  :items="items" :discounts="discounts" :wishList="wishList" :user="user"></CartItem>
						</transition-group>
					</ul>
				</div>
			</div>
			<div class="col-md-4">
				<PurchaseSummary :items="items" :discounts="discounts"></PurchaseSummary>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Navbar from './components/Navbar';
	import CartItem from './components/CartItem';
	import PurchaseSummary from './components/PurchaseSummary';
	import Note from './components/Note';
	import CalculationService from './CalculationService';

	import { mapState } from 'vuex';

	const calculationService = new CalculationService();

	export default {
		name: 'App',

		components: { Navbar, CartItem, PurchaseSummary, Note },

		computed: {
			...mapState([ 'discounts', 'courses', 'items', 'wishList', 'coupons', 'user' ])
		},

		data() {
			return {
			};
		},

		methods: {
			// TODO: move these to shared service class
			selectedOffering(item) {
				let o = item.offerings.find((o) => { return o.id === item.selectedOfferingId; });
				return o || null;
			},

			selectedOfferingText(item) {
				let o = this.selectedOffering(item);
				return (o !== null)
					? o.date + ', ' + o.location
					: '';
			},

			selectedDiscounts(item) {
				let o = this.selectedOffering(item);
				return o.discounts.map((d) => this.discounts[d]);
			},

			itemSubtotal(item) {
				return calculationService.calcItemSubtotal(this.itemPrice(item), this.selectedDiscounts(item));
			},

			itemPrice(item) {
				let o = this.selectedOffering(item);
				return (o ? o.cost : 0);
			},

			purchaseSubtotal() {
				let total = 0;
				for (let item of this.items) {
					total += this.itemSubtotal(item);
				}
				return total;
			}
		},
		
		created() {
			// seed one empty attendee to each cart item
			/*for (let i = 0; i < this.items.length; ++i) {
				if (this.items[i].attendees.length === 0) {
					this.addAttendee(i);
				}
			}*/
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
