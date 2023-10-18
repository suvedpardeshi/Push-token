# Push Faucet Bot

The Push Faucet Bot is a Telegram bot designed to distribute $PUSH test tokens for the Goerli testnet. This bot allows users to experience the power of Push Protocol by providing them with test tokens, which they can use on the Goerli testnet.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [/start](#start)
  - [/receivetokens](#receivetokens)
  - [/help](#help)
  - [/about](#about)
  - [/community](#community)
- [Functionality](#functionality)
  - [Interaction Flow](#interaction-flow)
  - [Token Distribution Logic](#token-distribution-logic)


## Getting Started

### Prerequisites

Before using the Push Faucet Bot, ensure you have the following prerequisites:

- Node.js and npm installed on your system.
- A Telegram Bot Token obtained by creating a bot on Telegram with the BotFather.
- A private key (in the `.env` file) for an Ethereum account.
- An Ethereum RPC URL for the Goerli testnet.
- The address of the Push token contract on the Goerli testnet.
- The amount of $PUSH tokens to distribute.

### Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Shivam-mishra2/push-faucet-bot.git
   cd push-faucet-bot
   ```
2. Install the required npm packages:
   ```
   npm install
   ```
3. Create a .env file in the project's root directory and add the necessary environment variables:
   ```
   PRIVATE_KEY="Your Ethereum Private Key"
   ETH_RPC_GOERLI="Your Ethereum RPC URL for the Goerli testnet"
   BOT_TOKEN="Your Telegram Bot Token"
   PUSH_TOKEN_CONTRACT_ADDRESS="Address of the Push Token Contract on Goerli"
   FAUCET_AMOUNT="Amount of $PUSH to Distribute"
   ```

## Usage
The Push Faucet Bot is designed to distribute $PUSH test tokens for the Goerli testnet. Users can interact with the bot to receive these test tokens. Below are the available commands and their usage:

## Commands


### /start
The /start command initiates a conversation with the bot. It provides users with an overview of the bot's functionality and how to get started.


### /receivetokens
The /receivetokens command prompts users to provide their Goerli testnet address. The bot will then send the specified amount of $PUSH tokens to the provided address. Users will also receive a transaction link to check the status of the transaction on Goerli Etherscan.


### /help
The /help command displays a message explaining the available commands and how to use the bot.


### /about
The /about command provides information about the Push Faucet Bot and its purpose. It explains how users can receive $PUSH test tokens and use them on the Goerli testnet.


### /community
The /community command encourages users to join the Push Protocol community. It provides links to the community's Telegram group, Discord server, website, and Twitter account.


## Functionality

### Interaction Flow
The interaction flow of the Push Faucet Bot is as follows:

   1. A user initiates a conversation with the bot using the /start command.
   2. The bot provides an overview of its functionality and instructions on how to receive $PUSH test tokens.
   3. Users can request tokens using the /receivetokens command by providing their Goerli testnet address.
   4. The bot sends the specified amount of $PUSH tokens to the provided address.
   5. Users receive a transaction link to check the status of the transaction on Goerli Etherscan.

### Token Distribution Logic
The bot uses an Ethereum wallet and the Push token contract to send $PUSH tokens. The token distribution logic involves creating and sending a transaction to the Push token contract's transfer function. This function transfers the specified amount of $PUSH tokens to the provided Goerli testnet address.

## Deployment
To deploy the Push Faucet Bot, host it on a server or cloud platform of your choice (e.g., Heroku, AWS, DigitalOcean). Ensure that the environment variables are correctly set on your hosting environment.

This README provides users with comprehensive information on how to set up, use, and interact with the Push Faucet Bot.
