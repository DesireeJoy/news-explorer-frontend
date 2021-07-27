import Popup from "../Popup/Popup"
import React, { useState } from 'react';
 

function LoginPopup(props) {
    
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
                    <input className="login__input" placeholder="Enter your email" name="email" type="email" required value={"" | props.values.email} onChange={props.handleChangeForm} />
                    <label className='login__label'>Password</label>
                    <input className="login__input" placeholder="Enter password" name="password" type="password" required value={"" | props.values.password} onChange={props.handleChangeForm} />
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