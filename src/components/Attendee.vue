<template>
	<div>
		<div v-show="collapsed" class="lead">
			<a href="#">{{ attendee.firstName }} {{ attendee.lastName }}</a>
		</div>
		<div v-show="!collapsed">
			<h4>Register an Existing Attendee</h4>
			<div class="row">
				<div class="col-md-4">
					<button class="btn btn-default col-xs-12 user-selection">
						<span class="text-success">CURRENT USER</span><br>
						{{ user.firstName }} {{ user.lastName }}<br>
						{{ user.email }}
					</button>
				</div>
				<div v-for="attendee in attendees" class="col-md-4">
					<div class="panel panel-default">
						<div class="panel-body">
							<span class="text-info">ATTENDEE</span><br>
						</div>
					</div>
				</div>
			</div>
			<hr>
			&ndash; Or &ndash;
			<h4>Create New Attendee</h4>
			<pre>{{ errors }}</pre>
			<div class="row">
				<div class="form-group col-md-5">
					<label :for="'firstname_'+itemIndex+'_'+index">First Name</label>
					<input type="text" name="firstname" :id="'firstname_'+itemIndex+'_'+index" class="form-control"
						   v-model="firstname" v-validate data-rules="required">
				</div>
				<div class="form-group col-md-2">
					<label :for="'middleinitial_'+itemIndex+'_'+index">Middle Initial</label>
					<input type="text" name="middleinitial" :id="'middleinitial_'+itemIndex+'_'+index" class="form-control"
						   v-model="middleinitial" maxlength="1">
				</div>
				<div class="form-group col-md-5">
					<label :for="'lastname_'+itemIndex+'_'+index">Last Name</label>
					<input type="text" name="lastname" :id="'lastname_'+itemIndex+'_'+index" class="form-control"
						   v-model="lastname" v-validate data-rules="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-4">
					<label :for="'email_'+itemIndex+'_'+index">Email</label>
					<input type="text" name="email" :id="'email_'+itemIndex+'_'+index" class="form-control"
						   v-model="email" v-validate data-rules="required|email">
				</div>
				<div class="form-group col-md-4">
					<label :for="'phone_'+itemIndex+'_'+index">Phone</label>
					<input type="text" name="phone" :id="'phone_'+itemIndex+'_'+index" class="form-control"
						   v-model="phone" v-validate data-rules="required|phone">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-4">
					<label :for="'dob_'+itemIndex+'_'+index">Date of Birth</label>
					<input type="text" name="dob" :id="'dob_'+itemIndex+'_'+index" class="form-control"
						   v-model="dob" v-validate data-rules="required|date_format:'MM/DD/YYYY'" placeholder="MM/DD/YYYY">
				</div>
				<div class="form-group col-md-4">
					<label :for="'erauid_'+itemIndex+'_'+index">ERAU ID (optional)</label>
					<input type="text" name="erauid" :id="'erauid_'+itemIndex+'_'+index" class="form-control"
						   v-model="erauid" v-validate data-rules="required|digits:7" maxlength="7">
				</div>
			</div>
			<h4>Organization</h4>
			<div class="row">
				<div class="form-group col-md-12">
					<label :for="'companyname_'+itemIndex+'_'+index">Company Name (optional)</label>
					<input type="text" name="companyname" :id="'companyname_'+itemIndex+'_'+index" class="form-control"
						   v-model="companyname">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-12">
					<label :for="'jobtitle_'+itemIndex+'_'+index">Job Title (optional)</label>
					<input type="text" name="jobtitle" :id="'jobtitle_'+itemIndex+'_'+index" class="form-control"
						   v-model="jobtitle">
				</div>
			</div>
			<h4>Mailing Address</h4>
			<div class="row">
				<div class="form-group col-md-12">
					<label :for="'address_'+itemIndex+'_'+index">Street Address</label>
					<input type="text" name="address" :id="'address_'+itemIndex+'_'+index" class="form-control"
						   v-model="address" v-validate data-rules="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-6">
					<label :for="'city_'+itemIndex+'_'+index">City</label>
					<input type="text" name="city" :id="'city_'+itemIndex+'_'+index" class="form-control"
						   v-model="city" v-validate data-rules="required">
				</div>
				<div class="form-group col-md-2">
					<label :for="'state_'+itemIndex+'_'+index">State</label>
					<input type="text" name="state" :id="'state_'+itemIndex+'_'+index" class="form-control"
						   v-model="state">
				</div>
				<div class="form-group col-md-4">
					<label :for="'zip_'+itemIndex+'_'+index">Zip</label>
					<input type="text" name="zip" :id="'zip_'+itemIndex+'_'+index" class="form-control"
						   v-model="zip" v-validate data-rules="required">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-8">
					<label :for="'country_'+itemIndex+'_'+index">Country</label>
					<input type="text" name="country" :id="'country_'+itemIndex+'_'+index" class="form-control"
						   v-model="country" v-validate data-rules="required">
				</div>
			</div>
		</div>
		<button type="submit" class="btn btn-primary" @click="submit">Done</button>
	</div>
</template>

<script>
	import { Validator } from 'vee-validate';

	Validator.extend('phone', {
		getMessage: field => 'Please enter a valid phone number',
		validate: value => {
			const phoneRE = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
			return phoneRE.test(value);
		}
	});

	export default {
		name: 'Attendee',

		props: [ 'attendee', 'index', 'itemIndex', 'user', 'attendees' ],

		data() {
			return {
				collapsed: false,
				firstname: "",
				middleinitial: "",
				lastname: "",
				email: "",
				phone: "",
				dob: "",
				erauid: "",
				companyname: "",
				jobtitle: "",
				address: "",
				city: "",
				state: "",
				zip: "",
				country: ""
			};
		},

		computed: {},

		methods: {
			submit(e, d) {

				console.log(e)
				console.log(d)
			}
		}
	};
</script>

<style lang="css" scoped>
	button.user-selection {
		text-align: left;
	}
</style>
