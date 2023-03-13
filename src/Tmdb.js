const API_KEY = '84ede80b8cb62c3623f68b964b5a1dc7'
const API_BASE = 'https://api.themoviedb.org/3'

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

const netflixAPI = {
    getHomelist: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&append_to_response=videos&api_key=${API_KEY}`)
            },
            {
                slug: 'tranding',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&append_to_response=videos&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&append_to_response=videos&api_key=${API_KEY}`)
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&append_to_response=videos&api_key=${API_KEY}`)
                    break;

                default:
                    info = null;
                    break;
            }
        }

        return info;
    }
}

export default netflixAPI;