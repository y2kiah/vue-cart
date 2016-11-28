<template>
	<div id="cartItems">
		<ul class="list-unstyled">
			<CartItem v-for="(item, index) in items" :key="item.uniqueId" :item="item" :index="index"
					  :items="items" :discounts="discounts" :wishList="wishList" :user="user"></CartItem>
		</ul>
	</div>
</template>

<script>
	import CartItem from './CartItem'

	export default {

		name: 'CartItems',

		components: { CartItem },

		props: [ 'items', 'discounts', 'wishList', 'user' ],

		computed: {},

		data () {
			return {

			};
		},

		methods: {
			removeItem(index) {
				this.$parent.removeItem(index);
			}
		}
	};
</script>

<style lang="css" scoped>
</style>
