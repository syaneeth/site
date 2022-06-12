import React from 'react';
import Pint from './test';
import background from '../../images/background.png'
import Web3 from 'web3'
import abi from './abi.json'
import Totalsupply from './totalsupply';

function NFTItem(props) {
  const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/60d373bd57dd44f882f05d4997de8b9e'))

  async function totalSupply() {
    const contractAddress = "0x89e0A37218333b6dFd6785E33f0AFd913BD8406d"
    const contract = web3.eth.Contract(abi, contractAddress)
    const totalSupply2 = await contract.methods.totalSupply().call()
    console.log(totalSupply2)
    return (
      <div>{totalSupply2}</div>
    )
  }

  return (
    <>
      <li className='NFT__item'>
        <div className='NFT__item__link'>
        <figure className='NFT__item__pic-wrap' data-category={props.label}>
          <p className='NFT__item__info'>
              <h5 className='NFT__item__text'> 
              Currently minted:
              </h5>
              <h5 className='NFT__item__text'>
                <Totalsupply/></h5>
              <Pint/>
          </p>
          <img
            className='NFT__item__img'
            alt='Travel'
            src={props.src}
          />
        </figure>
        </div>
    </li>
  </>
  );
}

export default NFTItem;