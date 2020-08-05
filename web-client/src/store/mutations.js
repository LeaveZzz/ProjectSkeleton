import {
	ADD_ADMIN_NAME
} from 'store/mutation-types'
export default {
	[ADD_ADMIN_NAME](state, payload) {
		state.adminName = payload.adminName;
	}
}
