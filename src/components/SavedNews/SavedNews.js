import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
function SavedNews(props){
    
    return(
        (
            <section className='savedNews-main'>               
                <SavedNewsHeader />
                <div className='cards__block'>
                <NewsCardList
                loggedin={props.loggedin}
                savedNewsLocation={props.savedNewsLocation} />
                </div>
            </section>
        )
    )
}

export default SavedNews;