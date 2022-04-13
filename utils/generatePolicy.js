import { blockfrostApiKey, privateKey, policyLockTime } from '../config.js'
import { NamiWalletApi } from '../nami-node-js/nami.js';
import * as fs from 'fs'


// var NamiWalletApi = require('./nami').NamiWalletApi
var nami =  new NamiWalletApi( blockfrostApiKey )  
console.log("Setting Private Key...\n")
nami.setPrivateKey(privateKey)


// set policy lock
let networkId = parseInt(Object.keys(blockfrostApiKey)[0])
const expirationTime = new Date();
expirationTime.setTime(expirationTime.getTime() + (policyLockTime * 60 * 60 * 1000))


// var addr = "addr_test1vrm9w3tuctjxfkx7t55s4qsjau6lfxzx4w3cuvhtss9nadcc4jugv"
// var ttl = 70997230
// console.log(networkId)
// let policy1 = await nami.createLockingPolicyScript1("addr_test1vrm9w3tuctjxfkx7t55s4qsjau6lfxzx4w3cuvhtss9nadcc4jugv", networkId, ttl)
let policy = await nami.createLockingPolicyScript(networkId, expirationTime)


console.log("Writing Policy script to file")

var jsonData = JSON.stringify(policy)

fs.writeFile( 'policy.json', jsonData, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
});