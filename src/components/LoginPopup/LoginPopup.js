import Popup from "../Popup/Popup"
import React, { useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';

function LoginPopup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        (
            <Popup
                isOpen={props.isOpen}
                onClose={props.onClose}

                onSubmit={props.handleSignin}
                name='sign-in' title='Sign in'
            >
                <div className="login" >
                    <label className='login__label'>Email</label>
                    <input className="login__input" placeholder="Enter your email" name="email" type="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label className='login__label'>Password</label>
                    <input className="login__input" placeholder="Enter password" name="password" type="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <button type="submit" className="login__btn" aria-label="Sign in" onClick={props.onSubmit}>Sign in</button>
                    <div className="login__signup">
                        <p className='login__or'>or
                            <span className="login__link" onClick={props.onSignupClick}>Sign up</span>
                        </p>
                    </div>
                </div>
            </Popup>
        )
    )
}

export default LoginPopup;