<template>
	<div>
		<div v-show="collapsed" class="lead">
			<a href="#">{{ attendee.firstName }} {{ attendee.lastName }}</a>
		</div>
		<div v-show="!collapsed">
			<ul class="list-unstyled">
				<li><a href="#">Register myself</a></li>
				<li><a href="#">Add an existing attendee</a></li>
				<li><a href="#">Enter a new attendee</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Attendee',

		props: [ 'attendee', 'index', 'user' ],

		data() {
			return {
				collapsed: false
			};
		},

		computed: {},

		methods: {
		}
	};
</script>

<style lang="css" scoped>
</style>
