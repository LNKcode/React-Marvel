import { Component } from 'react';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
  // состояние компонента !
  state = {
    char: {},
    loading: true,
    error: false
  }

  marvelService = new MarvelService();

  // вызывается сразу после загрузки компонента !
  componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 3000);
  }
  // вызывается при удалении компонента
  componentWillUnmount() {
    clearInterval(this.timerId)
    console.log('unmount')
  }
  // вызывается, когда персонаж успешно загружен !
  onCharLoaded = (char) => {
    console.log('update')
    this.setState({
      char,
      loading: false,
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }

  // вызывается, если произошла ошибка
  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }
  // функция загрузки случайного персонажа
  updateChar = () => {
    const id = Math.floor(Math.random() * 20) + 1;
    this.onCharLoading();
    this.marvelService
      .getCharacter(id) // запрос на сервер
      .then(this.onCharLoaded) // при успехе
      .catch(this.onError); // при ошибке
  }

  render() {
    console.log('render')
    const { char, loading, error } = this.state;

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
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
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