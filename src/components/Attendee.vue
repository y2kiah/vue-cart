<template>
	<div>
		<div v-show="collapsed" class="lead">
			<a href="#">{{ attendee.firstname }} {{ attendee.lastname }},
				<small>{{ user.email }} <i class="glyphicon glyphicon-chevron-right"></i></small>
			</a>
		</div>
		<div v-show="!collapsed">
			<h4>Register an Existing Attendee</h4>
			<div class="row">
				<div class="col-sm-4 col-xs-6">
					<button class="btn btn-default col-xs-12 user-selection" @click="copyUserToForm(user)">
						<span class="text-success">CURRENT USER</span><br>
						{{ user.firstname }} {{ user.lastname }}<br>
						{{ user.email }}
					</button>
				</div>
				<div v-for="attendee in validAttendees" :key="attendee.uniqueId" class="col-sm-4 col-xs-6">
					<button class="btn btn-default col-xs-12 user-selection" @click="copyUserToForm(attendee)">
						<span class="text-info">ATTENDEE</span><br>
						{{ attendee.firstname }} {{ attendee.lastname }}<br>
						{{ attendee.email }}
					</button>
				</div>
			</div>
			<hr>
			&ndash; Or &ndash;
			<h4>Create New Attendee</h4>
			<form @submit.prevent="validateForm(formScope)" :data-scope="formScope">
				<div class="row">
					<div :class="['form-group', 'col-md-5', {'has-error': errors.has('firstname',formScope)}]">
						<label class="control-label" :for="'firstname_'+itemIndex+'_'+index">First Name</label>
						<input type="text" name="firstname" :id="'firstname_'+itemIndex+'_'+index" class="form-control"
							   v-model="firstname" v-validate data-rules="required" data-as="first name">

						<span v-show="errors.has('firstname',formScope)" class="help-block">{{ errors.first('firstname',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-2', {'has-error': errors.has('middleinitial',formScope)}]">
						<label class="control-label" :for="'middleinitial_'+itemIndex+'_'+index">Middle Initial</label>
						<input type="text" name="middleinitial" :id="'middleinitial_'+itemIndex+'_'+index" class="form-control"
							   v-model="middleinitial" maxlength="1" data-as="middle initial">

						<span v-show="errors.has('middleinitial',formScope)" class="help-block">{{ errors.first('middleinitial',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-5', {'has-error': errors.has('lastname',formScope)}]">
						<label class="control-label" :for="'lastname_'+itemIndex+'_'+index">Last Name</label>
						<input type="text" name="lastname" :id="'lastname_'+itemIndex+'_'+index" class="form-control"
							   v-model="lastname" v-validate data-rules="required" data-as="last name">

						<span v-show="errors.has('lastname',formScope)" class="help-block">{{ errors.first('lastname',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('email',formScope)}]">
						<label class="control-label" :for="'email_'+itemIndex+'_'+index">Email</label>
						<input type="text" name="email" :id="'email_'+itemIndex+'_'+index" class="form-control"
							   v-model.lazy="email" v-validate data-rules="required|email">{{ email }}

						<span v-show="errors.has('email',formScope)" class="help-block">{{ errors.first('email',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('phone',formScope)}]">
						<label class="control-label" :for="'phone_'+itemIndex+'_'+index">Phone</label>
						<input type="text" name="phone" :id="'phone_'+itemIndex+'_'+index" class="form-control"
							   v-model="phone" v-validate data-rules="required" data-as="phone number">

						<span v-show="errors.has('phone',formScope)" class="help-block">{{ errors.first('phone',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('dob',formScope)}]">
						<label class="control-label" :for="'dob_'+itemIndex+'_'+index">Date of Birth</label>
						<input type="text" name="dob" :id="'dob_'+itemIndex+'_'+index" class="form-control"
							   v-model="dob" v-validate data-rules="required|date_format:MM/DD/YYYY" placeholder="MM/DD/YYYY" data-as="date of birth">

						<span v-show="errors.has('dob',formScope)" class="help-block">{{ errors.first('dob',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('erauid',formScope)}]">
						<label class="control-label" :for="'erauid_'+itemIndex+'_'+index">ERAU ID (optional)</label>
						<input type="text" name="erauid" :id="'erauid_'+itemIndex+'_'+index" class="form-control"
							   v-model="erauid" v-validate data-rules="required|digits:7" maxlength="7" data-as="ERAU ID">

						<span v-show="errors.has('erauid',formScope)" class="help-block">{{ errors.first('erauid',formScope) }}</span>
					</div>
				</div>
				<h4>Organization</h4>
				<div class="row">
					<div :class="['form-group', 'col-md-12', {'has-error': errors.has('companyname',formScope)}]">
						<label class="control-label" :for="'companyname_'+itemIndex+'_'+index">Company Name (optional)</label>
						<input type="text" name="companyname" :id="'companyname_'+itemIndex+'_'+index" class="form-control"
							   v-model="companyname">

						<span v-show="errors.has('companyname',formScope)" class="help-block">{{ errors.first('companyname',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-12', {'has-error': errors.has('jobtitle',formScope)}]">
						<label class="control-label" :for="'jobtitle_'+itemIndex+'_'+index">Job Title (optional)</label>
						<input type="text" name="jobtitle" :id="'jobtitle_'+itemIndex+'_'+index" class="form-control"
							   v-model="jobtitle">

						<span v-show="errors.has('jobtitle',formScope)" class="help-block">{{ errors.first('jobtitle',formScope) }}</span>
					</div>
				</div>
				<h4>Mailing Address</h4>
				<div class="row">
					<div :class="['form-group', 'col-md-12', {'has-error': errors.has('address',formScope)}]">
						<label class="control-label" :for="'address_'+itemIndex+'_'+index">Street Address</label>
						<input type="text" name="address" :id="'address_'+itemIndex+'_'+index" class="form-control"
							   v-model="address" v-validate data-rules="required" data-as="street address">

						<span v-show="errors.has('address',formScope)" class="help-block">{{ errors.first('address',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-6', {'has-error': errors.has('city',formScope)}]">
						<label class="control-label" :for="'city_'+itemIndex+'_'+index">City</label>
						<input type="text" name="city" :id="'city_'+itemIndex+'_'+index" class="form-control"
							   v-model="city" v-validate data-rules="required">

						<span v-show="errors.has('city',formScope)" class="help-block">{{ errors.first('city',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-2', {'has-error': errors.has('state',formScope)}]">
						<label class="control-label" :for="'state_'+itemIndex+'_'+index">State</label>
						<input type="text" name="state" :id="'state_'+itemIndex+'_'+index" class="form-control"
							   v-model="state">

						<span v-show="errors.has('state',formScope)" class="help-block">{{ errors.first('state',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('zip',formScope)}]">
						<label class="control-label" :for="'zip_'+itemIndex+'_'+index">Zip</label>
						<input type="text" name="zip" :id="'zip_'+itemIndex+'_'+index" class="form-control"
							   v-model="zip" v-validate data-rules="required" data-as="zip code">

						<span v-show="errors.has('zip',formScope)" class="help-block">{{ errors.first('zip',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-8', {'has-error': errors.has('country',formScope)}]">
						<label class="control-label" :for="'country_'+itemIndex+'_'+index">Country</label>
						<input type="text" name="country" :id="'country_'+itemIndex+'_'+index" class="form-control"
							   v-model="country" v-validate data-rules="required">

						<span v-show="errors.has('country',formScope)" class="help-block">{{ errors.first('country',formScope) }}</span>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">Done</button>
			</form>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
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

		computed: {
			validAttendees() {
				return this.attendees.filter(a => a.valid);
			},

			validAttendeesNotAdded() {
				return _.difference(validAttendees(), )
			},

			formScope() {
				return 'attendee-form-' + this.itemIndex;
			}
		},

		methods: {
			copyUserToForm(userData) {
				_.forOwn(userData, (value, key) => {
					if (_.has(this, key)) {
						this[key] = value;
					}
				});

				// TODO:
				// only way I could seem to find to get validation to recognize my state changes automatically
				// find a better way, this is aweful, the time delay might not work for all users
				setTimeout(() => {
					this.validateForm(this.formScope);
				}, 10);
			},

			validateForm(scope) {
				this.$validator.validateAll(scope);
				
				if (this.errors.any(scope)) {
					let errorFields = _.keys(this.errors.collect());
					let sel = errorFields.map(val => { return '[name="'+val+'"]'; }).join(",");

					$(sel, this.$el).first().focus();
					
					return;
				}

				let clonedAttendee = _.clone(this.$data);
				delete clonedAttendee.collapsed;
				delete clonedAttendee.errors;
				clonedAttendee.valid = true;

				Vue.set(this.attendees, this.index, clonedAttendee);
				this.collapsed = true;
			}
		}
	};
</script>

<style lang="css" scoped>
	button.user-selection {
		text-align: left;
		margin: 5px 0;
	}
</style>
