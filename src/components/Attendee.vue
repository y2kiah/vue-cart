<template>
	<div>
		<div v-show="collapsed">
			<a href="#" @click="editClick" class="pull-right">
				Edit <i class="glyphicon glyphicon-chevron-right"></i>
			</a>
			<div class="lead">{{ attendee.firstname }} {{ attendee.lastname }}, {{ user.email }}</div>
		</div>
		<div v-show="!collapsed">
			<div v-if="validAttendeesNotAdded.length || !emailExists(user.email)">
				<h4>Register an Existing Attendee</h4>
				<div class="row">
					<div class="col-sm-4 col-xs-6" v-if="!emailExists(user.email)">
						<button class="btn btn-default col-xs-12 user-selection" @click="copyUserToForm(user)">
							<span class="text-success">CURRENT USER</span><br>
							{{ user.firstname }} {{ user.lastname }}<br>
							{{ user.email }}
						</button>
					</div>
					<div v-for="attendee in validAttendeesNotAdded" :key="attendee.uniqueId" class="col-sm-4 col-xs-6">
						<button class="btn btn-default col-xs-12 user-selection" @click="copyUserToForm(attendee)">
							<span class="text-info">ATTENDEE</span><br>
							{{ attendee.firstname }} {{ attendee.lastname }}<br>
							{{ attendee.email }}
						</button>
					</div>
				</div>
				<hr>
				&ndash; Or &ndash;
			</div>
			<h4>Create New Attendee</h4>
			<form @submit.prevent="validateForm(formScope)" :data-vv-scope="formScope">
				<div class="row">
					<div :class="['form-group', 'col-md-5', {'has-error': errors.has('attendee.firstname',formScope)}]">
						<label class="control-label" :for="'firstname_'+itemIndex+'_'+index">First Name</label>
						<input type="text" name="attendee.firstname" :id="'firstname_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.firstname" v-validate="attendee.firstname" data-vv-rules="required" data-vv-as="first name">
						
						<span v-show="errors.has('attendee.firstname',formScope)" class="help-block">{{ errors.first('attendee.firstname',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-2', {'has-error': errors.has('attendee.middleinitial',formScope)}]">
						<label class="control-label" :for="'middleinitial_'+itemIndex+'_'+index">Middle Initial</label>
						<input type="text" name="attendee.middleinitial" :id="'middleinitial_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.middleinitial" maxlength="1">
					</div>
					<div :class="['form-group', 'col-md-5', {'has-error': errors.has('attendee.lastname',formScope)}]">
						<label class="control-label" :for="'lastname_'+itemIndex+'_'+index">Last Name</label>
						<input type="text" name="attendee.lastname" :id="'lastname_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.lastname" v-validate="attendee.lastname" data-vv-rules="required" data-vv-as="last name">

						<span v-show="errors.has('attendee.lastname',formScope)" class="help-block">{{ errors.first('attendee.lastname',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('attendee.email',formScope)}]">
						<label class="control-label" :for="'email_'+itemIndex+'_'+index">Email</label>
						<input type="text" name="attendee.email" :id="'email_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.email" v-validate="attendee.email" data-vv-rules="required|email" data-vv-as="email">{{ email }}

						<span v-show="errors.has('attendee.email',formScope)" class="help-block">{{ errors.first('attendee.email',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('attendee.phone',formScope)}]">
						<label class="control-label" :for="'phone_'+itemIndex+'_'+index">Phone</label>
						<input type="text" name="attendee.phone" :id="'phone_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.phone" v-validate="attendee.phone" data-vv-rules="required" data-vv-as="phone number">

						<span v-show="errors.has('attendee.phone',formScope)" class="help-block">{{ errors.first('attendee.phone',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('attendee.dob',formScope)}]">
						<label class="control-label" :for="'dob_'+itemIndex+'_'+index">Date of Birth</label>
						<input type="text" name="attendee.dob" :id="'dob_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.dob" v-validate="attendee.dob" data-vv-rules="required|date_format:MM/DD/YYYY" placeholder="MM/DD/YYYY" data-vv-as="date of birth">

						<span v-show="errors.has('attendee.dob',formScope)" class="help-block">{{ errors.first('attendee.dob',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('attendee.erauid',formScope)}]">
						<label class="control-label" :for="'erauid_'+itemIndex+'_'+index">ERAU ID (optional)</label>
						<input type="text" name="attendee.erauid" :id="'erauid_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.erauid" v-validate="attendee.erauid" data-vv-rules="digits:7" maxlength="7" data-vv-as="ERAU ID">

						<span v-show="errors.has('attendee.erauid',formScope)" class="help-block">{{ errors.first('attendee.erauid',formScope) }}</span>
					</div>
				</div>
				<h4>Organization</h4>
				<div class="row">
					<div :class="['form-group', 'col-md-12', {'has-error': errors.has('attendee.companyname',formScope)}]">
						<label class="control-label" :for="'companyname_'+itemIndex+'_'+index">Company Name (optional)</label>
						<input type="text" name="attendee.companyname" :id="'companyname_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.companyname">
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-12', {'has-error': errors.has('attendee.jobtitle',formScope)}]">
						<label class="control-label" :for="'jobtitle_'+itemIndex+'_'+index">Job Title (optional)</label>
						<input type="text" name="attendee.jobtitle" :id="'jobtitle_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.jobtitle">
					</div>
				</div>
				<h4>Mailing Address</h4>
				<div class="row">
					<div :class="['form-group', 'col-md-12', {'has-error': errors.has('attendee.address',formScope)}]">
						<label class="control-label" :for="'address_'+itemIndex+'_'+index">Street Address</label>
						<input type="text" name="attendee.address" :id="'address_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.address" v-validate="attendee.address" data-vv-rules="required" data-vv-as="street address">

						<span v-show="errors.has('attendee.address',formScope)" class="help-block">{{ errors.first('attendee.address',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-6', {'has-error': errors.has('attendee.city',formScope)}]">
						<label class="control-label" :for="'city_'+itemIndex+'_'+index">City</label>
						<input type="text" name="attendee.city" :id="'city_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.city" v-validate="attendee.city" data-vv-rules="required" data-vv-as="city">

						<span v-show="errors.has('attendee.city',formScope)" class="help-block">{{ errors.first('attendee.city',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-2', {'has-error': errors.has('attendee.state',formScope)}]">
						<label class="control-label" :for="'state_'+itemIndex+'_'+index">State</label>
						<input type="text" name="attendee.state" :id="'state_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.state" v-validate="attendee.state" data-vv-rules="required" data-vv-as="state">

						<span v-show="errors.has('attendee.state',formScope)" class="help-block">{{ errors.first('attendee.state',formScope) }}</span>
					</div>
					<div :class="['form-group', 'col-md-4', {'has-error': errors.has('attendee.zip',formScope)}]">
						<label class="control-label" :for="'zip_'+itemIndex+'_'+index">Zip</label>
						<input type="text" name="attendee.zip" :id="'zip_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.zip" v-validate="attendee.zip" data-vv-rules="required" data-vv-as="zip code">

						<span v-show="errors.has('attendee.zip',formScope)" class="help-block">{{ errors.first('attendee.zip',formScope) }}</span>
					</div>
				</div>
				<div class="row">
					<div :class="['form-group', 'col-md-8', {'has-error': errors.has('attendee.country',formScope)}]">
						<label class="control-label" :for="'country_'+itemIndex+'_'+index">Country</label>
						<input type="text" name="attendee.country" :id="'country_'+itemIndex+'_'+index" class="form-control"
							   v-model="attendee.country" v-validate="attendee.country" data-vv-rules="required" data-vv-as="country">

						<span v-show="errors.has('attendee.country',formScope)" class="help-block">{{ errors.first('attendee.country',formScope) }}</span>
					</div>
				</div>

				<button type="submit" class="btn btn-primary">Done</button>
				<button type="button" class="btn btn-link" @click="cancelClick" v-if="attendeeTempCopy">Cancel</button>
				<button type="button" class="btn btn-danger pull-right"
						v-if="this.attendees.length > 1" @click="removeClick">Remove</button>
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

		props: [ 'attendee', 'index', 'itemIndex', 'user', 'attendees', 'items' ],

		data() {
			return {
				collapsed: false,
				attendeeTempCopy: null
			};
		},

		computed: {
			validAttendees() {
				return this.attendees.filter(a => a.valid);
			},

			validAttendeesNotAdded() {
				// get single array of all attendees and dedupe
				let all = this.items.map((i) => { return i.attendees; });
				let allUnique = [].concat(...all);
				allUnique = _.uniqBy(allUnique, (a) => a.email)
							.filter((a) => a.valid);
				
				return _.differenceBy(allUnique, this.validAttendees, (a) => a.email)
						.filter(a => a.email !== this.user.email);
			},

			formScope() {
				return 'attendee-form-' + this.itemIndex;
			}
		},

		methods: {
			copyUserToForm(userData) {
				_.forOwn(userData, (value, key) => {
					if (_.has(this.attendee, key)) {
						this.attendee[key] = value;
					}
				});

				this.validateForm(this.formScope);
			},

			// temporary fix for bug in vee-validate
			validateAll(scope) {
				let values = this.$validator._resolveValuesFromGetters();
				let test = true;
				let promises = [];
				
				this.errors.clear();

				Object.keys(values).forEach(property => {
					var result = this.$validator.validate(property, values[property], scope);
					if (typeof result.then === 'function') {
						promises.push(result);
						return;
					}

					test = test && result;
				});

				return Promise.all(promises).then(function(vals) {
					var valid = vals.every(function (t) {
						return t;
					}) && test;

					return valid;
				});
			},

			validateForm(scope) {
				//this.$validator.validateAll(scope);
				let v = this.validateAll(scope);

				v.then(a => {
					if (this.errors.any(scope)) {
						let errorFields = _.keys(this.errors.collect());
						let sel = errorFields.map(val => { return '[name="'+val+'"]'; }).join(",");

						$(sel, this.$el).first().focus();
						
						return;
					}

					this.attendee.valid = true;
					this.collapsed = true;
				});
			},

			cancelClick(e) {
				_.forOwn(this.attendeeTempCopy, (value, key) => {
					if (_.has(this.attendee, key)) {
						this.attendee[key] = value;
					}
				});
				
				this.errors.clear();
				this.collapsed = true;
			},

			removeClick(e) {
				bus.$emit('removeAttendee', this.itemIndex, this.index);
			},

			editClick(e) {
				e.preventDefault();
				this.attendeeTempCopy = _.clone(this.attendee);
				this.attendee.valid = false;
				this.collapsed = false;
			},

			emailExists(email) {
				return (this.attendees.findIndex((a) => a.email === email && a.valid) !== -1);
			}
		}
	};
</script>

<style lang="css" scoped>
	button.user-selection {
		text-align: left;
		margin: 5px 0;
	}

	button.btn-danger {
		background-color: #fff;
		color: #c9302c;
	}

	.lead {
		margin: 5px 0;
	}
</style>
