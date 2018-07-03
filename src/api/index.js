import config from './config'

const apiKey = config.apiKey
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:pais&api_key=${apiKey}&format=json`

export default function getArtists(pais){
    const url = URL.replace(':pais',pais)
    return fetch(url)
            .then(res => res.json())
                    .then(json => json.topartists.artist)
}