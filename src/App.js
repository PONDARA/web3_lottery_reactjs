// import logo from './logo.svg';
import './App.css';
import { useEffect , useState } from "react";
import { getPlayers,enterTheLotteryGame,pickWinner } from './function';


import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import Web3 from 'web3';

function App() {


  const [accounts, setAccount] = useState([]);
  const [isConnected, setIsConnectd] = useState(false)
  const [imageUrl, setImageUrl] = useState('https://mui.com/static/images/cards/contemplative-reptile.jpg')

  //  players that have joined the game
  let players = []

  // useEffect for checking is the user is connected with metamask
  useEffect(() => {
    if(!accounts[0]){
      setIsConnectd(true)
      setImageUrl('https://mui.com/static/images/cards/contemplative-reptile.jpg')
    }
    else{
      setIsConnectd(false)
      setImageUrl('https://st.depositphotos.com/2819061/4702/i/600/depositphotos_47028917-stock-photo-lottery.jpg')
      const fetchPlayers = async () => {
        players = await getPlayers();
        console.log(players)
      }
    
      // call the function
      fetchPlayers()
    }
  }, [accounts]);

  // connet and get account form metamask
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
      <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={imageUrl}
              alt="green iguana"
            />
            {isConnected ? 
            (
              <div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  You have to connect your account first
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" size="small" onClick={() => getMetamaskAccount()}>Connect</Button>
              </CardActions>
            </div>
            )
            :
            (
              <div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Account : {accounts[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To enter this game you have to pay 0.01
                  <br></br>
                  Total player : {players.length}
                  <br></br>
                  Total prize : {players.length * 0.01}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" size="small" onClick={() => enterTheLotteryGame(accounts)}>Enter</Button>
                <Button color="primary" size="small" onClick={() => pickWinner(accounts)}>Pick the winner</Button>
                <Button color="primary" size="small" onClick={() => getPlayers()}>Get the player</Button>
              </CardActions>
            </div>
            )
            }
          </Card>
        </div>
    </div>
  );
}

export default App;
