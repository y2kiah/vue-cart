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
			<div class="panel panel-default">
				<div class="panel-heading coupons">
					<label for="coupon">Coupons</label>
					<div class="input-group">
						<input type="text" name="coupon" id="coupon" class="form-control" v-model="couponCode" placeholder="Enter coupon code">
						<span class="input-group-btn">
							<button type="button" class="btn btn-default">Apply</button>
						</span>
					</div>
				</div>
				<div class="panel-body">
					<div v-if="allOfferingsSelected && this.items.length" style="margin-bottom:5px;">
						<div class="clearfix">
							<h4 class="pull-left subtotal">Subtotal:</h4>
							<span class="pull-right">{{ purchaseSubtotal }}</span>
						</div>
						
						<div class="clearfix">
							<hr>
							<h4 class="pull-left total">Purchase Total:</h4>
							<span class="pull-right total">{{ purchaseTotal }}</span>
						</div>
					</div>

					<p v-if="this.items.length && !readyToPay" class="text-danger">
						<span class="fa fa-warning"></span>
						Please provide all required information
					</p>
					<p v-else-if="!this.items.length" class="text-danger">Your cart is empty</p>
					<hr>

					<button type="button" class="btn btn-primary col-xs-12 pay-online" :disabled="!readyToPay">
						<span class="fa fa-lock"></span> PAY ONLINE
					</button>

					<div class="text-center">&mdash; OR &mdash;</div>
					
					<button type="button" class="btn btn-inverse col-xs-12 pay-offline" :disabled="!readyToPay">
						<span class="fa fa-envelope-o"></span> PAY OFFLINE
					</button>
				</div>
			</div>
		</div>

		<button type="button" class="btn btn-default col-xs-12 save"><strong>SAVE</strong> AND CONTINUE SHOPPING</button>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'PurchaseSummary',

		props: [ 'items', 'discounts' ],

		data () {
			return {
				couponCode: ""
			};
		},

		computed: {
			...mapGetters([ 'allOfferingsSelected', 'readyToPay' ]),

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
	
	hr {
		margin: 10px 0;
		border-color: #ccc;
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

		&.pay-online, &.pay-offline {
			letter-spacing: 0.07em;
		}

		&.save {
			margin-bottom: 15px;
			color: #2e6da4;
			border-color: #2e6da4;
		}

		&.btn-inverse {
			color: #fff;
			background-color: #333;
			border-color: #333;
		}
	}

	.item-subtotal {
		text-align: right;
		vertical-align: bottom;
	}

	.subtotal {
		margin: 0;
	}

	.total {
		font-weight: bold;
		font-size: 18px;
		margin: 0;
		line-height: 1.1;
	}

	.panel-default > .panel-heading.coupons {
		background-color: #fafafa;
	}
</style>