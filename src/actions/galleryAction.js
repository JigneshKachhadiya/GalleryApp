
export function getGallery(data) {
    return (dispatch, getState) => {
        dispatch({
            type: 'getGalleryList',
            subtype: 'loading',
        });
        const response = {
            data
        };
        if (response.error) {
            dispatch({
                type: 'getGalleryList',
                error: response.error,
            });
        } else {
            dispatch({
                type: 'getGalleryList',
                subtype: 'success',
                galleryData: response
            });
        }

    };
}
