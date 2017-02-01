<template>
	<div>
		<Navbar :items="items" :wishList="wishList" :courses="courses" :user="user"></Navbar>
		<div class="row">
			<div class="col-md-12">
				<h1>Shopping Cart</h1>
				<h3>{{ items.length ? 'Items in cart ('+ items.length +')' : 'You have no items in your cart' }}</h3>
			</div>
		</div>

		<div class="row">
			<div class="col-md-8 clearfix">
				<div id="cartItems">
					<transition-group name="slide-fade" tag="ul" class="list-unstyled">
						<CartItem v-for="(item, index) in items" :key="item.uniqueId" :item="item" :index="index"
								  :items="items" :discounts="discounts" :wishList="wishList" :user="user"></CartItem>
					</transition-group>
				</div>
			</div>
			<div class="col-md-4">
				<PurchaseSummary :items="items" :discounts="discounts"></PurchaseSummary>
			</div>
		</div>
		
		<transition name="fade">
			<div id="wishListItems" class="row" v-if="wishList.length">
				<div class="col-md-8 clearfix">
					<h3>Wish list items ({{ wishList.length }})</h3>
					<transition-group name="slide-fade" tag="ul" class="list-unstyled">
						<WishListItem v-for="(item, index) in wishList" :key="item.id" :item="item" :index="index"></WishListItem>
					</transition-group>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Navbar from './components/Navbar';
	import CartItem from './components/CartItem';
	import WishListItem from './components/WishListItem';
	import PurchaseSummary from './components/PurchaseSummary';
	import CalculationService from './CalculationService';

	import { mapState } from 'vuex';

	const calculationService = new CalculationService();

	export default {
		name: 'App',

		components: { Navbar, CartItem, PurchaseSummary, WishListItem },

		computed: {
			...mapState([ 'discounts', 'courses', 'items', 'wishList', 'coupons', 'user' ])
		},

		data() {
			return {
				leaving: false
			};
		},

		methods: {
			// TODO: move these to shared service class
			selectedOffering(item) {
				let o = item.offerings.find((o) => o.id === item.selectedOfferingId);
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

	#wishListItems {

	}

	.cart-item {
		/*position: relative;
		z-index: 2;*/
	}

	.wish-list-item {
		border-top: 1px solid #ddd;
		padding: 10px 0;
	}

	/* slide-fade transition */

	.slide-fade-enter, .slide-fade-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	.slide-fade-leave-active {
		position: absolute;
		transition: all 4s;
	}

	.slide-fade-leave-active:last-child {
		position: inherit;
		transition: all 4s;
	}

	.slide-fade-enter-active, .slide-fade-move {
		transition: all 4s;
	}

	/* fade transition */

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	.fade-enter-active, .fade-leave-active, .fade-move {
		transition: all .4s;
	}
</style>
