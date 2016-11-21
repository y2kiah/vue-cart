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
				<Attendees :item="item" :itemIndex="index" :user="user" :attendees="attendees" />

				<div class="pull-right text-right" v-if="selectedOffering !== null">
					{{ attendees.length }} &times; ${{ selectedOffering.cost }}
					<div>
						&ndash;
					</div>
					<div class="subtotal">
						<span>Subtotal:</span>
						${{ subtotal }}
					</div>
				</div>
				<Note><pre>{{ $data }}</pre></Note>
			</div>
		</div>
	</li>
</template>

<script>
	import CourseOfferings from './CourseOfferings'
	import Attendees from './Attendees'
	import Note from './Note'

	export default {
		name: 'CartItem',

		props: [ 'item', 'index', 'items', 'discounts', 'wishList', 'user' ],

		components: { CourseOfferings, Attendees, Note },

		data() {
			return {
				collapsed: false,
				selectedOfferingId: null,
				attendees: []
			};
		},

		computed: {
			selectedOffering() {
				let o = this.item.offerings.find((o) => { return o.id === this.selectedOfferingId; });
				return o || null;
			},

			subtotal() {
				return this.selectedOffering.cost * this.attendees.length * 1;
			}
		},

		methods: {
			addAttendee(attendee) {
				if (attendee === undefined) {
					attendee = { valid:false };
				}
				
				this.attendees.push(attendee);
				//_.merge(this.user, { isUser:true })
			},

			removeItemClick(e, index) {
				e.preventDefault();
				this.items.splice(index, 1);
			},

			moveToWishListClick(e, index) {
				e.preventDefault();
				let i = this.items.splice(index, 1);
				this.wishList.push(i[0]);
			},

			addAttendeeClick(e, index) {
				this.addAttendee();
			},

			selectedOfferingText() {
				let o = this.selectedOffering;
				return (o !== null)
					? o.date + ', ' + o.location
					: '';
			}
		},

		created: function() {
			this.$on('addAttendee', (attendee) => addAttendee(attendee));

			this.addAttendee();
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
	.subtotal {
		font-size: 1.2em;
		font-weight: bold;
		border-top: 1px solid #ccc;
	}
	.subtotal > span {
		margin-right: 15px;
	}
</style>
