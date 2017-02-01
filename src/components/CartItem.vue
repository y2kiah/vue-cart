<template>
	<li class="cart-item">
		<div :class="[ 'panel', 'panel-default', { valid } ]">
			<i :class="['panel-indicator', 'fa', 'fa-2x', { 'fa-check-circle': valid, 'fa-exclamation-circle': !valid }]"></i>
			<div class="panel-body">
				<div class="pull-right">
					<a href="#" class="wish-list" @click="moveToWishListClick($event)">
						<i class="glyphicon glyphicon glyphicon-heart-empty"></i> Move to wish list
					</a>
					<a href="#" @click="removeItemClick($event)" class="text-danger">
						<i class="glyphicon glyphicon-remove"></i> Delete
					</a>
				</div>
				
				<h4>ITEM {{ index+1 }}</h4>

				<h2><a href="#" @click.prevent>{{ item.name }}</a></h2>

				<CourseOfferings :item="item" :index="index" :items="items" :discounts="discounts"></CourseOfferings>

				<Attendee :item="item" :attendee="item.attendee" :itemIndex="index" :user="user" :items="items" :allAttendees="allAttendees"></Attendee>

				<div class="clearfix">
					<div class="pull-left">
						<a href="#" class="" @click="copyItemClick($event)">
							<i class="glyphicon glyphicon glyphicon-shopping-cart"></i>+ Add Another Attendee
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
	import CalculationService from '../CalculationService';
	import { scrollDownTo } from '../helpers';

	const calculationService = new CalculationService();

	export default {
		name: 'CartItem',

		props: [ 'item', 'index', 'items', 'discounts', 'wishList', 'user' ],

		components: { CourseOfferings, Attendee },

		data() {
			return {
				collapsed: false
			};
		},

		computed: {
			valid() {
				return this.item.selectedOfferingId !== null
						&& this.item.attendee.email !== "";
			},

			// TODO: get rid of this coupling and put methods in a shared service class
			selectedOffering() {
				return this.$parent.$parent.selectedOffering(this.item);
			},

			price() {
				return this.$parent.$parent.itemPrice(this.item);
			},

			selectedDiscounts() {
				return this.$parent.$parent.selectedDiscounts(this.item);
			},

			itemSubtotal() {
				return this.$parent.$parent.itemSubtotal(this.item);
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

			copyItemClick(e) {
				e.preventDefault();
				
				this.$store.dispatch('copyCartItem', this.index)
				.then(() => {
					scrollDownTo($(this.$el).next(), 100);
				});
			},

			removeItemClick(e) {
				e.preventDefault();
				this.$store.dispatch('removeFromCart', this.index);
			},

			moveToWishListClick(e) {
				e.preventDefault();
				// detect when course already exists in wish list, ask if still want to remove from cart
				let id = this.items[this.index].id;
				if (this.wishList.findIndex((i) => i.id === id) !== -1) {
					// offer choice to remove with modal, do this on "yes"
					BootstrapDialog.confirm({
						title: 'Move to Wish List',
						message: '<p>This course is already in your Wish List.</p><p>Do you still want to remove it from your cart?</p>',
						btnOKLabel: 'Yes, remove it',
						btnCancelLabel: 'No',
						callback: (result) => {
							if (result) {
								this.$store.dispatch('removeFromCart', this.index);
							}
						}
					});
				}
				else {
					this.$store.dispatch('moveToWishList', this.index);
				}
			},

			selectedOfferingText() {
				return this.$parent.$parent.selectedOfferingText(this.item);
			},

			discountAmount(discount) {
				return calculationService.calcSingleItemDiscountAmount(this.price, discount);
			}
		}
	};
</script>

<style lang="scss" scoped>
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

	li.cart-item > .panel > .panel-indicator {
		position: absolute;
		top: 30px;
		left: -13px;
		background-color: #fff;
	}

	li.cart-item > .panel {
		border-radius: 0 4px 4px 0;
		border-left: 3px solid #ce4844;
		position: relative;

		& > .panel-indicator {
			color: #ce4844;
		}
	}

	li.cart-item > .panel.valid {
		border-left: 3px solid #3c763d;

		& > .panel-indicator {
			color: #3c763d;
		}
	}

	.panel, .panel-heading, .panel-footer, .panel-body {
		transition: background-color .3s;
	}
</style>
