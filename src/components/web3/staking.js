import abi from '../web3/abi.json';
import { Button2 } from '../Button';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import WalletLink from 'walletlink'
import { Component } from "react";
import './staking.css'
import stakingabi from '../web3/vaultabi.json'

const contractAddress = "0x89e0A37218333b6dFd6785E33f0AFd913BD8406d"
const stakingAddress = '0xdB21cb203820e2827B37CC85C09885a484b198CB'

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


class Inventory extends Component {

    constructor(props) {
        super(props);
    
        this.state = {};
    }

    async approveNFTs() {
	    var provider = await web3Modal.connect();
      const web3 = new Web3(provider);
		  await provider.send('eth_requestAccounts'); 
		  const accounts = await web3.eth.getAccounts();
		  const account = accounts[0];
      const contract = new web3.eth.Contract(abi, contractAddress)
      await contract.methods.setApprovalForAll(stakingAddress, true).send({from: account});
    }
  
            
  
    renderMetamask() {
      if (!this.state.selectedAddress) {
        return (
          <Button2 buttonStyle='btn--black' buttonSize='btn--small' className='connect-wallet' onClick={() => this.onClickConnect()}>Connect Wallet</Button2>
        )
      } else {

        return(
          <div className='nfts'>
            <Button2 onClick={() => this.approveNFTs()}>Approve NFTs</Button2>
            {this.state.renderNFT}
          </div>
        )
      
    }
  }
  
    render() {

      async function onClickConnect() {
        var provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        await provider.send('eth_requestAccounts'); 
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        this.setState({ selectedAddress: account})
        const contract = new web3.eth.Contract(abi, contractAddress)
        const vaultcontract = new web3.eth.Contract(stakingabi, stakingAddress);
        const elfBalance = await contract.methods.balanceOf(account).call()
        console.log(elfBalance)
        let nfts = []
        function stakeit(value) {
          const tokenid = [value]
          vaultcontract.methods.stake(tokenid).send({from: '0xcCC34C28A0b3762DaE74EECa2a631661DaF3DAf5'});
        }
        function unstakeit(value) {
          const tokenid = [value]
          vaultcontract.methods.unstake(tokenid).send({from: '0xcCC34C28A0b3762DaE74EECa2a631661DaF3DAf5'});
        }
        for(let i = 0; i < elfBalance; i++) {
              console.log(tokenIds)
              nfts.push(
              )
              console.log(nfts)
            }
          this.setState({ renderNFT: nfts})
      }

        return(
          <div>
          {nfts.map((assets, i)=> {
            const tokenIds = contract.methods.tokenOfOwnerByIndex(account, i).call()
            async function stakeit() {
              vaultcontract.methods.stake([assets.token_id]).send({from: account});
            }
            async function unstakeit() {
              vaultcontract.methods.unstake([assets.token_id]).send({from: account});
            }

            return(
              <div className="card mt-3" key={i} >
                <div className="image-over">
                  <img className={'nft-'+tokenIds} id={tokenIds} width="128" height="128" alt='' src={"https://ipfs.io/ipfs/Qmb7QrwvydDKKUu6zDPdS2JGnfxaJw2jKmuy8b8DqfLDtX/"+tokenIds+".png"} />
                </div>
                <div className="card-caption col-12 p-0">
                    <div className="card-body">
                      <h5 className="mb-0">Elf #{tokenIds}</h5>
                      <Button2 buttonStyle='btn-black' onClick={stakeit(tokenIds)}>Stake it</Button2>
                      <Button2 buttonStyle='btn-black' onClick={unstakeit(tokenIds)}>Unstake it</Button2>
                    </div>
                </div>
              </div>

            )
          }
            )
                }
          </div>
        )}
}

export default Inventory;
