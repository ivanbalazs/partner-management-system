import { createStore } from 'redux';

const initState = {
    partners: null,
    cities: null,
    companyTypes: null,
};

const reducer = function(state = initState, action) {
    switch(action.type) {
        case 'SET_PARTNERS':
            return { ...state, partners: action.list };
        case 'SET_CITIES':
            return { ...state, cities: action.cities };
        case 'SET_COMPANY_TYPES':
            return { ...state, companyTypes: action.companyTypes };
        case 'DELETE_PARTNER':
            const partners = [ ...state.partners ];
            const index = partners.findIndex(i => i.id === action.id);
            partners.splice(index, 1);
            return { ...state, partners };
        default:
//
//    case types.GET_USERS_SUCCESS:
//      return Object.assign({}, state, { users: action.users });
//
//    case types.DELETE_USER_SUCCESS:
//
//      // Use lodash to create a new user array without the user we want to remove
//      const newUsers = _.filter(state.users, user => user.id != action.userId);
//      return Object.assign({}, state, { users: newUsers });
//
//    case types.USER_PROFILE_SUCCESS:
//      return Object.assign({}, state, { userProfile: action.userProfile });

    }

    return state;
}

const store = createStore(reducer);
export default store;
