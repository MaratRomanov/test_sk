const initialState = {
    name: '',
    phone: '',
    email: '',
    profile: '',
    city: '',
    organisationName: '',
    recipient: '',
    howDidKnow: '',
    submit: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NAME_INPUT":
            return {
                ...state,
                name: action.payload
            }
        case "PHONE_INPUT":
            return {
                ...state,
                phone: action.payload
            }
        case "EMAIL_INPUT":
            return {
                ...state,
                email: action.payload
            }
        case "PROFILE_INPUT":
            return {
                ...state,
                profile: action.payload
            }
        case "СITY_INPUT":
            return {
                ...state,
                city: action.payload
            }
        case "ORGANISATION_INPUT":
            return {
                ...state,
                organisationName: action.payload
            }
        case "RECIPIENT_INPUT":
            return {
                ...state,
                recipient: action.payload
            }
        case "HOW_KNOW_INPUT":
            return {
                ...state,
                howDidKnow: action.payload
            }
        case "SUBMIT":
            return {
                ...state,
                submit: true
            }
        case "CLEAR_FORM":
            return {
                name: '',
                phone: '',
                email: '',
                profile: '',
                city: '',
                organisationName: '',
                recipient: '',
                howDidKnow: '',
            }
        default:
            return state
    }
}

export default userReducer;