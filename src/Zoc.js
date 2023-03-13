const API_KEY = '84ede80b8cb62c3623f68b964b5a1dc7'
const API_BASE = 'https://acampos.com.br/zoc-api/index.php'

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

const zocAPI = {
    getHomelist: async () => {
        return [            
            {
                slug: 'zoc_t2',
                title: 'Zap ou Calote - Temporada 2',
                items: await basicFetch(`?season_id=2&api_key=${API_KEY}`)
            },
            {
                slug: 'zoc_t1',
                title: 'Zap ou Calote - Temporada 1',
                items: await basicFetch(`?season_id=1&api_key=${API_KEY}`)
            },
            {
                slug: '5050',
                title: '50/50 - Temporada 1',
                items: await basicFetch(`?season_id=4&api_key=${API_KEY}`)
            },
            {
                slug: '5050',
                title: 'Desenhando Logos - Temporada 2',
                items: await basicFetch(`?season_id=6&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if (movieId) {
            info = await basicFetch(`?episode_id=${movieId}&api_key=${API_KEY}`)
                   
        }

        return info;
    }
}

export default zocAPI;