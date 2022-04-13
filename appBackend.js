import { blockfrostApiKey, privateKey, policyLockTime } from './config.js'
import { NamiWalletApi } from './nami-node-js/nami.js';
import * as fs from 'fs'

import express from 'express'
import bodyParser from 'body-parser'
import axios from "axios";
// var NamiWalletApi = require('./nami').NamiWalletApi


const app = express();

var nami =  new NamiWalletApi( blockfrostApiKey ) 
nami.setPrivateKey(privateKey)
var metadata = {}


// create application/json parser
var jsonParser = bodyParser.json()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post("/", jsonParser,function(req,res) {
    // get state variables of web app
    var keys = Object.keys(req.body)
    // create wallet and send confirmation to user
    if (keys.includes('state')){

        const state = req.body.state 
        // read in policy script
        var policyScript = JSON.parse(fs.readFileSync("policy.json", "utf8"))

        // stub out metadata
        var policyId = policyScript["id"]
        var NFTName = "Test Project"
        metadata = {
            "721":
            {
                [policyId]: // policyId
                {"Test1": // NFTName
                    {
                        "name":"Test1",
                        "description":"This is a test NFT",
                        "hello": "you are awesome",
                        "image":"ipfs://QmP6Cj35VRv1air5CCkjVkXXpYAMbWRu24UxihiRCbYHoe"
                    }
                }
            }
        }

        // hash meta data
        const metaDataHash = nami.hashMetadata(metadata)

        // send hashed metadata to front end
        app.get("/", function(req, res) {
            res.send({"hashedMeta": metaDataHash });
        });
    }
    else if (keys.includes('witnessBuyer')){
        const witnessBuyer = req.body.witnessBuyer
        const transaction = req.body.transaction
    
        async function submitTransaction(){

            //console.log("Signing Transaction...")
            let witnessMinting = nami.signTx(transaction,"6b7ec28038c9a2862761c5fc9352a63cfff7cc02060266a0b12e62553f2710dd")
            let witnesses = [witnessBuyer, witnessMinting]
            //console.log("Transaction signed!")
            
            //console.log("Submitting transaction...")
            let txHash = await nami.submitTx({
                transactionRaw: transaction,
                witnesses: witnesses, 
                networkId : 0, 
                metadata: metadata
            }) 
        }

        submitTransaction()

        }

})


let port = process.env.PORT;

if(port == null || port == "") {
    port = 5001;
}

app.listen(port, function() {
console.log("Server started successfully");
});




/*
// var NamiWalletApi = require('./nami').NamiWalletApi
var nami =  new NamiWalletApi( blockfrostApiKey )  
console.log("Setting Private Key...\n")
nami.setPrivateKey(privateKey)

var policyScript = JSON.parse(fs.readFileSync("policy.json", "utf8"))
// console.log(policyScript["id"])

// stub out metadata
var policyId = policyScript["id"]
var NFTName = "Test Project"
const metadata = {
    '721':  // 721 stands for NFTs
    {
        [policyId]: {
            [NFTName]: {
                "name": "", 
                "image": "", 
                "description": "", 
                "etc...": "",
            }
        }
    }
}

// hash meta data
const metaDataHash = nami.hashMetadata(metadata)
console.log(metadata)
console.log(metaDataHash)

// // get payment address
// let paymentAddress = await nami.getAddress() // nami wallet address
// console.log(paymentAddress)

*/