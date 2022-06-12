import React from 'react'
import CardItem from './CardItem'
import './cards.css';
import gandalf from '../images/WELF.gif';
import zebaleek from '../images/Orc Elf King.gif';
import bloodelf from '../images/Legendary Blood Elf.gif';

function Cards() {
  return (
    <div className='cards'>
        <h1>Meet the team!</h1>
        <div className='cards__wrapper'>
            <div className='cards__container'>
                <ul className='cards__items'>
                    <CardItem
                    id='card_color'
                    src={gandalf}
                    text='Syane.eth'
                    label='Founder'
                    path='server'
                    />
                    <CardItem
                    id='card_color'
                    src={bloodelf}
                    text='Cyrviresss'
                    label='Founder'
                    path='server'
                    />
                    <CardItem
                    id='card_color'
                    src={zebaleek}
                    text='Zebaleek'
                    label='Founder'
                    path='server'
                    />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards