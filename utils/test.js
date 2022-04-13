import { blockfrostApiKey, privateKey, policyLockTime } from '../config.js'
import { NamiWalletApi } from '../nami-node-js/nami.js';
import * as fs from 'fs'


// var NamiWalletApi = require('./nami').NamiWalletApi
var nami =  new NamiWalletApi( blockfrostApiKey )  

// console.log(nami.createNewBech32PrivateKey())

var skey = "6b7ec28038c9a2862761c5fc9352a63cfff7cc02060266a0b12e62553f2710dd"
nami.setPrivateKey(privateKey)

nami.getAccountKey(skey)