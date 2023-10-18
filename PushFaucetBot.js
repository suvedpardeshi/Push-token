require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');[]
const Web3 = require('web3');
const Bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const web3 = new Web3(process.env.ETH_RPC_GOERLI);

const TRANSFER_ABI = [{
  "inputs": [
  {"name":"abc","type":"address"},
  {"name":"rawAmount","type":"uint256"}
  ],

  "name":"transfer",
  "outputs" : [
    {"name":"","type":"bool"}
  ,
],
  "type":"function"
}];

const pushContract = new web3.eth.Contract(TRANSFER_ABI,process.env.PUSH_TOKEN_CONTRACT_ADDRESS);

console.log(process.env.PRIVATE_KEY);
const privateKey = Web3.utils.toHex(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(privateKey);


Bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    const startMessage = `Welcome to the Push Faucet Bot! I'm here to help you receive $PUSH test tokens for the Goerli testnet.
    
    How it works:

    1. Provide me with your Goerli testnet address, and I'll send you ${process.env.FAUCET_AMOUNT} $PUSH tokens.
    2. You'll also receive a transaction link to check the status of the transaction on Goerli Etherscan
    3. You can use these tokens to experience the power of Push Protocol.
    
    You can use the following commands:

    - /start: Begin the conversation with the bot.
    - /receivetokens: Get $PUSH test tokens.
    - /help: Display the help message with all the commands.
    - /about: Learn more about this project.
    - /community: Join our community and get involved.
    `;
    Bot.sendMessage(chatId, startMessage);
    
  }

  else if(messageText === '/receivetokens'){
    
    Bot.sendMessage(chatId, ` Please Enter your Goerli testnet Address to receive ${process.env.FAUCET_AMOUNT} $PUSH tokens.`)
    messageText = msg.text;

    try {
        sendPushToken(messageText,chatId);
        
    } catch (error) {
        console.log(error);
        Bot.sendMessage(chatId, 'Sorry, Something went wrong, Come again after some time');
  
      }
  }

  else if(messageText === '/help') {
    const helpMessage = `

    Provide me with your Goerli testnet address, and I'll send you ${process.env.FAUCET_AMOUNT} $PUSH tokens.
    
    Here are the available commands for you:
    - /start: Begin the conversation with the bot.
    - /receivetokens: Get $PUSH test tokens by providing the goerli testnet address
    - /help: Display this help message.
    - /about: Learn more about this project.
    - /community: Join our community and get involved.
    `;

    Bot.sendMessage(chatId, helpMessage)
  }

  else if(messageText === '/about') {
    const aboutMessage = `
    This bot is designed to distribute $PUSH test tokens for the Goerli testnet.
    You can use these tokens to experience the power of Push Protocol.
    You provide your goerli testnet address and I'll send you ${process.env.FAUCET_AMOUNT} $PUSH tokens.
    Also I'll provide you the Etherscan transaction link so that you can check the status of this transaction.
    `;

    Bot.sendMessage(chatId, aboutMessage)
  }

  else if(messageText === '/community') {
    const communityMessage = `
    Join our community and get involved with the Push Protocol(The Communication Protocol of Web3)
    
    - [Telegram Group](https://t.me/epnsproject)
    - [Discord Server](https://discord.gg/pushprotocol)
    - [Website](https://push.org/)
    - [Twitter](https://twitter.com/pushprotocol)
    `;

    Bot.sendMessage(chatId, communityMessage)
  }
  
  else if(web3.utils.isAddress(messageText)){
    try {
      sendPushToken(messageText,chatId);
      
    } catch (error) {
      console.log(error);
      Bot.sendMessage(chatId, 'Sorry, Something went wrong, Come again after some time');

    }

  }
  
  else {
    Bot.sendMessage(chatId, "Sorry, I don't understand this, Please provide me your Goerli testnet address and I will send you "+process.env.FAUCET_AMOUNT+" $PUSH tokens .");
  }
});

function sendPushToken(toAddress,chatId){
  let data = pushContract.methods.transfer(
    toAddress,
    Web3.utils.toHex((Web3.utils.toWei(process.env.FAUCET_AMOUNT.toString(), 'ether')))).encodeABI();

let txObj = {
  from: web3.eth.accounts.wallet[0].address,
  to: process.env.PUSH_TOKEN_CONTRACT_ADDRESS,
  data: data,
  value: 0,
  gasLimit: 50000,
}
  
web3.eth.sendTransaction(txObj)
.on('transactionHash',function(hash){
  Bot.sendMessage(chatId, "Hurray! You got "+process.env.FAUCET_AMOUNT+" PUSH tokens. You can check the transaction here: https://goerli.etherscan.io/tx/" + hash);
})

}