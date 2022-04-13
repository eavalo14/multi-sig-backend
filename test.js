import { blockfrostApiKey, privateKey, policyLockTime } from './config.js'
import { NamiWalletApi } from './nami-node-js/nami.js';
import * as fs from 'fs'

import express from 'express'
import bodyParser from 'body-parser'
import axios from "axios";
// var NamiWalletApi = require('./nami').NamiWalletApi


const policyId2use = '83732ff37818e7e520592fcd3e5257e429307d40a9f5437240e926de'
const assetnameHex = '53696e646572536b756c6c7a33373539'
const asset =policyId2use + assetnameHex
const config = {
    method: 'get',
    
    // main net adams project
    url: 'https://cardano-mainnet.blockfrost.io/api/v0/assets/' + asset + '/addresses',
    // testnet address
    // 
    // url: 'https://api-testnet.nft-maker.io/UploadNft/a997ed36a219492e8c1a17daf373ba75/5806',
    headers: {
        project_id:'mainnetDLGWFVceMET9Pok1OwwioXT6iiHpO1iJ',
        accept: 'text/plain',
        'Content-Type': 'application/json'
    },
    // params: {
    //     count: 100,
    //     page : 5
    // }
    // data: data,
  }


axios(config)
    .then(function (response) {
    //   elapsedTimeReport(assetNumber, err = false);
    //   console.log(response.data)
      let data = response.data
      console.log(data)
    //   console.log(data[0].asset.to_str())
    //   var assetnameSplit = data[0].asset.split("58a8abbedbb77785b8163e14d2d32783f4f66b77dea08c6ef30b279a")[1]
    //   console.log(assetnameSplit)
    })
    .catch(function (error) {
    //   console.log(chalk.yellow.bold(`Whoops! Error in ${assetNumber} ▶️ ${error} ............`));
    //   elapsedTimeReport(assetNumber, err = true);
        console.log(error)
    });
// const app = express();

// var nami =  new NamiWalletApi( blockfrostApiKey ) 
// nami.setPrivateKey(privateKey)
// var metadata = {}


// // create application/json parser
// var jsonParser = bodyParser.json()

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// // app.get("/", function(req, res) {
// //   res.send(Quote.getQuote());
// // });

// app.post("/", jsonParser,function(req,res) {

//     // get state variables of web app
//     var keys = Object.keys(req.body)
//     // create wallet and send confirmation to user
//     if (keys.includes('state')){

//         const state = req.body.state 
//         console.log("Setting Private Key...\n")
//         // read in policy script
//         var policyScript = JSON.parse(fs.readFileSync("policy.json", "utf8"))

//         // stub out metadata
//         var policyId = policyScript["id"]
//         var NFTName = "Test Project"
//         metadata = {
//             "721":
//             {
//                 [policyId]: // policyId
//                 {"MyNFT": // NFTName
//                     {
//                         "name":"MyNFT",
//                         "description":"This is a test NFT",
//                         "image":"ipfs://QmUb8fW7qm1zCLhiKLcFH9yTCZ3hpsuKdkTgKmC8iFhxV8"
//                     }
//                 }
//             }
//         }
//         console.log(metadata)


//         // hash meta data
//         const metaDataHash = nami.hashMetadata(metadata)

//         // send hashed metadata to front end
//         app.get("/", function(req, res) {
//             res.send({"hashedMeta": metaDataHash });
//         });
//     }
//     else if (keys.includes('witnessBuyer')){
//         const witnessBuyer = req.body.witnessBuyer
//         const transaction = req.body.transaction

//         // console.log(nami)
//         // console.log(metadata)


    
//         async function submitTransaction(){

//             let witnessMinting =  nami.signTx(transaction)
//             let witnesses = [witnessBuyer, witnessMinting]

//             let txHash = await nami.submitTx({
//                 transactionRaw: transaction,
//                 witnesses: witnesses, 
//                 networkId : 0, 
//                 metadata: metadata
//             }) // add real metadata)
//             console.log(txHash)
//         }

//         submitTransaction()

//         // //     console.log(transaction)
//         // let witnessMinting =  nami.signTx(transaction)
//         //     // let txHash = await nami.submitTx( {transactionRaw: transaction,
//         //     //     witnesses: witnesses, 
//         //     //     networkId : networkId, 
//         //     //     metadata: metadata
//         //     // })
//         //     //     console.log(txHash)
//         }

//     // }

// })


// let port = process.env.PORT;

// if(port == null || port == "") {
//     port = 5001;
// }

// app.listen(port, function() {
// console.log("Server started successfully");
// });




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