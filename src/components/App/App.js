import React, { useState } from 'react';
import { Route, Switch, useLocation, useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import Footer from '../Footer/Footer';
import './App.css'; 
import * as mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

 function App() {
 /* State Variables */
  const [Loggedin, setLoggedin] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [currentUser, setCurrentUser] = React.useState({});
  const location = useLocation();
  const history= useHistory();
 const savedNewsLocation = location.pathname === '/saved-news';
const [values, setValues] = React.useState({ email: '', password: '', username: '' });


  React.useEffect(() => {
    //debugger;
    handleCheckToken();
  }, []);


   function handleCheckToken() {
    const jwt = localStorage.getItem("token");
if (jwt) {
      mainApi
        .checkToken(jwt)
        .then(res => {
          if (res) {
      setValues({ email: res.email, username: res.username });
            setLoggedin(true);
            history.push('/')
          }
        })
        .catch(err => {
          console.log("Err: " + err);
        });
    }
  }

  function handleSignup(email, password, username){ 
    console.log(username + email)
    mainApi.register(email, password, username)
    .then((res) =>{
      console.log(res);
    })
    handleCheckToken();
        history.push("/");
  }
  const handleChangeForm = (e) => {
    
   const { name, value } = e.target;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };



  function handleSignIn(e) {
      e.preventDefault();
    mainApi
      .authorize(values.email, values.password)
      .then(() => {
        handleCheckToken();
      
        history.push("/");
        closeAllPopups();  
      })
      .catch(res => {
        if (res === 400) {
          console.log("A field was completed incorrectly");
        }
        if (res === 401) {
          console.log("user email not found");
        }
      });
  }


   function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('jwt');
    setLoggedin(false);   
    history.push('/');
    closeAllPopups();   
    window.location.reload();
  }


function closeAllPopups() {    
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setMobileNavOpen(false);
    setConfirmationPopupOpen(false);
  }
function handleSigninClick() {    
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
    setMobileNavOpen(false);
    setConfirmationPopupOpen(false);
  }
function handleRegisterLinkClick() {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
  }
  function handleMobileClick() {
    setMobileNavOpen(true);
  }

function handleMobileClose() {
    setMobileNavOpen(false);
    }
  
  React.useEffect(() => {
    const handleScreenSizeChange = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleScreenSizeChange);

setIsMobile(screenWidth < 768);

    return () => window.removeEventListener("resize", handleScreenSizeChange);
  }, [screenWidth]);



  return (
     <>
      <div className="page">
         <CurrentUserContext.Provider value={currentUser}>  
       <Header 
       loggedin={Loggedin}
       savedNewsLocation={savedNewsLocation}
       onSigninClick={handleSigninClick}
       onSignOut={handleSignOut}
       mobile={isMobile}
       mobileNavOpen={isMobileNavOpen}
       onHamburgerClick={handleMobileClick}
       onClose={handleMobileClose}
       />

         <Switch> 
          <Route exact path='/'>
            <Main
            />
          </Route>
            <ProtectedRoute
              exact path='/saved-news'
              component={SavedNews}
              loggedin={Loggedin}
              savedNewsLocation={savedNewsLocation}
              currentUser={currentUser}
            />
        </Switch>


       <Footer />
       <LoginPopup
          onSignupClick={handleRegisterLinkClick}
          onClose={closeAllPopups}
          isOpen={isLoginPopupOpen}
          onSubmit={handleSignIn}
          handleChangeForm={handleChangeForm}
          values={values}
        />
        <RegisterPopup
          onSigninClick={handleSigninClick}
          onClose={closeAllPopups}
          isOpen={isRegisterPopupOpen}
          onSubmit={handleSignup}
          handleChangeForm={handleChangeForm}
          values={values}
        />
        <ConfirmationPopup
        onSigninClick={handleSigninClick}
        onClose={closeAllPopups}
        isOpen={isConfirmationPopupOpen}
        />
        </CurrentUserContext.Provider>
       </div>
     </>
   );
 }

export default App;

