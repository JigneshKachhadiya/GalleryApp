
export function getAlbums(data) {
    // console.log('Action data------------>', data)
    return (dispatch, getState) => {
        dispatch({
            type: 'getAlbumsList',
            subtype: 'loading',
        });
        const response = {
            data
        };
        if (response.error) {
            dispatch({
                type: 'getAlbumsList',
                error: response.error,
            });
        } else {
            dispatch({
                type: 'getAlbumsList',
                subtype: 'success',
                albumsData: response
            });
        }

    };
}
