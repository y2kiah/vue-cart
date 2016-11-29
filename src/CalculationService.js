export default class CalculationService {

	calcTotalItemDiscountAmount(itemCost, discounts) {
		if (!(discounts instanceof Array)) {
			discounts = [ discounts ];
		}

		let dis = 0;
		for (let d of discounts) {
			dis += this.calcSingleItemDiscountAmount(itemCost, d);
		}

		return dis;
	}

	calcSingleItemDiscountAmount(itemCost, discount) {
		// convert to cents
		let cost = itemCost * 100;
		
		let dis = this._getDiscount(cost, discount);

		// convert back to dollars
		return Math.round(dis) / 100;
	}

	calcItemSubtotal(itemCost, discounts) {
		if (!(discounts instanceof Array)) {
			discounts = [ discount ];
		}

		let dis = this.calcTotalItemDiscountAmount(itemCost, discounts);

		return (itemCost - dis);
	}

	_getDiscount(amount, discount) {
		let dis = 0;

		if (discount.hasOwnProperty('percent')) {
			dis = amount * Math.abs(discount.percent / 100);
		}
		else if (discount.hasOwnProperty('amount')) {
			dis = discount.amount;
		}

		return dis;
	}

}