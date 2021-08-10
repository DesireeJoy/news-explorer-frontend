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
import { newsApi } from '../../utils/NewsAPI';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { token } from '../../utils/constants'

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
const [searchErrorMsg, setSearchErrorMsg] = useState('');
const[notFound, setNotFound] = useState(false)




  const [results, setResults] = useState(false);
  const [cards, setCards] = React.useState([]);
  const [numCardsShown, setNumCardsShown] = useState(3);
  const [savedCards, setSavedCards] = React.useState([]);



  React.useEffect(() => {
    handleCheckToken();
  }, []);

 React.useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);


 React.useEffect(() => {
    if (localStorage.getItem('savedCards') !== null && Loggedin) {
      setSavedCards(JSON.parse(localStorage.getItem('savedCards')));
      setResults(true);
    }
  }, []);





   function handleCheckToken() {
const jwt = localStorage.getItem("token");
  if (jwt) {
      mainApi
        .checkToken(jwt)
        .then(res => {
          if (res) {
            setLoggedin(true);
            setValues({ email: res.email, password: res.password, username: res.username });
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


  // Handle Form Changes
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
function handleShowMore(){
  setNumCardsShown(numCardsShown + 3);
}

  function getUser() {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        findSavedArticles(token);
      })
      .catch((err) => {
        console.log(err);
      });
  }
function handleDeleteArticle(article) {
    article.isSaved = false;
    mainApi.removeArticle(article._id)
      .then(() => {
        const newSavedCards = savedCards.filter((c) => c._id !== article._id);
        setSavedCards(newSavedCards);
        const newCards = cards.map((c) => (c._id === article._id ? article : c));
        setCards(newCards);
        localStorage.setItem('savedCards', JSON.stringify(newSavedCards));
        
      })
      .catch(err => console.log("Error: " + err));
  }

 
 function findSavedArticles(token) {
    mainApi
      .getArticles(token)
      .then((res) => {
        setSavedCards(res);
      })
      .catch((error) => console.log(error));
  }


    function handleSaveArticle(card) {
    if (!Loggedin) {
      return handleSigninClick();
    } else if (card.isSaved === true) {
     handleDeleteArticle(card);
    }
    else if (!savedNewsLocation && Loggedin) {
      card.keyword = searchTerm;
      card.source = card.source.name;
      console.log(card)
      mainApi.saveArticle(card)
        .then((newCard) => {
          newCard.isSaved = true;
          const newCards = cards.map((c) => c === card ? newCard : c);
          console.log(newCards)
          const newSavedCards = [...savedCards, newCard];
          setSavedCards(newSavedCards);
          console.log("Saved cards are " +  savedCards)
          setCards(newCards);
          localStorage.setItem('savedCards', JSON.stringify(newSavedCards));
        })
        .catch(err => console.log("Error: " + err));

    }
    else {
      handleDeleteArticle(card);
    }
  }


  function handleSignIn(e) {    
    if (e){
    e.preventDefault();
    }
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

function handleSearchSubmit(e) {
    e.preventDefault();
    setPreloader(true);
    if (searchTerm.length === 0) {
      setPreloader(false);
      setSearchErrorMsg('Must enter search term');
      return
    }
    newsApi.getNewsCards(searchTerm)
      .then((data) => {
        console.log("There are "+ data.length + " results")
        if (data.length === 0) {
          setNotFound(true);
        }
        return data;
      })
      .then((cards) => {
        setNumCardsShown(3);
        setCards(cards);
        setResults(true);
        setSearchTerm(searchTerm);
        setPreloader(false);
        setSearchErrorMsg('');

      })
      .catch(() => {
        setSearchErrorMsg("Something went wrong with this request. Please try again later.")
        setPreloader(false);
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
       Loggedin={Loggedin}
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
            Loggedin={Loggedin}
            savedNewsLocation={savedNewsLocation}
            handleSearchSubmit={handleSearchSubmit}
            setSearchErrorMsg={setSearchErrorMsg}
                searchTerm={searchTerm}
                preloader={preloader}
                notFound={notFound}
                results={results}
                cards={cards}
                handleShowMore={handleShowMore}handleSave
                numCardsShown={numCardsShown}
                 handleSaveArticle={(card) => { handleSaveArticle(card) }}
            
            
            
            />
          </Route>
            <ProtectedRoute
              exact path='/saved-news'
              component={SavedNews}
              Loggedin={Loggedin}
              cards={cards}
              searchTerm={searchTerm}
              savedCards={savedCards}
              savedNewsLocation={savedNewsLocation}
              currentUser={currentUser}
              handleSaveArticle={(card) => { handleSaveArticle(card) }}
              handleDeleteArticle={(card) => { handleDeleteArticle(card) }}
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

