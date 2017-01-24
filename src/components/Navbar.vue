<template>
	<nav class="navbar navbar-default" role="navigation">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">vue-cart</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							Add Courses <span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li v-for="(course, index) in courses" :key="course.id">
								<a href="#" @click.prevent="addCourse(course)">{{ course.name }}</a>
							</li>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="glyphicon glyphicon-heart"></i>
							<span style="">{{ wishList.length }}</span>
						</a>
						<ul class="dropdown-menu">
							<!--<li><a href="#">Action</a></li>
							<li><a href="#">Another action</a></li>
							<li><a href="#">Something else here</a></li>
							<li><a href="#">Separated link</a></li>-->
						</ul>
					</li>

					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="glyphicon glyphicon-shopping-cart"></i>
							<span style="">{{ items.length }}</span>
						</a>
						<ul class="dropdown-menu">
							<!--<li><a href="#">Action</a></li>
							<li><a href="#">Another action</a></li>
							<li><a href="#">Something else here</a></li>
							<li><a href="#">Separated link</a></li>-->
						</ul>
					</li>

					<li><a href="#">Hello, {{ user.firstname || 'Guest' }}</a></li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'Navbar',

		props: [ 'items', 'wishList', 'courses', 'user' ],

		data () {
			return {
				nextUniqueId: 0
			};
		},

		methods: {
			addCourse(course) {
				var newItem = _.clone(course);
				newItem.uniqueId = this.nextUniqueId;
				++this.nextUniqueId;
				this.items.push(newItem);

				bus.$emit('addAttendee', this.items.length - 1);
			}
		}
	};
</script>

<style lang="css" scoped>
</style>
