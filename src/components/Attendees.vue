<template>
	<div :class="['panel', 'panel-default', { 'panel-success': allValid }]">
		<div class="panel-body">
			<h4>Attendees ({{ attendees.length }})</h4>

			<div>
				<div>
					Who will be attending &ldquo;{{ item.name }}&rdquo;{{ $parent.selectedOfferingId !== null ? ' - ' + $parent.selectedOfferingText() : '' }}?
				</div>
				<div class="row">
					<div class="col-xs-12">
						<ul class="list-unstyled">
							<li v-for="(attendee, index) in attendees" :key="attendee.uniqueId" class="attendee">
								<Attendee :attendee="attendee" :index="index" :itemIndex="itemIndex" :user="user"
										  :attendees="attendees" :items="items"></Attendee>
							</li>
						</ul>
					</div>
				</div>
			</div>

		</div>
		<div class="panel-footer" v-show="allValid">
			<a href="#" class="" @click="addAttendeeClick">
				<i class="glyphicon glyphicon-user"></i>+ Register another attendee
			</a>
		</div>
	</div>
</template>

<script>
	import Attendee from './Attendee'
	import Note from './Note'

	export default {

		name: 'Attendees',

		props: [ 'item', 'itemIndex', 'user', 'attendees', 'items' ],

		components: { Attendee, Note },

		data () {
			return {
			};
		},

		computed: {
			allValid() {
				return (this.attendees.length > 0
						&& this.attendees.findIndex(a => !a.valid) === -1);
			}
		},

		methods: {
			addAttendeeClick(e) {
				e.preventDefault();
				bus.$emit('addAttendee', this.itemIndex);
			}
		}
	};
</script>

<style lang="css" scoped>
	h4 {
		margin: 0 0 10px 0;
	}

	.panel-success {
		background-color: #f0f8ed;
	}

	.panel-footer {
		background-color: inherit;
		border-color: inherit;
	}

	li.attendee {
		border-top: 1px solid #ccc;
		margin: 5px 0;
	}
</style>
