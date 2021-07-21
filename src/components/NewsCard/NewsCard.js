function NewsCard(props) {

    return (
        (<>
            <li className='card'>
                <div className='card__img'>
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
                <div className='card__img'>
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
                <div className='card__img'>
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
                <div className='card__img'>
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
                <div className='card__img'>
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
             
        </>



        )
    )
}

export default NewsCard;