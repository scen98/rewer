/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, lazy, Suspense, useState } from 'react';
import './App.css';
import "./main.css";
// @ts-ignore
import { Route, BrowserRouter as Router, Switch} from "react-router-dom";

import Helmet from "react-helmet";
import { Header } from './components/header/Header';
import { handleLogin } from './callers/authUserCaller';
import ModalProvider from './components/Modal';
import { getParameter } from './urlManager';
import Loading from './components/Loading';
import Create from './pages/Create';
import { MessageProvider } from './components/Messenger';

const Home = lazy(()=> { return import("./pages/Home") } );
const EditMovie = lazy(()=> {return import("./pages/EditMovie") });
const Profile = lazy(()=> { return import("./pages/Profile") });
const EditArtist = lazy(()=> { return import("./pages/EditArtist") });
const Movie = lazy(()=> { return import("./pages/Movie") });
const Star = lazy(()=> { return import("./pages/Star") });
const User = lazy(()=> { return import("./pages/User") });
const FollowsPage = lazy(()=> { return import("./pages/FollowsPage") });
const EditSeries = lazy(()=> { return import("./pages/EditSeries") });
const Series = lazy(()=> { return import("./pages/Series") });
const SearchPage = lazy(()=> { return import("./pages/SearchPage") });
const News = lazy(()=> { return import("./pages/News") });
const MyArticles = lazy(()=> { return import("./pages/MyArticles") });
const EditGame = lazy(()=>{ return import("./pages/EditGame") });
const Game = lazy(()=>{ return import("./pages/Game") });

function App() {
  const [permissionLevel, setPermissionLevel] = useState<number>(0);

  useEffect(()=>{
    loginRequest();
  }, []);
  
  const loginRequest = async ()=>{
    if(await handleLogin()){
      getPermissionLvl();
    }
  }

  const getPermissionLvl = ()=>{
    const permlvl: string = localStorage.getItem("permission");
    if(permlvl){
      setPermissionLevel(parseInt(permlvl));
    } else {
      setPermissionLevel(0);
    }
  }

  return (
    <Router>
    <Helmet>
      <title>Rewer</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://szben.eu/rewer/home" />
    </Helmet>
    <ModalProvider>
    <MessageProvider>
    <Header permissionLevel={permissionLevel} />
      <div className="page">
          <Switch>
            <Suspense fallback={<Loading />}>
              <Route exact path="/rewer" component={Home} />
              <Route exact path="/rewer/home" component={Home} />
              <Route exact path="/rewer/movie" render={() => <Movie key={getParameter("movieId")}/>} />
              <Route exact path="/rewer/series" render={() => <Series key={getParameter("seriesId")}/>} />
              <Route exact path="/rewer/game" render={() => <Game key={getParameter("gameId")}/>} />
              <Route exact path="/rewer/profile" render={()=> <Profile setPermissionLevel={setPermissionLevel} />} />
              <Route exact path="/rewer/user" component={User} />
              <Route exact path="/rewer/editartist" component={EditArtist} />
              <Route exact path="/rewer/star" component={Star} />
              <Route exact path="/rewer/create" component={Create} />
              <Route exact path="/rewer/editmovie" component={EditMovie} />
              <Route exact path="/rewer/editgame" component={EditGame} />
              <Route exact path="/rewer/editseries" component={EditSeries} />
              <Route exact path="/rewer/follows" component={FollowsPage} />
              <Route exact path="/rewer/search" component={SearchPage} />
              <Route exact path="/rewer/news" component={News} />
              <Route exact path="/rewer/myarticles" component={MyArticles} />
            </Suspense>
          </Switch>
        </div>
      </MessageProvider>
      </ModalProvider>
    </Router>
  );
}

export default App;
