export default class DiscountService {
	
	calcTotalDiscountAmount(itemCost, discounts) {
		if (!(discounts instanceof Array)) {
			discounts = [ discounts ];
		}

		let dis = 0;
		for (let d of discounts) {
			dis += this.calcSingleDiscountAmount(itemCost, d);
		}

		return dis;
	}

	calcSingleDiscountAmount(itemCost, discount) {
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

		let dis = this.calcTotalDiscountAmount(itemCost, discounts);

		return (itemCost - dis);
	}

	_getDiscount(amount, discount) {
		let dis = 0;

		if (discount.hasOwnProperty('percentItem')) {
			dis = amount * Math.abs(discount.percentItem / 100);
		}

		return dis;
	}

}