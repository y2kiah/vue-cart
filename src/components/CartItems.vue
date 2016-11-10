<template>
	<div id="cartItems">
		<ul class="list-unstyled">
			<CartItem v-for="(item, index) in items" :key="item.id" :item="item" :index="index"
					  :items="items" :discounts="discounts"></CartItem>
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
		}
	};
</script>

<style lang="css" scoped>
</style>