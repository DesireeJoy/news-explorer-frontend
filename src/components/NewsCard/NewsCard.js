function NewsCard(props) {

    return (
        (<>
            <li className='card'>
                <div className='card__img card1'>
                    {props.loggedin ? (<div className='card__keyword-display'
                    >keywords</div>) : <div></div>}
                    <div className='card__btn-container'>
                        <button className={`card__btn card__btn_${props.savedNewsLocation ? 'trashcan' : 'bookmark'}`}></button>
                        {props.loggedin ? <button className='card__btn-signin'>Remove from saved</button> :
                            <button className='card__btn-signin'>Sign in to save articles</button>}
                    </div>
                </div>
                <p className='card__date'>November 4, 2020</p>
                <h3 className='card__title'>Everyone Needs a Special 'Sit Spot' in Nature</h3>
                <p className='card__description'>Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
                <p className='card__keyword'>treehugger</p>
            </li>
            <li className='card'>
                <div className='card__img card2'>


        

                    {props.loggedin ? (<div className='card__keyword-display'>keywords</div>) : <div></div>}
                    <div className='card__btn-container'>
                        <button className={`card__btn card__btn_${props.savedNewsLocation ? 'trashcan' : 'bookmark'}`}></button>
                        {props.loggedin ? <button className='card__btn-signin'>Remove from saved</button> :
                            <button className='card__btn-signin'>Sign in to save articles</button>}
                    </div>

                </div>
                <p className='card__date'>February 19, 2019</p>
                <h3 className='card__title'>Nature makes you better</h3>
                <p className='card__description'>We all know how good nature can make us feel. We have known it for millennia: the sound...</p>
                <p className='card__keyword'>National Geograpic</p>
            </li>
            <li className='card'>
                <div className='card__img card3'>

                    {props.loggedin ? (<div className='card__keyword-display'>keywords</div>) : <div></div>}
                    <div className='card__btn-container'>
                        <button className={`card__btn card__btn_active card__btn_${props.savedNewsLocation ? 'trashcan' : 'bookmark'}`}></button>
                        {props.loggedin ? <button className='card__btn-signin'>Remove from saved</button> :
                            <button className='card__btn-signin'>Sign in to save articles</button>}
                    </div>

                </div>
                <p className='card__date'>October 19, 2020</p>
                <h3 className='card__title'>Nostalgic Photos of Tourists in U.S. National Parks</h3>
                <p className='card__description'>Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and...</p>
                <p className='card__keyword'>National Geographic</p>
            </li>
            <li className='card'>
                <div className='card__img card4'>

                    {props.loggedin ? (<div className='card__keyword-display'>keywords</div>) : <div></div>}
                    <div className='card__btn-container'>
                        <button className={`card__btn card__btn_active card__btn_${props.savedNewsLocation ? 'trashcan' : 'bookmark'}`}></button>
                        {props.loggedin ? <button className='card__btn-signin'>Remove from saved</button> :
                            <button className='card__btn-signin'>Sign in to save articles</button>}
                    </div>

                </div>
                <p className='card__date'>November 4, 2020</p>
                <h3 className='card__title'>Grand Teton Renews Historic Crest Trail</h3>
                <p className='card__description'>Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and...</p>
                <p className='card__keyword'>National Geographic</p>
            </li>

             <li className='card'>
                <div className='card__img card5'>

                    {props.loggedin ? (<div className='card__keyword-display'>keywords</div>) : <div></div>}
                    <div className='card__btn-container'>
                        <button className={`card__btn card__btn_active card__btn_${props.savedNewsLocation ? 'trashcan' : 'bookmark'}`}></button>
                        {props.loggedin ? <button className='card__btn-signin'>Remove from saved</button> :
                            <button className='card__btn-signin'>Sign in to save articles</button>}
                    </div>

                </div>
                <p className='card__date'>March 16,</p>
                <h3 className='card__title'>Scientists Don't Know Why Polaris Is So... </h3>
                <p className='card__description'>Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the...</p>
                <p className='card__keyword'>treehugger</p>
            </li>
        </>



        )
    )
}

export default NewsCard;