import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';



const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) return;

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
  };

  // вызывается, когда персонаж успешно загружен !
  const onCharLoaded = (char) => {
    setChar(char);
  }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )

}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {
          comics && comics.length > 0 
            ? comics.map((item, i) => (
                <li key={i} className="char__comics-item">
                  {item}
                </li>
              ))
            : <li className="char__comics-item">No comics found</li>
        }
      </ul>
    </>
  );
};


CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;