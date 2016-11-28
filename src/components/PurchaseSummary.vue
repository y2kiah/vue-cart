<template>
	<div id="purchaseSummary" data-spy="affix" data-offset-top="145" data-offset-bottom="0">
		<div class="well">
			<h3>Purchase Summary</h3>
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
</style>