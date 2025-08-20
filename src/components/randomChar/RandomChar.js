import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {
  // состояние компонента !
  const [char, setChar] = useState({});
  const { loading, error, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
    // const timerId = setInterval(updateChar, 3000);

    return () => {
      // clearInterval(timerId);
    }
  }, [])

  // вызывается, когда персонаж успешно загружен !
  const onCharLoaded = (char) => {
    console.log('update')
    setChar(char);
  }

  // функция загрузки случайного персонажа
  const updateChar = () => {
    const id = Math.floor(Math.random() * 20) + 1;
  getCharacter(id) // запрос на сервер
  .then(onCharLoaded) // при успехе
  }


// в зависимости от состояния рендерим нужное 
const errorMessage = error ? <ErrorMessage /> : null;
const spinner = loading ? <Spinner /> : null;
const content = !(error || loading) ? <View char={char} /> : null;

return (
  <div className="randomchar">
    {errorMessage}
    {spinner}
    {content}
    <div className="randomchar__static">
      <p className="randomchar__title">
        Random character for today!<br />
        Do you want to get to know him better?
      </p>
      <p className="randomchar__title">
        Or choose another one
      </p>
      <button className="button button__main" onClick={updateChar}>
        <div className="inner">try it</div>
      </button>
      <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
    </div>
  </div>
)
}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;