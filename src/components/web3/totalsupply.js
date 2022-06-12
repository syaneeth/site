import React, { useEffect } from 'react'
import Web3 from 'web3'
import abi from './abi.json'
import { useState } from 'react'

function Totalsupply() {

    const [supply, setSupply] = useState('')
    
    const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/60d373bd57dd44f882f05d4997de8b9e'))
    const contractAddress = "0x89e0A37218333b6dFd6785E33f0AFd913BD8406d"
    const contract = new web3.eth.Contract(abi, contractAddress)

    useEffect(() => {
        contract.methods.totalSupply().call().then(result => {
            console.log(result)
            setSupply(result)
        })
    })

  return (
    <div>{supply} / 1000</div>
  )
}


export default Totalsupply