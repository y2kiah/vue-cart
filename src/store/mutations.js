import * as types from './mutation-types';

let nextItemId = 0;

function makeAttendee() {
	return {
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
		country: ""
	};
}

export default {
	[types.ADD_TO_CART](state, course) {
		let newItem = {
			...course,
			uniqueId: nextItemId++,
			attendee: makeAttendee(),
			selectedOfferingId: null
		};

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

		// pre-select offering when only one is available
		if (copy.offerings.length === 1) {
			copy.selectedOfferingId = copy.offerings[0].id;
		}
		
		state.items.splice(index + 1, 0, copy);
	},

	[types.MOVE_TO_CART](state, index) {
		let i = state.wishList.splice(index, 1);
		let item = i[0];
		item.uniqueId = nextItemId++;
		item.attendee = makeAttendee();
		item.selectedOfferingId = null;

		// pre-select offering when only one is available
		if (item.offerings.length === 1) {
			item.selectedOfferingId = item.offerings[0].id;
		}

		state.items.push(item);
	},

	[types.MOVE_TO_WISHLIST](state, index) {
		let i = state.items.splice(index, 1);
		let item = i[0];
		delete item.uniqueId;
		item.attendee = makeAttendee();
		item.seletedOfferingId = null;

		state.wishList.push(item);
	},

	[types.REMOVE_FROM_WISHLIST](state, index) {
		state.wishList.splice(index, 1);
	},

	[types.SET_ATTENDEE](state, { itemIndex, attendee }) {
		if (attendee === undefined) {
			attendee = makeAttendee();
		}
		
		state.items[itemIndex].attendee = attendee;
	},

	[types.UPDATE_ATTENDEE](state, { itemIndex, data }) {
		let attendee = state.items[itemIndex].attendee;

		_.forOwn(data, (value, key) => {
			if (_.has(attendee, key)) {
				attendee[key] = value;
			}
		});

		if (attendee === state.user) {
			state.userInfoVerified = true;
		}
	},

	[types.SET_OFFERING](state, { itemIndex, offeringId }) {
		state.items[itemIndex].selectedOfferingId = offeringId;
	}
}