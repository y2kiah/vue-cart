<template>
	<li>
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="pull-right">
					<a href="#" class="wish-list" @click="moveToWishListClick($event, index)">
						<i class="glyphicon glyphicon glyphicon-heart-empty"></i> Save for later
					</a>
					<a href="#" @click="removeItemClick($event, index)">
						<i class="glyphicon glyphicon-remove"></i> Delete
					</a>
				</div>
				
				<h4>ITEM {{ index+1 }}</h4>

				<h2>{{item.name}}</h2>

				<CourseOfferings :item="item" :index="index" :items="items" :discounts="discounts" />

				<Attendee :item="item" :attendee="item.attendee" :itemIndex="index" :user="user" :items="items" :allAttendees="allAttendees"></Attendee>

				<div class="clearfix">
					<div class="pull-left">
						<a href="#" class="" @click="copyItemClick($event, index)">
							<i class="glyphicon glyphicon glyphicon-shopping-cart"></i>+ Add Another<!-- Date/Location or Attendee for this course-->
						</a>
					</div>

					<div class="pull-right text-right" v-if="selectedOffering !== null">
						Course price: {{ formatMoney(selectedOffering.cost) }}
						<div v-for="d in selectedDiscounts">
							{{ d.name }} discount: &ndash; {{ formatMoney(discountAmount(d)) }}
						</div>
						<div class="price">
							<span>Item Subtotal:</span>
							{{ formatMoney(itemSubtotal) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
	import CourseOfferings from './CourseOfferings';
	import Attendee from './Attendee';
	import Note from './Note';
	import CalculationService from '../CalculationService';
	import { scrollUpTo } from '../helpers';

	const calculationService = new CalculationService();

	export default {
		name: 'CartItem',

		props: [ 'item', 'index', 'items', 'discounts', 'wishList', 'user' ],

		components: { CourseOfferings, Attendee, Note },

		data() {
			return {
				collapsed: false
			};
		},

		computed: {
			selectedOffering() {
				return this.$parent.selectedOffering(this.item);
			},

			price() {
				return this.$parent.itemPrice(this.item);
			},

			selectedDiscounts() {
				return this.$parent.selectedDiscounts(this.item);
			},

			itemSubtotal() {
				return this.$parent.itemSubtotal(this.item);
			},

			/**
			 * Return unique set of attendees across all cart items
			 * @return {Array}
			 */
			allAttendees() {
				let attendees = this.items.map((a) => a.attendee);
				attendees = attendees.filter((a) => a.email);
				attendees = _.uniqBy(attendees, (a) => a.email);

				return attendees;
			}
		},

		methods: {
			formatMoney(amount) {
				return accounting.formatMoney(amount);
			},

			copyItemClick(e, index) {
				e.preventDefault();
				scrollUpTo($('#cartItems li:first'));
				this.$store.dispatch('copyCartItem', index);
			},

			removeItemClick(e, index) {
				e.preventDefault();
				this.$store.dispatch('removeFromCart', index);
			},

			moveToWishListClick(e, index) {
				e.preventDefault();
				this.$store.dispatch('moveToWishList', index);
			},

			selectedOfferingText() {
				return this.$parent.selectedOfferingText(this.item);
			},

			discountAmount(discount) {
				return calculationService.calcSingleItemDiscountAmount(this.price, discount);
			}
		}
	};
</script>

<style lang="css" scoped>
	a.wish-list {
		margin-right: 30px;
	}

	h4 {
		margin: 0;
	}
	.price {
		font-size: 1.2em;
		font-weight: bold;
		border-top: 1px solid #ccc;
	}
	.price > span {
		margin-right: 15px;
	}
</style>
