<template>
	<div :class="['panel', 'panel-default', { 'panel-success': valid }]">
		<div class="panel-heading">
			<h4 class="panel-title">Course Offering</h4>
		</div>
		<div class="panel-body">
			<div class="pull-right">
				<a href="#" @click.prevent="editOfferingClick" v-if="valid && item.offerings.length > 1">
					Edit <i class="glyphicon glyphicon-chevron-right"></i>
				</a>
			</div>

			<div v-show="valid" class="lead">
				{{ $parent.selectedOfferingText() }}
			</div>

			<div v-show="!valid" class="table-responsive">
				<table class="table table-default">
					<thead>
						<tr>
							<th>Course Date(s)</th>
							<th>Course length</th>
							<th>Location</th>
							<th>Cost ($USD)</th>
							<th>Discount Eligible?</th>
						</tr>
					</thead>
					<tfoot v-if="uniqueDiscountsWithFootnote().length">
						<tr><td colspan="5">{{ offeringsFootnoteText }}</td></tr>
					</tfoot>
					<tbody>
						<tr v-for="offering in item.offerings">
							<td>
								<div class="radio">
									<label>
										<input type="radio" :name="'items['+index+'][offering]'" :id="'offering_' + offering.id" :value="offering.id"
												v-model="selectedOfferingId">
										{{ offering.date }}
									</label>
								</div>
							</td>
							<td>{{ offering.length }}</td>
							<td>{{ offering.location }}</td>
							<td>${{ offering.cost }}</td>
							<td>{{ offeringDiscountText(offering) }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CourseOfferings',
		props: [ 'item', 'index', 'items', 'discounts' ],

		data () {
			return {
			};
		},

		computed: {
			selectedOfferingId: {
				get()    { return this.item.selectedOfferingId; },
				set(val) { this.setOffering(val); }
			},

			valid() {
				return (this.item.selectedOfferingId !== null);
			},

			offeringsFootnoteText() {
				let ud = this.uniqueDiscountsWithFootnote();
				ud = ud.map((d) => this.discountFootnoteIndicator(d.id) + ' ' + d.footnote)
				return ud.join('<br>');
			},

			itemsForCourse() {
				return this.items.filter((i) => (i.id === this.item.id));
			}
		},

		methods: {
			setOffering(val) {
				this.$store.dispatch('setOffering', {
					itemIndex: this.index,
					offeringId: +val
				});
			},

			editOfferingClick(e) {
				this.$store.dispatch('setOffering', {
					itemIndex: this.index,
					offeringId: null
				});
			},

			uniqueDiscountsWithFootnote() {
				// get single array from offering discount arrays and dedupe
				let dis = this.item.offerings.map((o) => o.discounts)
				let ud = [].concat(...dis);
				ud = Array.from(new Set(ud))
					.map((d) => { return this.discounts[d]; })
					.filter((d) => { return d.footnote; });
				return ud;
			},

			discountFootnoteIndicator(discountId) {
				let ud = this.uniqueDiscountsWithFootnote();

				// find the matching discount
				let pos = ud.findIndex((d) => (d.id === discountId));

				// fill a string of '*' based on position
				return '*'.repeat(pos+1);
			},

			offeringDiscountText(offering) {
				return (offering.discounts && offering.discounts.length)
					? 'Yes, '
						+ offering.discounts.map(
							(d) => {
								return this.discounts[d].name + (this.discounts[d].footnote
									? this.discountFootnoteIndicator(this.discounts[d].id)
									: '');
							}).join(', ')
					: 'No';
			}
		}
	};
</script>

<style lang="css" scoped>
	.table > tbody > tr > td {
		vertical-align: middle;
	}
	
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

	.lead {
		margin-bottom: 0;
	}

	input[type="radio"] {
		cursor: pointer;
	}
</style>
