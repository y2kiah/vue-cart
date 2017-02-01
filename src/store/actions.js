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
		context.commit(types.MOVE_TO_WISHLIST, index);
	},

	removeFromWishList(context, index) {
		context.commit(types.REMOVE_FROM_WISHLIST, index);
	},

	setAttendee(context, { itemIndex, attendee }) {
		context.commit(types.SET_ATTENDEE, { itemIndex, attendee });
	},

	updateAttendee(context, { itemIndex, data }) {
		context.commit(types.UPDATE_ATTENDEE, { itemIndex, data });
	},

	setOffering(context, { itemIndex, offeringId }) {
		context.commit(types.SET_OFFERING, { itemIndex, offeringId });
	}
}