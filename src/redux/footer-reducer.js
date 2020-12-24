/* Place to CONSTANTS */

let initialState = {
    contactInfo: {
        mts: '+38-050-000-00-00',
        lugacom: '072-00-00-000',
        olx: 'https://olx.ua',
        email: 'something@gmail.com',
        graphic: 'с 8:00 до 17:00'
    },
    socialInfo:{}
};

const footerReducer = (state = initialState, action) => {
    switch (action.type){
    /* place to switch block */
        default:
            return state;
    }
}

/* Place to creators
export const updateNewMessageBodyCreator = (body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body})
    */

export default footerReducer;