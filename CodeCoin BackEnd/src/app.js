import express from "express";
import bodyParser from "body-parser";
import rp from 'request-promise';

import cors from "./config/cors";

import { Blockchain, Transaction, Block, Account } from "./blockchain";

const port = process.env.PORT || 5000;
const blockchain = express();
const authMiddleware = require('../src/middleware/auth')

blockchain.use(bodyParser.json());
blockchain.use(bodyParser.urlencoded({ extended: true }));
blockchain.use(cors);

let codeCoin;

async function findLongestBlockchain() {
    let promiseArray = [];
    let newChain = [];

    codeCoin.nodes.map(node => {
        let promise = rp.get({
            uri: `http://localhost:${node}/blockchain/length`,
            json: true
        })

        promiseArray.push(promise);
    })

    let nodes = await Promise.all(promiseArray);
    
    let longestBlockchainNode = { chainLength: 0 };
    
    // Находит ноду с наиболее длиной цепочкой блокчейн
    nodes.map(node => {
        if (longestBlockchainNode.chainLength < node.chainLength) longestBlockchainNode = node;
    });

    let longestChain = await rp.get({
        uri: `http://localhost:${+longestBlockchainNode.port}/blockchain`,
        json: true
    });

    codeCoin.updateBlockchain(longestChain.chain);
}

/* --------------- */
/* REST API Routes */
/* --------------- */

/**
 * Добавить новую транзакцию в блокчейн.
 * @param {string} fromAddress 
 * @param {string} toAddress
 * @param {int} amount
 */
const addTransaction = (req, res) => {
  codeCoin.createTransaction(
      new Transaction(req.body.fromAddress, req.body.toAddress, req.body.amount)
  );

  res.send("Транзакция добавлена в блок");
};

const createAccount = (req, res) => {
    res.send(codeCoin.createAccount(req.body.login, req.body.password));
};

/**
 * Смайнить существующие транзакции и добавить в новый блок получателя вознаграждения.
 * @param {string} rewardAddress
 */
const mine = async (req, res) => {
    codeCoin.minePendingTransactions(req.body.rewardAddress);

    // Уведомление других нод о смайненом блоке
    let promiseArray = [];

    codeCoin.nodes.map(node => {
        let promise = rp.get({
            uri: `http://localhost:${node}/events/blockchain/update`,
            json: true
        });

        promiseArray.push(promise);
    })

    await Promise.all(promiseArray);

    res.send("Майнинг завершен. Награда зачислена");
};

const printBlockchain = (req, res) => {
  const stringifiedChain = JSON.stringify(codeCoin.chain);
  res.send(stringifiedChain);
};

/**
 * Регистрация новой ноды.
 * @param {int} port Порт для старта новой ноды.
 */
const registerNode = (req, res) => {
  codeCoin.registerNode(req.body.port);
  res.send("Нода добавлена");
};

// Если длина блокчейна больше 1 => валидная
const lengthBlockchain = (req, res) => {
    res.json({chainLength: codeCoin.chain.length, port});
}

const retrieveBlockchain = (req, res) => {
    res.json({chain: codeCoin.chain});
}

const retrieveNodes = (req, res) => {
    res.json({nodes: codeCoin.retrieveNodes()});
}

const updateBlockchain = (req, res) => {
    findLongestBlockchain();

    res.json({message: "Успех!"});
}

const getBalance = (req, res) => {
    res.json({ balance: codeCoin.getBalanceOfAddress(req.params.address) })
}

const getAuthorized = (req, res) => {
    res.send(codeCoin.getAuthorized(req.body.login, req.body.password))
};

const checkDeal = (req, res) => {
    res.send(codeCoin.checkDeal(req.body.creator, req.body.hash))
};

const createDeal = (req, res) => {
    codeCoin.createDeal(req.body.fromAddress, req.body.hash)
    res.json({message: "Успех!"});
}

blockchain.get("/blockchain", retrieveBlockchain);
blockchain.get("/blockchain/print", printBlockchain);
blockchain.get("/blockchain/length", lengthBlockchain);
blockchain.get("/balances/:address", getBalance);
blockchain.get("/events/blockchain/update", updateBlockchain);
blockchain.post("/transactions", addTransaction);
blockchain.post("/mine", mine);
blockchain.post("/registration", createAccount);
blockchain.post("/auth", getAuthorized);
blockchain.post('/createDeal', authMiddleware, createDeal);
blockchain.post('/checkDeal', checkDeal)
blockchain.route("/nodes")
    .post(registerNode)
    .get(retrieveNodes);

/* --------- */
/* Serve API */
/* --------- */
const instance = blockchain.listen(port, () => {
    codeCoin = new Blockchain(port);
    
    console.log(`Нода стартована на порту: ${port}!`);
});
