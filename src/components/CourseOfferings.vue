<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<a href="#" class="pull-right" @click="editClick" v-show="collapsed">
				Edit <i class="glyphicon glyphicon-chevron-right"></i>
			</a>
			<h4>Course Offerings</h4>
			
			<div v-show="collapsed">
				{{ selectedOfferingText }}
			</div>
			
			<div v-show="!collapsed" class="table-responsive">
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
					<tfoot>
						<tr><td colspan="5">{{ offeringsFootnoteText }}</td></tr>
					</tfoot>
					<tbody>
						<tr v-for="offering in item.offerings" :key="offering.id">
							<td>
								<div class="radio">
									<label>
										<input type="radio" :name="'items[' + index + '][offering]'" :id="'offering_' + offering.id" :value="offering.id"
												@click="offeringClick($event, offering.id)">
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
			
			<a href="#" class="pull-right" @click="cloneItemClick($event, index)">
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
				collapsed: false,
				selected: null
			};
		},

		computed: {
			selectedOfferingText() {
				console.log(this.item.offerings)
				console.log(this.selected)
				let o = this.item.offerings.find((o) => { return o.id === this.selected; });
				return (this.selected !== null)
					? o.date + ', ' + o.location
					: '';
			},

			offeringsFootnoteText() {
				let ud = this.uniqueDiscountsWithFootnote();
				ud = ud.map((d) => { return this.discountFootnoteIndicator(d.id) + ' ' + d.footnote; })
				return ud.join('<br>');
			}
		},

		methods: {
			editClick(e) {
				e.preventDefault();
				this.collapsed = false;
			},

			offeringClick(e, id) {
				this.selected = id;
				this.collapsed = true;
			},

			cloneItemClick(e, index) {
				e.preventDefault();
				let copy = _.cloneDeep(this.items[index]);
				this.items.splice(index, 0, copy);
			},

			uniqueDiscountsWithFootnote() {
				// get single array from offering discount arrays and dedupe
				let dis = this.item.offerings.map((o) => { return o.discounts; })
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
</style>