<template>
	<div id="purchaseSummary" data-spy="affix" data-offset-top="145" data-offset-bottom="0">
		<div class="well">
			<h3>Purchase Summary</h3>
			<ul class="list-group">
				<li v-for="item in items" class="list-group-item clearfix">
					<div>{{ item.name }}</div>
					<div><small>{{ $parent.selectedOfferingText(item) }}</small></div>
					<div class="item-subtotal" v-if="selectedOffering(item) !== null">
						Item Subtotal: {{ itemSubtotal(item) }}
					</div>
				</li>
			</ul>
			<div v-if="$parent.allItemsValid()">
				<h4>Subtotal:</h4>
				{{ purchaseSubtotal() }}
			</div>
		</div>
		<button type="button" class="btn btn-default col-md-12">SAVE AND CONTINUE SHOPPING</button>
	</div>
</template>

<script>
	export default {
		name: 'PurchaseSummary',

		props: [ 'items', 'discounts' ],

		data () {
			return {
			};
		},

		methods: {
			selectedOffering(item) {
				return this.$parent.selectedOffering(item);
			},

			selectedDiscounts(item) {
				let o = this.selectedOffering(item);
				return o.discounts.map((d) => this.discounts[d]);
			},

			itemSubtotal(item) {
				let subtotal = this.$parent.itemSubtotal(item);
				return accounting.formatMoney(subtotal);
			},

			purchaseSubtotal() {
				let subtotal = this.$parent.purchaseSubtotal();
				return accounting.formatMoney(subtotal);
			}
		}
	};
</script>

<style lang="css" scoped>
	h3 {
		margin: 0;
	}
	
	@media(max-width:767px) {
		#purchaseSummary.affix,
		#purchaseSummary.affix-top,
		#purchaseSummary.affix-bottom {
			position: static;
		}
	}
	@media(min-width:768px) {
		#purchaseSummary.affix,
		#purchaseSummary.affix-top,
		#purchaseSummary.affix-bottom {
			position: static;
		}
	}
	@media(min-width:992px) {
		#purchaseSummary.affix {
			position: fixed;
			top: 30px;
			width: 293.33px;
		}
	}
	@media(min-width:1200px) {
		#purchaseSummary.affix {
			position: fixed;
			top: 30px;
			width: 262.5px;
		}
	}

	button {
		text-align: center;
		white-space: normal;
	}

	.item-subtotal {
		text-align: right;
		vertical-align: bottom;
	}
</style>