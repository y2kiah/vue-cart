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
				<Attendees :item="item" :index="index" :user="user" />
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

		data() {
			return {
				collapsed: false,
				selectedOffering: null
			};
		},

		computed: {
		},

		methods: {
			removeItemClick(e, index) {
				e.preventDefault();
				this.items.splice(index, 1);
			},

			moveToWishListClick(e, index) {
				e.preventDefault();
				let i = this.items.splice(index, 1);
				this.wishList.push(i[0]);
			},

			selectedOfferingText() {
				let o = this.item.offerings.find((o) => { return o.id === this.selectedOffering; });
				return (this.selectedOffering !== null)
					? o.date + ', ' + o.location
					: '';
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
