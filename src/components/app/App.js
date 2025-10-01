import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
// import MainPage from "../pages/MainPage";
// import ComicsPage from "../pages/ComicsPage";
// import SingleComicPage from "../pages/SingleComicPage";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route path="/comics" element={<ComicsPage />} />

              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route
                path="/comics/:id"
                element={<SinglePage Component={SingleComicLayout} dataType="comic" />}
              />
              <Route
                path="/characters/:id"
                element={<SinglePage Component={SingleCharacterLayout} dataType="character" />}
              />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App;