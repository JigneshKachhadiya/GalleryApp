const initialState = {
  firstLaunchDone: false,
  noInternetConnection: 0,
  signInMode: true,
};


export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case 'firstLaunchDone':
      return {
        ...state,
        firstLaunchDone: true,
      };
    case 'firstLaunchActionDone':
      return {
        ...state,
        firstLaunchActionDone: true,
      };
    case 'disableGestureGuide':
      return {
        ...state,
        disableGestureGuide: true,
      };
    case 'disableActionGuide':
      return {
        ...state,
        disableActionGuide: true,
      };
    case 'internetCheck':
      return {
        ...state,
        internetCheckDisabled: action.disabled,
      };
    case 'setSignInModeForApp':
      return {
        ...state,
        signInMode: action.signInMode,
      };
    default:
      return state;
  }
}
