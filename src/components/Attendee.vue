<template>
	<div :class="['panel', 'panel-default', { 'panel-success': collapsed }]">
		<div class="panel-heading">
			<h4 class="panel-title" v-if="collapsed">Attendee</h4>
			<h4 class="panel-title" v-else-if="enteringNew">Add a New Attendee</h4>
			<h4 class="panel-title" v-else-if="editing">Edit Attendee</h4>
			<h4 class="panel-title" v-else="!enteringNew && !editing">Select an Attendee</h4>
		</div>
		<div class="panel-body">
			<div>
				<div v-if="!collapsed && !enteringNew && !editing">
					<strong>Who will be attending &ldquo;{{ item.name }}&rdquo;{{ $parent.selectedOfferingId !== null ? ' - ' + $parent.selectedOfferingText() : '' }}?</strong>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<div v-show="collapsed">
							<a href="#" @click.prevent="editClick" class="pull-right">
								Edit <i class="glyphicon glyphicon-chevron-right"></i>
							</a>
							<div class="lead">{{ attendee.firstname }} {{ attendee.lastname }}, <small>{{ attendee.email }}<small></div>
						</div>
						<div v-show="!collapsed">
							<div v-if="!enteringNew && !editing">
								
								<div class="row">
									<div class="col-lg-4 col-md-6" v-if="!attendeeAlreadyExistsForCourse(user.email)">
										<button class="btn btn-default col-xs-12 user-selection" type="button"
												@click="setAttendeeClick(user)">
											<span class="text-success"><strong>REGISTER MYSELF</strong></span><br>
											{{ user.firstname }} {{ user.lastname }}<br>
											{{ user.email }}
										</button>
									</div>
									<div class="col-lg-4 col-md-6">
										<button class="btn btn-default col-xs-12 user-selection new-attendee" type="button"
												@click="enterNewAttendeeClick">
											<span class="text-muted"><strong>ADD A NEW ATTENDEE</strong></span><br>
											<span class="lead text-muted glyphicon glyphicon-plus-sign"></span>
										</button>
									</div>
									<div v-for="att in attendeeChoices" :key="att.email" class="col-lg-4 col-md-6">
										<button class="btn btn-default col-xs-12 user-selection exiting-attendee" type="button"
												@click="setAttendeeClick(att)">
											<span class="text-info"><strong>REGISTER ATTENDEE</strong></span><br>
											{{ att.firstname }} {{ att.lastname }}<br>
											{{ att.email }}
										</button>
									</div>
								</div>
							</div>
							<div v-show="enteringNew || editing">
								<form @submit.prevent="validateForm(formScope)" :data-vv-scope="formScope">
									<div class="row">
										<div :class="['form-group', 'col-md-5', {'has-error': errors.has('form.firstname',formScope)}]">
											<label class="control-label" :for="'firstname_'+itemIndex">First Name</label>
											<input type="text" name="form.firstname" :id="'firstname_'+itemIndex" class="form-control"
												   v-model="form.firstname" v-validate="form.firstname" data-vv-rules="required" data-vv-as="first name">
											
											<span v-show="errors.has('form.firstname',formScope)" class="help-block">{{ errors.first('form.firstname',formScope) }}</span>
										</div>
										<div :class="['form-group', 'col-md-2', {'has-error': errors.has('form.middleinitial',formScope)}]">
											<label class="control-label" :for="'middleinitial_'+itemIndex">Middle Initial</label>
											<input type="text" name="form.middleinitial" :id="'middleinitial_'+itemIndex" class="form-control"
												   v-model="form.middleinitial" maxlength="1">
										</div>
										<div :class="['form-group', 'col-md-5', {'has-error': errors.has('form.lastname',formScope)}]">
											<label class="control-label" :for="'lastname_'+itemIndex">Last Name</label>
											<input type="text" name="form.lastname" :id="'lastname_'+itemIndex" class="form-control"
												   v-model="form.lastname" v-validate="form.lastname" data-vv-rules="required" data-vv-as="last name">

											<span v-show="errors.has('form.lastname',formScope)" class="help-block">{{ errors.first('form.lastname',formScope) }}</span>
										</div>
									</div>
									<div class="row">
										<div :class="['form-group', 'col-md-4', {'has-error': errors.has('form.email',formScope)}]">
											<label class="control-label" :for="'email_'+itemIndex">Email</label>
											<input type="text" name="form.email" :id="'email_'+itemIndex" class="form-control"
												   v-model="form.email" v-validate="form.email" data-vv-rules="required|email" data-vv-as="email">

											<span v-show="errors.has('form.email',formScope)" class="help-block">{{ errors.first('form.email',formScope) }}</span>
										</div>
										<div :class="['form-group', 'col-md-4', {'has-error': errors.has('form.phone',formScope)}]">
											<label class="control-label" :for="'phone_'+itemIndex">Phone</label>
											<input type="text" name="form.phone" :id="'phone_'+itemIndex" class="form-control"
												   v-model="form.phone" v-validate="form.phone" data-vv-rules="required" data-vv-as="phone number">

											<span v-show="errors.has('form.phone',formScope)" class="help-block">{{ errors.first('form.phone',formScope) }}</span>
										</div>
									</div>
									<div class="row">
										<div :class="['form-group', 'col-md-4', {'has-error': errors.has('form.dob',formScope)}]">
											<label class="control-label" :for="'dob_'+itemIndex">Date of Birth</label>
											<input type="text" name="form.dob" :id="'dob_'+itemIndex" class="form-control"
												   v-model="form.dob" v-validate="form.dob" data-vv-rules="required|date_format:MM/DD/YYYY" placeholder="MM/DD/YYYY" data-vv-as="date of birth">

											<span v-show="errors.has('form.dob',formScope)" class="help-block">{{ errors.first('form.dob',formScope) }}</span>
										</div>
										<div :class="['form-group', 'col-md-4', {'has-error': errors.has('form.erauid',formScope)}]">
											<label class="control-label" :for="'erauid_'+itemIndex">ERAU ID (optional)</label>
											<input type="text" name="form.erauid" :id="'erauid_'+itemIndex" class="form-control"
												   v-model="form.erauid" v-validate="form.erauid" data-vv-rules="digits:7" maxlength="7" data-vv-as="ERAU ID">

											<span v-show="errors.has('form.erauid',formScope)" class="help-block">{{ errors.first('form.erauid',formScope) }}</span>
										</div>
									</div>
									<h4>Organization</h4>
									<div class="row">
										<div :class="['form-group', 'col-md-12', {'has-error': errors.has('form.companyname',formScope)}]">
											<label class="control-label" :for="'companyname_'+itemIndex">Company Name (optional)</label>
											<input type="text" name="form.companyname" :id="'companyname_'+itemIndex" class="form-control"
												   v-model="form.companyname">
										</div>
									</div>
									<div class="row">
										<div :class="['form-group', 'col-md-12', {'has-error': errors.has('form.jobtitle',formScope)}]">
											<label class="control-label" :for="'jobtitle_'+itemIndex">Job Title (optional)</label>
											<input type="text" name="form.jobtitle" :id="'jobtitle_'+itemIndex" class="form-control"
												   v-model="form.jobtitle">
										</div>
									</div>
									<h4>Mailing Address</h4>
									<div class="row">
										<div :class="['form-group', 'col-md-12', {'has-error': errors.has('form.address',formScope)}]">
											<label class="control-label" :for="'address_'+itemIndex">Street Address</label>
											<input type="text" name="form.address" :id="'address_'+itemIndex" class="form-control"
												   v-model="form.address" v-validate="form.address" data-vv-rules="required" data-vv-as="street address">

											<span v-show="errors.has('form.address',formScope)" class="help-block">{{ errors.first('form.address',formScope) }}</span>
										</div>
									</div>
									<div class="row">
										<div :class="['form-group', 'col-md-6', {'has-error': errors.has('form.city',formScope)}]">
											<label class="control-label" :for="'city_'+itemIndex">City</label>
											<input type="text" name="form.city" :id="'city_'+itemIndex" class="form-control"
												   v-model="form.city" v-validate="form.city" data-vv-rules="required" data-vv-as="city">

											<span v-show="errors.has('form.city',formScope)" class="help-block">{{ errors.first('form.city',formScope) }}</span>
										</div>
										<div :class="['form-group', 'col-md-2', {'has-error': errors.has('form.state',formScope)}]">
											<label class="control-label" :for="'state_'+itemIndex">State</label>
											<input type="text" name="form.state" :id="'state_'+itemIndex" class="form-control"
												   v-model="form.state" v-validate="form.state" data-vv-rules="required" data-vv-as="state">

											<span v-show="errors.has('form.state',formScope)" class="help-block">{{ errors.first('form.state',formScope) }}</span>
										</div>
										<div :class="['form-group', 'col-md-4', {'has-error': errors.has('form.zip',formScope)}]">
											<label class="control-label" :for="'zip_'+itemIndex">Zip</label>
											<input type="text" name="form.zip" :id="'zip_'+itemIndex" class="form-control"
												   v-model="form.zip" v-validate="form.zip" data-vv-rules="required" data-vv-as="zip code">

											<span v-show="errors.has('form.zip',formScope)" class="help-block">{{ errors.first('form.zip',formScope) }}</span>
										</div>
									</div>
									<div class="row">
										<div :class="['form-group', 'col-md-8', {'has-error': errors.has('form.country',formScope)}]">
											<label class="control-label" :for="'country_'+itemIndex">Country</label>
											<input type="text" name="form.country" :id="'country_'+itemIndex" class="form-control"
												   v-model="form.country" v-validate="form.country" data-vv-rules="required" data-vv-as="country">

											<span v-show="errors.has('form.country',formScope)" class="help-block">{{ errors.first('form.country',formScope) }}</span>
										</div>
									</div>

									<button type="submit" class="btn btn-primary">Save Changes</button>
									<button type="button" class="btn btn-default" @click="cancelClick" v-if="editing">Cancel</button>
									<button type="button" class="btn btn-danger pull-right"
											@click="resetAttendeeClick">Reset</button>
								</form>
							</div>
						</div>

					</div>
				</div>
			</div>

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

		props: [ 'attendee', 'item', 'itemIndex', 'user', 'items', 'allAttendees' ],

		data() {
			return {
				form: {
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
				},
				enteringNew: false,
				editing: false,
				collapsed: false
			};
		},

		computed: {
			attendeeChoices() {
				let attendees = this.allAttendees.filter((a) => a !== this.user);

				attendees = attendees.sort((a,b) => {
					if (a.lastName < b.lastName) { return -1; }
					else if (a.lastName > b.lastName) { return 1; }
					return 0;
				});

				return attendees;
			},

			formScope() {
				return 'attendee-form-' + this.itemIndex;
			}
		},

		methods: {
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

						this.collapsed = false;
						this.editing = (!this.editing && !this.enteringNew ? true : this.editing);
						this.enteringNew = (!this.editing && !this.enteringNew ? false : this.enteringNew);

						$(sel, this.$el).first().focus();
					}
					else {
						// scroll up to top of containing li
						if (this.editing || this.enteringNew) {
							var top = $(this.$el).closest('li').offset().top;

							if ($(document).scrollTop() > top) {
								$('html, body').animate({
									scrollTop: top
    							}, 300);
    						}
						}

						this.$store.dispatch('updateAttendee', {
							itemIndex: this.itemIndex,
							data: this.form
						})
						.then(() => {
							this.collapsed = true;
							this.editing = false;
							this.enteringNew = false;
						});
					}
				});
			},

			setAttendeeClick(attendee) {
				this.$store.dispatch('setAttendee', {
					itemIndex: this.itemIndex,
					attendee: attendee
				})
				.then(() => {
					this.copyAttendeeToForm(attendee);

					this.collapsed = true;
					this.editing = false;
					this.enteringNew = false;
				});
			},

			cancelClick() {
				this.copyAttendeeToForm(this.attendee);

				this.errors.clear();
				this.collapsed = true;
				this.editing = false;
				this.enteringNew = false;
			},

			resetAttendeeClick() {
				this.$store.dispatch('setAttendee', {
					itemIndex: this.itemIndex
				})
				.then(() => {
					this.copyAttendeeToForm(this.attendee);

					this.errors.clear();
					this.collapsed = false;
					this.editing = false;
					this.enteringNew = false;
				});
			},

			editClick() {
				this.copyAttendeeToForm(this.attendee);

				this.errors.clear();
				this.collapsed = false;
				this.editing = true;
				this.enteringNew = false;
			},

			enterNewAttendeeClick() {
				this.copyAttendeeToForm(this.attendee);

				this.errors.clear();
				this.collapsed = false;
				this.editing = false;
				this.enteringNew = true;
			},

			attendeeAlreadyExistsForCourse(attendee) {
				return (this.items.findIndex((item) => { item !== this.item && item.attendee === attendee }) !== -1);
			},

			copyAttendeeToForm(attendee) {
				_.forOwn(attendee, (value, key) => {
					if (_.has(this.form, key)) {
						this.form[key] = value;
					}
				});
			}
		}
	};
</script>

<style lang="css" scoped>
	.panel-title {
		font-size: 18px;
	}

	.panel-default > .panel-heading {
		background-color: #fafafa;
	}

	.panel-success, .panel-success > .panel-heading {
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

	button.user-selection {
		text-align: left;
		margin: 5px 0;
		height: 74px;
		overflow: hidden;
		white-space: nowrap;
	}
	button.new-attendee {
		text-align: center;
	}

	button.btn-danger {
		background-color: #fff;
		color: #c9302c;
	}

	.lead {
		margin: 5px 0;
	}
</style>
