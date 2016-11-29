<template>
	<div :class="['panel', 'panel-default', { 'panel-success': collapsed && valid }]">
		<div class="panel-body">
			<div class="pull-right">
				<a href="#" @click.prevent="collapsed = false" v-if="collapsed">
					Edit <i class="glyphicon glyphicon-chevron-right"></i>
				</a>
				<a href="#" @click.prevent="collapsed=true" v-if="!collapsed && valid">
					Done
				</a>
			</div>

			<h4>Course Offering</h4>

			<div v-show="collapsed && valid" class="lead">
				{{ $parent.selectedOfferingText() }}
			</div>

			<div v-show="!(collapsed && valid)" class="table-responsive">
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
						<tr v-for="offering in unselectedOfferings">
							<td>
								<div class="radio">
									<label>
										<input type="radio" :name="'items['+index+'][offering]'" :id="'offering_' + offering.id" :value="offering.id"
												@click="offeringClick" v-model="item.selectedOfferingId">
										{{offering.date}}
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
		<div class="panel-footer" v-if="valid && itemsForCourse.length < item.offerings.length">
			<a href="#" class="" @click="cloneItemClick($event, index)">
				<i class="glyphicon glyphicon glyphicon-shopping-cart"></i>+ Add another Date/Location for this course
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CourseOfferings',
		props: [ 'item', 'index', 'items', 'discounts' ],

		data () {
			return {
				collapsed: false
			};
		},

		computed: {
			valid() {
				return (this.item.selectedOfferingId !== null);
			},

			offeringsFootnoteText() {
				let ud = this.uniqueDiscountsWithFootnote();
				ud = ud.map((d) => { return this.discountFootnoteIndicator(d.id) + ' ' + d.footnote; })
				return ud.join('<br>');
			},

			itemsForCourse() {
				return this.items.filter((i) => (i.id === this.item.id));
			},

			/**
			 * Offerings that have not been selected in another item for the same course.
			 */
			unselectedOfferings() {
				let otherOfferingIds = this.items
					.filter((i) => (i.id === this.item.id && i.uniqueId !== this.item.uniqueId && i.selectedOfferingId !== null))
					.map(i => i.selectedOfferingId);
				
				let unselected = this.item.offerings
					.filter((o, idx) => otherOfferingIds.indexOf(idx) === -1 );
				
				return unselected;
			}
		},

		created() {
			if (this.unselectedOfferings.length === 1) {
				this.item.selectedOfferingId = this.unselectedOfferings[0].id;
				this.collapsed = true;
			}
		},

		methods: {
			offeringClick(e) {
				setTimeout(() => this.collapsed = true, 0);
			},

			cloneItemClick(e, index) {
				e.preventDefault();
				bus.$emit('cloneItem', index);
			},

			uniqueDiscountsWithFootnote() {
				// get single array from offering discount arrays and dedupe
				let dis = this.unselectedOfferings.map((o) => { return o.discounts; })
				let ud = [].concat(...dis);
				ud = Array.from(new Set(ud))
					.map((d) => { return this.discounts[d]; })
					.filter((d) => { return d.footnote; });
				return ud;
			},

			discountFootnoteIndicator(discountId) {
				let ud = this.uniqueDiscountsWithFootnote();

				// find the matching discount
				let pos = ud.findIndex((d) => { return d.id === discountId; });

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
	
	h4 {
		margin: 0 0 10px 0;
	}
	
	.panel-success {
		background-color: #f0f8ed;
	}

	.panel-footer {
		background-color: inherit;
		border-color: inherit;
	}

	.lead {
		margin-bottom: 0;
	}
</style>
