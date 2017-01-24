import * as types from './mutation-types';

let nextItemId = 0;
let nextAttendeeId = 0;

function makeAttendee() {
	return {
		valid: false,
		firstname: "",
		middleinitial: "",
		lastname: "",
		email: "",
		phone: "",
		dob: "",
		erauid: "",
		companyname: "",
		jobtitle: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		country: "",
		uniqueId: nextAttendeeId++
	};
}

export default {
	[types.ADD_TO_CART](state, course) {
		let newItem = _.clone(course);
		newItem.uniqueId = nextItemId++;
		
		// pre-select offering when only one is available
		if (newItem.offerings.length === 1) {
			newItem.selectedOfferingId = newItem.offerings[0].id;
		}

		state.items.push(newItem);
	},

	[types.REMOVE_FROM_CART](state, index) {
		state.items.splice(index, 1);
	},

	[types.COPY_CART_ITEM](state, index) {
		let copy = JSON.parse(JSON.stringify(state.items[index]));
		copy.uniqueId = nextItemId++;
		copy.attendee = makeAttendee();
		copy.selectedOfferingId = null;
		
		state.items.unshift(copy);
	},

	[types.MOVE_TO_CART](state, index) {
		let i = state.wishList.splice(index, 1);
		state.items.push(i[0]);
	},

	[types.MOVE_TO_WISHLIST](state, index) {
		let i = state.items.splice(index, 1);
		state.wishList.push(i[0]);
	},

	[types.SET_ATTENDEE](state, { itemIndex, attendee }) {
		if (attendee === undefined) {
			attendee = makeAttendee();
		}
		
		state.items[itemIndex].attendee = attendee;
	},

	[types.SET_OFFERING](state, { itemIndex, offeringId }) {
		state.items[itemIndex].selectedOfferingId = offeringId;
	},
}