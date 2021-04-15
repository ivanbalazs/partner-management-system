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
    }

    return state;
}

const store = createStore(reducer);
export default store;
