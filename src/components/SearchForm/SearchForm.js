function SearchForm(props) {
    return (
        (
            <section className='search'>
                <form className='search__form'>
                    <input className='search__input' placeholder='Enter topic' />
                    <button className='search__submit'>Search</button>
                </form>
            </section>


        )
    )
}

export default SearchForm;