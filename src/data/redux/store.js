import {combineReducers, createStore} from 'redux';
import candidateRequestReducer from "./candidateRequest/candidateRequestReducer";
import commonReducer from "./common/commonReducer";
import offboardRequestReducer from "./offboardRequest/offboardRequestReducer";
import taskManagerReducer from "./taskManager/taskManagerReducer";
import thirdPartyReducer from "./thirdParty/thirdPartyReducer";
import requisitionRequestReducer from "./requisitionRequst/requisitionRequestReducer";
import onboardingDashboardReducer from "./onboardingDashboard/onboardingDashboardReducer";
import multiCandidateRequestReducer from "./multiCandidateRequest/multiCandidateRequestReducer";
import userDirectoryReducer from "./userDirectory/userDirectoryReducer";
import taskManagerHrInfoReducer from "./taskManagerHrInfo/taskManagerHrInfoReducer";

const rootReducer = combineReducers({
    common: commonReducer,
    userDirectory: userDirectoryReducer,
    thirdParty: thirdPartyReducer,
    onboardingDashboard: onboardingDashboardReducer,
    requisitionRequest: requisitionRequestReducer,
    candidateRequest: candidateRequestReducer,
    multiCandidateRequest: multiCandidateRequestReducer,
    offboardRequest: offboardRequestReducer,
    taskManager: taskManagerReducer,
    taskManagerHrInfo: taskManagerHrInfoReducer,
});

const store = createStore(
    rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;