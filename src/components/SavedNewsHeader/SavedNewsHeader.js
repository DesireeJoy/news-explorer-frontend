function SavedNewsHeader(){
    return(
        (
            <section className='savedNews'>
                <p className='savedNews__heading'>Saved articles</p>
                <h2 className='savedNews__title'>Elise, you have 5 saved articles</h2>
                <p className='savedNews__key'>By keywords: <span className='savedNews__keywords'> Nature, Yellowstone, and 2 other</span></p>
            </section>
        )
    )
}

export default SavedNewsHeader;