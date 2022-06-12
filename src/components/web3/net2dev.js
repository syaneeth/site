import '../../App.css';
import { Button2 } from '../Button';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import ABI from './abi.json'
import VAULTABI from './vaultabi.json';

var account = null;
var contract = null;
var vaultcontract = null;


const NFTCONTRACT = "0x89e0A37218333b6dFd6785E33f0AFd913BD8406d";
const STAKINGCONTRACT = "0xdB21cb203820e2827B37CC85C09885a484b198CB"
const apikey = "33QYH2H847QF4WQMTXTM661GGVUKW1S9GM";
const endpoint = "https://api-goerli.etherscan.io/api"
const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";
const nftpng = "https://ipfs.io/ipfs/Qmb7QrwvydDKKUu6zDPdS2JGnfxaJw2jKmuy8b8DqfLDtX/";

const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	  walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "3cf2d8833a2143b795b7796087fff369"
		}
	},
	walletlink: {
		package: WalletLink, 
		options: {
		  appName: "Net2Dev NFT Minter", 
		  infuraId: "3cf2d8833a2143b795b7796087fff369",
		  rpc: "", 
		  chainId: 4, 
		  appLogoUrl: null, 
		  darkMode: true 
		}
	  },
};

const web3Modal = new Web3Modal({
	network: "goerli",
	theme: "dark",
	cacheProvider: true,
	providerOptions 
  });


class BApp extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
		};
	}

	async componentDidMount() {
		
		await axios.get((endpoint + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${apikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })

		await axios.get((openseaapi + `?asset_contract_addresses=${NFTCONTRACT}&format=json&order_direction=asc&offset=0&limit=20`))
		.then(outputb => {
			const { assets } = outputb.data
            this.setState({
                nftdata:assets
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;

	async function connectwallet() { 
		var provider = await web3Modal.connect();
		var web3 = new Web3(provider); 
		await provider.send('eth_requestAccounts'); 
		var accounts = await web3.eth.getAccounts(); 
		account = accounts[0]; 
		document.getElementById('wallet-address').textContent = account; 
		contract = new web3.eth.Contract(ABI, NFTCONTRACT);
		vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
  }
  async function mint() {
		  var _mintAmount = Number(document.querySelector("[name=amount]").value); 
		  var mintRate = Number(await contract.methods.cost().call()); 
		  var totalAmount = mintRate * _mintAmount; 
		contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
	  } 
  
  async function stakeit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.stake([tokenids]).send({from: account});
  }
  
  async function unstakeit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.unstake([tokenids]).send({from: account});
  }
  
  async function claimit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.claim([tokenids]).send({from: account});
  }
  
  async function verify() {
	  var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
	  document.getElementById('stakedbalance').textContent = getbalance; 
  }
  
  async function enable() {
	  contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: account});
	}

  async function rewardinfo() {
	 var tokenid = Number(document.querySelector("[name=stkid]").value);
	 var rawearn = await vaultcontract.methods.earningInfo(account, ([tokenid])).call();
	 var earned =  String(rawearn).split(",")[0];
	 var earnedrwd = Web3.utils.fromWei(earned);
	 var rewards = Number(earnedrwd).toFixed(2);
	 document.getElementById('earned').textContent = rewards;
   }
  return (
    <div className="App" style={{background:'black'}}>
		<Button2 onClick={connectwallet} style={{marginBottom:"5px",marginTop:"5px",color:"#FFFFFF", marginRight:'3px'}}>Connect Wallet</Button2>
		<Button2 onClick={enable}>Enable Staking</Button2>
 <div className='container'>
<div className='row'>
  <form class="gradient col-lg-5 mt-5" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
    <h4 style={{color:"#FFFFFF"}}>Mint Portal</h4>
    <h5 style={{color:"#FFFFFF"}}>Please connect your wallet</h5>
    
    <div class="card" id='wallet-address' style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <label for="floatingInput">Wallet Address</label>
      </div>
      <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
      <label >Please select the amount of NFTs to mint.</label>
      <Button2 onClick={mint}>Buy/Mint!</Button2>
      </div>
    <label style={{color:"#FFFFFF"}}>Price 0.05 ETH each mint.</label>
	<h5 style={{color:"white", textShadow:"1px 1px 3px #000000"}}> Tokens Minted so far= {balance.result}/1000</h5>
  </form>
  <form class="gradient col-lg-3 mt-5 mr-3" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
    <h4 style={{color:"#FFFFFF"}}>Staking Vault</h4>
	<h5 style={{color:"#FFFFFF"}}>Verify Amount Staked</h5>
	<Button2 onClick={verify}>Verify</Button2>
	<div id='stakedbalance' style={{marginTop:"5px",color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000", fontSize:"35px" }}>
      <label for="floatingInput">NFT Balance</label>
      </div>
  </form>
  <form class="gradient col-lg-3 mt-5 mr-3" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
  <h5 style={{color:"#FFFFFF"}}> Staking Rewards</h5>
	<Button2 onClick={rewardinfo}>Earned N2D Rewards</Button2>
	<div id='earned' style={{color: "#39FF14",marginTop:"5px", fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000"}}><p style={{fontSize:"20px"}}>Earned Tokens</p></div>
	<input name="stkid" style={{color: "#39FF14",fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000",width:'50px',backgroundColor:'#00000000'}}/>
	<label className="col-4" style={{color:'white'}}>NFT ID</label>
	<div className='col-12 mt-2'>
      <div style={{color:'white'}}>Claim Rewards</div>
      <Button2 className="mb-2" onClick={claimit}>Claim</Button2>
    </div>
  </form>
  <div className="row items mt-3">
  <div className="ml-3 mr-3" style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
  {nftdata.map((assets, i )=> {
	    	async function stakeit() {
			vaultcontract.methods.stake([assets.token_id]).send({from: account});
		  	}
		  	async function unstakeit() {
			vaultcontract.methods.unstake([assets.token_id]).send({from: account});
		  	}
	  return (
			<div className="card mt-3" key={i} >
            		<div className="image-over">
					<img className="card-img-top"  src={nftpng + assets.token_id +'.png'} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">Net2Dev Collection NFT #{assets.token_id}</h5>
							<h5 className="mb-0 mt-2">Location Status<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{assets.owner.address}</p></h5>
                    	<div className="card-bottom d-flex justify-content-between">
						<input key={i} type="hidden" id='stakeid' value={assets.token_id} />
							<Button2 className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={stakeit}>Stake it</Button2>
							<Button2 className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={unstakeit}>Unstake it</Button2>
							</div>
					</div>
                </div>
            </div>
        );
    })}
	</div>
</div>
  </div>
	</div>
 	</div>
  			);
	};
}

export default BApp;