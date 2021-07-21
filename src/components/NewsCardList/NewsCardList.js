import NewsCard from "../NewsCard/NewsCard"

function NewsCardList(props) {
    return (
        (

            <ul className='cards__list'>
                <NewsCard
                    loggedin={props.loggedin}
                    savedNewsLocation={props.savedNewsLocation} />
            </ul>

        )
    )
}

export default NewsCardList;