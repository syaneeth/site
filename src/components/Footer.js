import React from 'react'
import { Button } from './Button'
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

function Footer() {
  return (
    <div className='footer-container'>
        <section className='footer-subscription'>
            <p className='footer-subscription-heading'>
                Join the battle today!
            </p>
            <p className='footer-subscription-text'>
                Lets fight
            </p>
            <div className='input-areas'>
                <form>
                    <input
                    type='Mail'
                    name='email'
                    placeholder='Email'
                    className='footer-input'
                    />
                    <Button buttonStyle='btn-black'>Mint now</Button>
                </form>
            </div>
        </section>
        <div className='footer-links'>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                    <h2>About us</h2>
                    <Link to='/server'>Whitelist</Link>
                    <Link to='/minting'>Minting</Link>
                    <Link to='/staking'>Staking</Link>
                </div>
            </div>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                    <h2>Links</h2>
                    <Link to='/twitter'>Twitter</Link>
                    <Link to='/etherscan'>Docs</Link>
                    <Link to='/discord'>Discord</Link>
                </div>
            </div>
        </div>
        <section className='social-media'>
            <div className='social-media-wrap'>
                <div className='footer-log'>
                    <Link to='/' className='social-logo'>
                        LOE <img src={logo} className='footer-logo' alt=''/>
                    </Link>
                </div>
                <small className='website-rights'>LOE © 2022</small>
                <div className='social-icons'>
                    <Link className='social-icon-link twitter'
                    to='/'
                    target='blank'
                    aria-label='Twitter'
                    >
                        <i className='fab fa-twitter'>
                        </i>
                    </Link>
                    <Link className='social-icon-link discord'
                    to='/'
                    target='blank'
                    aria-label='Discord'
                    >
                        <i className='fab fa-discord'>
                        </i>
                    </Link>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer;