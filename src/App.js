// import logo from './logo.svg';
import './App.css';
import { useEffect , useState } from "react";

// import Web3 from 'web3';

function App() {


  const [accounts, setAccount] = useState([]);
  const [isConnected, setIsConnectd] = useState(false)

  useEffect(() => {
    if(!accounts[0]){
      setIsConnectd(true)
    }
    else{
      setIsConnectd(false)
    }
  }, [accounts]);

  const getMetamaskAccount = async () => {
    try{
      const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(getAccounts)
      return('get metamask account')
    }
    catch(err){
      console.error(err)
      return err
    }
  }

  // handle account switching in metamas
  if(accounts[0]){
    window.ethereum.on('accountsChanged', function (accounts) {
      setAccount(accounts)
    });
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>accounts : {accounts[0]}</div>
      {isConnected && (
         <button onClick={() => getMetamaskAccount()}>Connect To Metamask</button>
      )}
    </div>
  );
}

export default App;
