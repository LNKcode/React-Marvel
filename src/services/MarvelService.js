import { useHttp } from "../components/hooks/http.hook";

const useMarvelService = () => {

  const {loading, request, error} = useHttp();

  const _apiBase = 'https://marvel-server-zeta.vercel.app/';
  const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
  const _baseOffset = 0;



  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {

    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0])
  }


  const getAllComics = () => {
    return request(`${_apiBase}comics?limit=8&offset=0&${_apiKey}`);
  }

  const getComic = (id) => {
    return request(`${_apiBase}comics/${id}?${_apiKey}`);
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;
