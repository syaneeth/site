import React from 'react';
import NFTItem from './web3/Mintbutton';
import './NFT.css';
import gandalf from '../images/WELF.gif';

function NFT() {
  return (
    <div className='NFT'>
        <div className='NFT__wrapper'>
            <div className='NFT__container'>
                <ul className='NFT__items'>
                    <NFTItem
                    src={gandalf}
                    label='0.1'
                    path='server'
                    />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NFT