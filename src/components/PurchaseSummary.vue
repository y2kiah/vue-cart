<template>
	<div id="purchaseSummary" data-spy="affix" data-offset-top="145" data-offset-bottom="0">
		<div class="well">
			<h3>Purchase Summary</h3>
			<ul class="list-group">
				<li v-for="item in items" class="list-group-item clearfix">
					<div>{{ item.name }}</div>
					<div><small>{{ $parent.selectedOfferingText(item) }}</small></div>
					<div class="item-subtotal" v-if="selectedOffering(item) !== null">
						<span class="pull-left"><strong>Item Subtotal:</strong></span>
						<span class="pull-right">{{ itemSubtotal(item) }}</span>
					</div>
				</li>
			</ul>
			<div v-if="$parent.allItemsValid()" class="panel panel-default">
				<div class="panel-body">
					<div class="clearfix">
						<h4 class="pull-left">Subtotal:</h4>
						<span class="pull-right">{{ purchaseSubtotal }}</span>
					</div>

					<div class="form-group">
						<label for="coupon">Coupon Code</label>
						<input type="text" name="coupon" id="coupon" class="form-control" v-model="couponCode" placeholder="Enter code">
					</div>

					<div class="clearfix">
						<h4 class="pull-left total">Purchase Total:</h4>
						<span class="pull-right">{{ purchaseTotal }}</span>
					</div>
				</div>
			</div>
		</div>
		<button type="button" class="btn btn-default col-md-12 save">SAVE AND CONTINUE SHOPPING</button>
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

		computed: {
			purchaseSubtotal() {
				let subtotal = this.$parent.purchaseSubtotal();
				return accounting.formatMoney(subtotal);
			},

			purchaseTotal() {
				let total = this.$parent.purchaseSubtotal();
				return accounting.formatMoney(total);
			}
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	h3, h4 {
		margin: 0 0 10px 0;
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
			width: 360px;
		}
	}

	button {
		text-align: center;
		white-space: normal;

		&.save {
			margin-bottom: 15px;
		}
	}

	.item-subtotal {
		text-align: right;
		vertical-align: bottom;
	}

	.total {
		font-weight: bold;
	}
</style>