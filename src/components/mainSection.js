import React from 'react';
import { Button } from './Button';
import './mainSection.css';
import '../App.css';
import trailer from '../videos/homepage2.mp4';


function MainSection() {
  return (
    <div className='main-container'>
      <video src={trailer} autoPlay loop muted/>
      <h1>LEGENDS OF ELFIA</h1>
      <p>Join the fight today!</p>
      <div className='main-btns'>
          <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'> JOIN NOW </Button>
          <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'> WATCH TRAILER <i className='far fa-play-circle' /></Button>
      </div>
    </div>
  );
}

export default MainSection;