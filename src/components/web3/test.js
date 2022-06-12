import React, { Component, useState } from 'react';
import Web3 from 'web3';
import abi from '../web3/abi.json';
import { Button2 } from '../Button';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import WalletLink from 'walletlink'
import './mint.css'



const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	  walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "60d373bd57dd44f882f05d4997de8b9e"
		}
	},
	walletlink: {
		package: WalletLink, 
		options: {
		  appName: "LOE Mint", 
		  infuraId: "60d373bd57dd44f882f05d4997de8b9e",
		  rpc: "", 
		  chainId: 4, 
		  appLogoUrl: null, 
		  darkMode: true 
		}
	  },
};

const web3Modal = new Web3Modal({
	network: "rinkeby",
	theme: "dark",
	cacheProvider: true,
	providerOptions 
  });


const contractAddress = "0x89e0A37218333b6dFd6785E33f0AFd913BD8406d"

class Pint extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '1'
    };
  }

  async connectToMetamask() {
		var provider = await web3Modal.connect();
    const web3 = new Web3(provider);
		await provider.send('eth_requestAccounts'); 
		const accounts = await web3.eth.getAccounts();
		const account = accounts[0];
    this.setState({ selectedAddress: account})
  }

  async mintNFT() {
		var provider = await web3Modal.connect();
    const web3 = new Web3(provider);
		const contract = new web3.eth.Contract(abi, contractAddress); 
    const _mintAmount = Number(this.state.inputValue); 
    const mintRate = Number(await contract.methods.cost().call()); 
    const totalAmount = mintRate * _mintAmount; 
    const account = this.state.selectedAddress
    console.log(totalAmount)
    try {
    contract.methods.mint(_mintAmount).send({ from: account, value: String(totalAmount) })
    } catch(error){
      console.log(error)
    }
  }

  renderMintButton() {
    if (!this.state.selectedAddress) {
      return (
      <div>
        <Button2 buttonStyle='btn-black' buttonSize='btn-b-small' className='mintnft' onClick={() => this.connectToMetamask()}>Connect Wallet</Button2>
      </div>
      )
    } else {
      return (
        <div className='connected-wallet'> 
            <Button2 buttonStyle='btn-black' buttonSize='btn-b-small'  className='mint-nft' onClick={() => this.mintNFT()}>
                Mint now!
            </Button2>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderMintButton()}
      </div>
    )
  }
}

export default Pint;