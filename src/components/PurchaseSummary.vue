<template>
	<div id="purchaseSummary" data-spy="affix" data-offset-top="145" data-offset-bottom="200">
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

	#purchaseSummary.affix {
		top: 30px;
	}
	#purchaseSummary.affix-top {

	}
	#purchaseSummary.affix-bottom {

	}
</style>