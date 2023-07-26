import initialState from '../initialState';

export default function searchDataReducer(state = initialState.searchData, action) {
    switch(action.type){
        case 'SET_SEARCH_DATA':
            state = action.payload;
            break;

        case 'UNSET_SEARCH_DATA':
            state = initialState.searchData;
        default:
            break;
    }

    return state;
}