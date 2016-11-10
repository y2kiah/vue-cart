<template>
	<li>
		<div class="panel panel-default">
			<div class="panel-body">
				<a href="#" class="pull-right" @click="removeItemClick($event, index)">
					<i class="glyphicon glyphicon-remove"></i> Remove from cart
				</a>
				<a href="#" class="pull-right wish-list" @click="moveToWishListClick($event, index)">
					<i class="glyphicon glyphicon glyphicon-heart-empty"></i> Move to wish list
				</a>
				<h4>ITEM {{ index+1 }}</h4>

				<h2>{{item.name}}</h2>

				<CourseOfferings :item="item" :index="index" :items="items" :discounts="discounts" />
				<Attendees :item="item" :user="user" />
			</div>
		</div>
	</li>
</template>

<script>
	import CourseOfferings from './CourseOfferings'
	import Attendees from './Attendees'

	export default {
		name: 'CartItem',

		props: [ 'item', 'index', 'items', 'discounts', 'wishList', 'user' ],

		components: { CourseOfferings, Attendees },

		data () {
			return {
				collapsed: false
			};
		},

		computed: {},

		methods: {
			removeItemClick(e, index) {
				e.preventDefault();
				this.items.splice(index, 1);
			},
			
			moveToWishListClick() {

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
</style>