import * as types from './mutation-types';

export default {
	addToCart(context, course) {
		context.commit(types.ADD_TO_CART, course);
	},

	removeFromCart(context, index) {
		context.commit(types.REMOVE_FROM_CART, index);
	},

	copyCartItem(context, index) {
		context.commit(types.COPY_CART_ITEM, index);
	},

	moveToCart(context, index) {
		context.commit(types.MOVE_TO_CART, index);
	},

	moveToWishList(context, index) {
		// TODO: detect when course already exists in wish list, ask if they want to remove from cart?
		context.commit(types.MOVE_TO_WISHLIST, index);
	},

	setAttendee(context, { itemIndex, attendee }) {
		context.commit(types.SET_ATTENDEE, { itemIndex, attendee });
	},

	setOffering(context, { itemIndex, offeringId }) {
		console.log(itemIndex)
		console.log(offeringId)
		context.commit(types.SET_OFFERING, { itemIndex, offeringId });
	}
}