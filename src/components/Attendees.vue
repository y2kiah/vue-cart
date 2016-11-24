<template>
	<div :class="['panel', 'panel-default', { 'panel-success': collapsed && valid }]">
		<div class="panel-body">
			<h4>Attendees ({{ attendees.length }})</h4>

			<div>
				<div>
					Who will be attending &ldquo;{{ item.name }}&rdquo;{{ $parent.selectedOfferingId !== null ? ' - ' + $parent.selectedOfferingText() : '' }}?
				</div>
				<div class="row">
					<div class="col-xs-12">
						<ul class="list-unstyled">
							<li v-for="(attendee, index) in attendees">
								<Attendee :attendee="attendee" :index="index" :itemIndex="itemIndex" :user="user" :attendees="attendees"></Attendee>
							</li>
						</ul>
					</div>
				</div>
			</div>

		</div>
		<div class="panel-footer" v-show="valid">
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

		props: [ 'item', 'itemIndex', 'user', 'attendees' ],

		components: { Attendee, Note },

		data () {
			return {
			};
		},

		computed: {
			collapsed() {
				console.log(this.$children)
				return true;//this.children.findIndex() .$data.collapsed
			},

			valid() {
				return (this.attendees.length > 0
						&& this.attendees.findIndex(a => !a.valid) === -1);
			}
		},

		methods: {
			addAttendeeClick(e) {
				e.preventDefault();
				this.$parent.addAttendee();
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
</style>
