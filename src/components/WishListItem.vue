<template>
	<li class="wish-list-item clearfix">
		<h4 class="pull-left"><a href="#" @click.prevent>{{ item.name }}</a></h4>
		<ul class="list-inline pull-right">
			<li><a href="#" @click.prevent="moveToCartClick"><i class="glyphicon glyphicon-shopping-cart"></i>+ Move to cart</a></li>
			<li><a href="#" @click.prevent="removeWishListItemClick" class="text-danger"><i class="glyphicon glyphicon-remove"></i> Delete</a></li>
		</ul>
		<div class="col-sm-offset-1" style="clear:both;">
			<strong>Sessions available:</strong>
			<ul class="list-unstyled">
				<li v-for="o in item.offerings" class="clearfix">
					<span class="col-xs-8">{{ o.date }}, {{ o.location }}</span>
					<span class="col-xs-4">${{ o.cost }}</span>
				</li>
			</ul>
		</div>
	</li>
</template>

<script>
	import { scrollUpTo, scrollDownTo } from '../helpers';

	export default {

		name: 'WishListItem',

		props: [ 'item', 'index', 'items', 'wishList' ],

		data () {
			return {
			};
		},

		methods: {
			moveToCartClick() {
				// detect when course already exists in cart, ask if still want to remove from cart
				let id = this.wishList[this.index].id;
				if (this.items.findIndex((i) => i.id === id) !== -1) {
					// offer choice to remove with modal, do this on "yes"
					BootstrapDialog.confirm({
						title: 'Move to Cart',
						message: '<p>This course is already in your Cart.</p><p>Do you want to add another?</p>',
						btnOKLabel: 'Yes, add it',
						btnCancelLabel: 'No',
						callback: (result) => {
							if (result) {
								this.$store.dispatch('moveToCart', this.index)
								.then(() => {
									let $newLi = $('li.cart-item:last');
									scrollUpTo($newLi, 100);
									scrollDownTo($newLi, 100);
								});
							}
							else {
								this.$store.dispatch('removeFromWishList', this.index);
							}
						}
					});
				}
				else {
					this.$store.dispatch('moveToCart', this.index)
					.then(() => {
						let $newLi = $('li.cart-item:last');
						scrollUpTo($newLi, 100);
						scrollDownTo($newLi, 100);
					});
				}
			},

			removeWishListItemClick() {
				this.$store.dispatch('removeFromWishList', this.index);
			}
		}
	};
</script>

<style lang="css" scoped>
	h4 {
		margin: 0;
	}
</style>