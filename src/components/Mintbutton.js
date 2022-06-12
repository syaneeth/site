import React from 'react';
import { Link } from 'react-router-dom';

function NFTItem(props) {
  return (
    <>
      <li className='NFT__item'>
        <Link className='NFT__item__link' to={props.path}>
          <figure className='NFT__item__pic-wrap' data-category={props.label}>
            <p className='NFT__item__info'>
                <h5 className='NFT__item__text'>{props.text}</h5>
            </p>
            <img
              className='NFT__item__img'
              alt='Travel'
              src={props.src}
            />
          </figure>
        </Link>
      </li>
    </>
  );
}

export default NFTItem;