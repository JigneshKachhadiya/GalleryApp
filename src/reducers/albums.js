const initialState = {
};

export default function albums(state = initialState, action = {}) {
  switch (action.type) {
    case 'getAlbumsList': {
      return {
        ...state,
        getAlbumsListError: action.error ? action.error : null,
        getAlbumsListSuccess: action.subtype === 'success',
        getAlbumsListLoading: action.subtype === 'loading',
        albumsData: action.subtype === 'success' ? action.albumsData : state.albumsData,
      }
    };
    default:
      return state;
  }
}