const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34896851-0d66a9e8e3b1e7c58e0577c6f';

export const getImages = (searchText, page = 1) => {
   return fetch(`${BASE_URL}/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                return Promise.reject(new Error('Oops... Something went wrong'))
            })
};

// 34896851-0d66a9e8e3b1e7c58e0577c6f