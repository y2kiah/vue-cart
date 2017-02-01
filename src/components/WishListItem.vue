<template>
	<li class="wish-list-item clearfix">
		<h4 class="pull-left"><a href="#" @click.prevent>{{ item.name }}</a></h4>
		<ul class="list-inline pull-right">
			<li><a href="#" @click.prevent="moveToCart"><i class="glyphicon glyphicon-shopping-cart"></i>+ Move to cart</a></li>
			<li><a href="#" @click.prevent="moveToCart" class="text-danger"><i class="glyphicon glyphicon-remove"></i> Delete</a></li>
		</ul>
	</li>
</template>

<script>
	export default {

		name: 'WishListItem',

		props: [ 'item', 'index' ],

		data () {
			return {

			};
		}
	};
</script>

<style lang="css" scoped>
	h4 {
		margin: 0;
	}
</style>