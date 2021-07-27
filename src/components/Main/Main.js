import SearchForm from '../SearchForm/SearchForm'
import About from '../About/About'
import NewsCardList from '../NewsCardList/NewsCardList'
import NotFound from '../NotFound/Notfound'
import Preloader from '../Preloader/Preloader'
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
 <main className='main'>
                <div className='page__background'>
                    <div className='main__container'>
                        <h1 className='main__heading'>What's going on in the world?</h1>
                        <p className='main__subheading'>Find the latest news on any topic and save them in your personal account.</p>
                    </div>
                    <SearchForm />
                </div>
                <Preloader />
                <NotFound />
                <section className='cards'>
                    <div className='cards__block'>
                        <h2 className='cards__title'>Search results</h2>
                        <NewsCardList
                            loggedin={props.loggedin}
                            savedNewsLocation={props.savedNewsLocation} />
                        <button className='cards__btn'>Show more</button>
                    </div>
                </section>
                <About />
            </main>
            
        )
}

export default Main;

