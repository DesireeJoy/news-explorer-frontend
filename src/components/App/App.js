 import React from 'react';
 import { Route, Switch } from 'react-router-dom';
 import Header from './Header';
 import Main from '.Main';
 import Footer from './Footer';
 import './App.css'; // we will usually place CSS imports last

 function App() {
   return (
     <>
      <div className="page">
       <Header />
        <Switch>
          <Route exact path='/'>
            <Main
            
            />
          </Route>
          <Route path='/saved-news'>
            <SavedNews
            />
          </Route>
        </Switch>

       <Main />
       <Footer />
       </div
     </>
   );
 }

export default App;
