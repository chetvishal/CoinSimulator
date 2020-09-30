
export const coinReducer = (state, action) => {

    switch(action.type){
        case 'ADD_COIN': 
            return [
                ...state, {
                    coin: action.coin.coin,
                    qty: action.coin.qty,
                    avg_price: action.coin.avg_price,
                    key: action.coin.key
                }
            ]
        case 'REMOVE_COIN':
            let afterDelete = state.filter(coin => coin.key !== action.key)
            return afterDelete;
        case 'ADD_EXISTING_COIN': 
            return state;
        default: 
            return state;
    }
}