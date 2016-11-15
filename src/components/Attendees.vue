<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="pull-right">
				<a href="#" @click="editClick" v-if="collapsed">
					Edit <i class="glyphicon glyphicon-chevron-right"></i>
				</a>
				<a href="#" @click.prevent="collapsed=true" v-if="!collapsed && validAttendees.length">
					Done
				</a>
			</div>

			<h4>Attendees ({{ attendees.length }})</h4>

			<div v-show="collapsed">
				{{ summaryText }}
			</div>
			
			<div v-show="!collapsed">
				<div>
					Who will be attending &ldquo;{{ item.name }}&rdquo;{{ $parent.selectedOffering !== null ? ' - ' + $parent.selectedOfferingText() : '' }}?
					<Note>Number of attendees problem with removing</Note>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<ul class="list-unstyled">
							<li v-for="(attendee, index) in attendees">
								<Attendee :attendee="attendee" :index="index" :itemIndex="itemIndex" :user="user" :validAttendees="validAttendees"></Attendee>
							</li>
						</ul>
						<hr>
						<a href="#"><i class="glyphicon glyphicon-user"></i>+ Register another attendee</a></li>
					</div>
					<!--<div class="col-xs-3">
						<div class="input-group">
							<input type="text" :name="'items['+index+'][numAttendees]'" class="form-control"
								   v-model="numAttendees" required="required" pattern="[0-9]*">
							<div class="input-group-btn">
						    	<button type="button" class="btn btn-default" @click="numAttendees -= numAttendees <= 1 ? 0 : 1">-</button>
						    	<button type="button" class="btn btn-default" @click="++numAttendees">+</button>
							</div>
						</div>
					</div>-->
				</div>
			</div>

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
				collapsed: false,
				validAttendees: []
			};
		},

		computed: {
			summaryText() {
				return '';
			}
		},

		created: function() {
			
		},

		methods: {
			editClick(e) {
				e.preventDefault();
				this.collapsed = false;
			}
		}
	};
</script>

<style lang="css" scoped>
	h4 {
		margin: 0 0 10px 0;
	}
</style>
