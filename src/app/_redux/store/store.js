import buttonSlice from "../api/buttons";
import homePageSlice from "../api/homePage";
import outComeSlice from "../api/outcomePage";
import teamPageSlice from "../api/teamPage";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    buttonData: buttonSlice,
    homePageData: homePageSlice,
    teamPageData: teamPageSlice,
    outComePageData: outComeSlice
});

const store = configureStore({
    reducer: rootReducer
});

export default store;