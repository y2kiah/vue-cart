<template>
	<div>
		<div v-show="collapsed" class="lead">
			<a href="#">{{ attendee.firstName }} {{ attendee.lastName }}</a>
		</div>
		<div v-show="!collapsed">
			<h4>Register an Existing Attendee</h4>
			<div class="row">
				<div class="col-md-4">
					<div class="panel panel-default">
						<div class="panel-body">
							<span class="text-success">CURRENT USER</span><br>
							{{ user.firstName }} {{ user.lastName }}
						</div>
					</div>
				</div>
				<div v-for="n in 4" class="col-md-4">
					<div class="panel panel-default">
						<div class="panel-body">
							<span class="text-info">ATTENDEE</span><br>
						</div>
					</div>
				</div>
			</div>
			<hr>
			<h4>Create New Attendee</h4>
			<div class="row">
				<div class="form-group col-md-5">
					<label :for="'firstname_'+itemIndex+'_'+index">First Name</label>
					<input type="text" name="" :id="'firstname_'+itemIndex+'_'+index" class="form-control"
						   v-model="firstname" required="required">
				</div>
				<div class="form-group col-md-2">
					<label :for="'middleinitial_'+itemIndex+'_'+index">Middle Initial</label>
					<input type="text" name="" :id="'middleinitial_'+itemIndex+'_'+index" class="form-control"
						   v-model="middleinitial" required="required">
				</div>
				<div class="form-group col-md-5">
					<label :for="'lastname_'+itemIndex+'_'+index">Last Name</label>
					<input type="text" name="" :id="'lastname_'+itemIndex+'_'+index" class="form-control"
						   v-model="lastname" required="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-4">
					<label :for="'email_'+itemIndex+'_'+index">Email</label>
					<input type="text" name="" :id="'email_'+itemIndex+'_'+index" class="form-control"
						   v-model="email" required="required">
				</div>
				<div class="form-group col-md-4">
					<label :for="'phone_'+itemIndex+'_'+index">Phone</label>
					<input type="text" name="" :id="'phone_'+itemIndex+'_'+index" class="form-control"
						   v-model="phone" required="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-4">
					<label :for="'dob_'+itemIndex+'_'+index">Date of Birth</label>
					<input type="text" name="" :id="'dob_'+itemIndex+'_'+index" class="form-control"
						   v-model="dob" required="required">
				</div>
				<div class="form-group col-md-4">
					<label :for="'erauid_'+itemIndex+'_'+index">ERAU ID (optional)</label>
					<input type="text" name="" :id="'erauid_'+itemIndex+'_'+index" class="form-control"
						   v-model="erauid">
				</div>
			</div>
			<h4>Organization</h4>
			<div class="row">
				<div class="form-group col-md-12">
					<label :for="'companyname_'+itemIndex+'_'+index">Company Name (optional)</label>
					<input type="text" name="" :id="'companyname_'+itemIndex+'_'+index" class="form-control"
						   v-model="companyname">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-12">
					<label :for="'jobtitle_'+itemIndex+'_'+index">Job Title (optional)</label>
					<input type="text" name="" :id="'jobtitle_'+itemIndex+'_'+index" class="form-control"
						   v-model="jobtitle">
				</div>
			</div>
			<h4>Mailing Address</h4>
			<div class="row">
				<div class="form-group col-md-12">
					<label :for="'address_'+itemIndex+'_'+index">Street Address</label>
					<input type="text" name="" :id="'address_'+itemIndex+'_'+index" class="form-control"
						   v-model="address" required="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-6">
					<label :for="'city_'+itemIndex+'_'+index">City</label>
					<input type="text" name="" :id="'city_'+itemIndex+'_'+index" class="form-control"
						   v-model="city" required="required">
				</div>
				<div class="form-group col-md-2">
					<label :for="'state_'+itemIndex+'_'+index">State</label>
					<input type="text" name="" :id="'state_'+itemIndex+'_'+index" class="form-control"
						   v-model="state" required="required">
				</div>
				<div class="form-group col-md-4">
					<label :for="'zip_'+itemIndex+'_'+index">Zip</label>
					<input type="text" name="" :id="'zip_'+itemIndex+'_'+index" class="form-control"
						   v-model="zip" required="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-8">
					<label :for="'country_'+itemIndex+'_'+index">Country</label>
					<input type="text" name="" :id="'country_'+itemIndex+'_'+index" class="form-control"
						   v-model="country" required="required">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Attendee',

		props: [ 'attendee', 'index', 'itemIndex', 'user' ],

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
