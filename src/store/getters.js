export default {
	/**
	 * Returns true if all cart items are valid, allowing payment to proceed
	 * @param  {Object}
	 * @return {boolean}
	 */
	allOfferingsSelected(state) {
		return (state.items.findIndex((i) => i.selectedOfferingId === null) === -1);
	},

	readyToPay(state) {
		return (state.items.length > 0
				&& state.items.findIndex((i) => i.selectedOfferingId === null || i.attendee.email === "") === -1);
	},
}