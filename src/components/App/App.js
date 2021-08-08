import React, { useState, useCallback } from 'react';
import { Route, Switch, useLocation, useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import Footer from '../Footer/Footer';
import './App.css'; 
import { mainApi } from '../../utils/MainApi';
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
  const [wrongEmailOrPasswordMessage, setWrongEmailOrPasswordMessage] = React.useState(false)
  const location = useLocation();
  const history= useHistory();
 const savedNewsLocation = location.pathname === '/saved-news';
const [values, setValues] = React.useState({ email: '', password: '', username: '' });

  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [duplicateEmail, setDuplicateEmail] = React.useState(false);
  const [preloader, setPreloader] = React.useState(false);

const [searchTerm, setSearchTerm] = useState('');
 console.log(searchTerm)
  React.useEffect(() => {
    //debugger;
    handleCheckToken();
  }, []);

 React.useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

   function handleCheckToken() {
const jwt = localStorage.getItem("token");
  if (jwt) {
  console.log("I see the jwt " + jwt)
      mainApi
        .checkToken(jwt)
        .then(res => {
          if (res) {
            setLoggedin(true);
            setValues({ email: res.email, password: res.password, username: res.username });
            console.log(res)
            history.push('/')
          }
        })
        .catch(err => {
          console.log("Err: " + err);
        });
    }
  
  }


 function fieldValidation() {
    const validEmailRegex = RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i
    );
    setErrors((origErrors) => ({
      ...origErrors,
      email: validEmailRegex.test(values.email) ? "" : "Invalid email address",
    }));

  }

  function handleSignup(e){ 
    e.preventDefault();
    mainApi.register(values.email, values.password, values.username)
    .then((res) =>{

       if (res.message === 'Duplicate User') {      
         setDuplicateEmail(true)    
          return Promise.reject(`Error! ${res.message}`);
        }
        if (res.ok){
      return res.json();
        }
    })
    .then(() => {
        setConfirmationPopupOpen(true);
        setRegisterPopupOpen(false);
        setDuplicateEmail(false)       
        resetForm();
      })
      .catch(err => console.log(err));
  }


  // Handle Form Typing
  const handleChangeForm = (e) => {
    
   const { name, value } = e.target;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
    fieldValidation(newValues);
    setErrors({ ...errors, [name]: errors[name] });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues = { email: '', password: '', username: '' },
      newErrors = { email: '', password: '', username: '' },
      newIsValid = false,
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );


  function getUser() {
    mainApi
      .getUserInfo()
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function handleSignIn(e) {    
    e.preventDefault();
    
    mainApi
      .authorize(values.email, values.password)
      .then(res => {
   
        if (res.statusCode === 400) {
          setWrongEmailOrPasswordMessage(true);
          return Promise.reject(`Error! ${res.message}`);
        }
        console.log(res)
        localStorage.setItem('token', res.token);
        console.log(localStorage.getItem('token'));
        getUser();
      })
      .then(() => {
         handleCheckToken();
        closeAllPopups();
        resetForm();
       
        window.location.reload();
      })
      .catch(res => {
        if (res.statusCode === 400) {
          console.log('one of the fields was filled in in correctly')
           setWrongEmailOrPasswordMessage(true);
          return Promise.reject(`Error! ${res.message}`);
        }
        if (res.statusCode === 401) {
          console.log('user email not found')
           setWrongEmailOrPasswordMessage(true);
          return Promise.reject(`Error! ${res.message}`);
        }
      })
  

  }


   function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    setLoggedin(false);   
    history.push('/');
    closeAllPopups();   
    window.location.reload();
  }
function handleSearchSubmit(){}

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
    setWrongEmailOrPasswordMessage(false);
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
       values={values}
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
            setSearchTerm={setSearchTerm}
            loggedin={Loggedin}
            savedNewsLocation={savedNewsLocation}
            handleSearchSubmit={handleSearchSubmit}
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
          isValid={isValid}
          wrongEmailOrPasswordMessage={wrongEmailOrPasswordMessage}
        />
        <RegisterPopup
          onSigninClick={handleSigninClick}
          onClose={closeAllPopups}
          isOpen={isRegisterPopupOpen}
          onSubmit={handleSignup}
          handleChangeForm={handleChangeForm}
          values={values}
          duplicateEmail={duplicateEmail}
           isValid={isValid}
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

