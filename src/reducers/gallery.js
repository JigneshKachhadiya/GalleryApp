const initialState = {
};

export default function gallery(state = initialState, action = {}) {
  switch (action.type) {
    case 'getGalleryList': {
      return {
        ...state,
        getGalleryListError: action.error ? action.error : null,
        getGalleryListSuccess: action.subtype === 'success',
        getGalleryListLoading: action.subtype === 'loading',
        galleryData: action.subtype === 'success' ? action.galleryData : state.galleryData,
      }
    };
    case 'deletePhoto': 
    return {...state, galleryData: action.galleryData};
    default:
      return state;
  }
}