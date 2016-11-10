<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<a href="#" class="pull-right" @click="editClick" v-show="collapsed">
				Edit <i class="glyphicon glyphicon-chevron-right"></i>
			</a>
			<h4>Attendees</h4>
			
			<div v-show="collapsed">
				{{ summaryText }}
			</div>
			
			<div v-show="!collapsed">

				<input type="number" name="items[numAttendees]" class="form-control" v-model="numAttendees" min="1" step="1" required="required">
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'Attendees',

		props: [ 'item', 'user' ],

		data () {
			return {
				collapsed: true,
				numAttendees: 1
			};
		},

		computed: {
			summaryText() {
				return '';
			}
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
</style>