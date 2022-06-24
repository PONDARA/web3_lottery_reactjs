import Web3 from 'web3';
import {abi} from './abi/abi'

const contract_addrress = '0xD706F94546CcD9CE366C6A520ba6F857E109f631'

const enterTheLotteryGame = async(accounts) => {
    try{
        // // infura url
        // const url = 'https://rinkeby.infura.io/v3/34e4897b55e344b79a408be52ff87712'

        // // local url
        // const url = 'http://127.0.0.1:9545/'

        // browser metamask
        const url = window.ethereum

        const web3 = new Web3(url)

        const contract = new web3.eth.Contract(abi,contract_addrress);

        const entered = await contract.methods.enter().send({from:accounts[0],value:10000000000000000})

        console.log(entered)

        return (entered)
        // const players = await contract.methods.getPlayers().call()

        // console.log(players)
        // return (players)
        
    }
    catch(err){
        console.error(err)
        return (err)
    }
}

const getPlayers = async() => {
    try{
        // // infura url
        // const url = 'https://rinkeby.infura.io/v3/34e4897b55e344b79a408be52ff87712'

        // // local url
        const url = 'http://127.0.0.1:9545/'
        const web3 = new Web3(url)

        const contract = new web3.eth.Contract(abi,contract_addrress);

        const players = await contract.methods.getPlayers().call()

        console.log(players)
        return (players)
        
    }
    catch(err){
        console.error(err)
        return (err)
    }
}

const pickWinner = async(accounts) => {
    try{
        // // infura url
        // const url = 'https://rinkeby.infura.io/v3/34e4897b55e344b79a408be52ff87712'

        // // local url
        const url = 'http://127.0.0.1:9545/'
        const web3 = new Web3(url)

        const contract = new web3.eth.Contract(abi,contract_addrress);

        const winner = await contract.methods.pickWinner().send({from:accounts[0]})

        console.log(winner)
        return (winner)
        
    }
    catch(err){
        console.error(err)
        return (err)
    }
}

export {
    getPlayers,
    enterTheLotteryGame,
    pickWinner
}