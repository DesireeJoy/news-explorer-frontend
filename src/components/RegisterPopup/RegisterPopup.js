import Popup from "../Popup/Popup"
import React, { useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';

function RegisterPopup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        (
            <Popup
                isOpen={props.isOpen}
                onClose={props.onClose}
                onSubmit={props.onSubmit}
                name='sign-up' title='Sign up'
            >
                <div className="login" >
                    <label className='login__label'>Email</label>
                    <input className="login__input" placeholder="Enter your email" name="email" type="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label className='login__label'>Password</label>
                    <input className="login__input" placeholder="Enter password" name="password" type="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <label className='login__label'>Username</label>
                    <input className="login__input" placeholder="Enter your username" name="username" type="text" required value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <span className='login__error'>This email is not available</span>
                    <button type="submit" className="login__btn">Sign up</button>


                    <div className="login__signup">
                        <p className='login__or'>or
                <span className="login__link" onClick={props.onSigninClick}>Sign in</span>
                        </p>
                    </div>
                </div>
            </Popup>
        )
    )
}

export default RegisterPopup;