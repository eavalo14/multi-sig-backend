
import { NamiWalletApi } from '../nami-node-js/nami.js';
import { blockfrostApiKey, privateKey, policyLockTime } from '../config.js'
import * as fs from 'fs'


// import blockfrostApiKey from '../../frontend/config.js'; 
var nami =  new NamiWalletApi( blockfrostApiKey )  

var hexAddr = "d53436e6be4ee8d9c4dce7866a166cf26160f047dd4540437f170742"
var slot = 68931743
let policy = await nami.createLockingPolicyScriptHexKey(hexAddr, slot)

console.log(policy)


console.log("Writing Policy script to file")

var jsonData = JSON.stringify(policy)

fs.writeFile( 'policy.json', jsonData, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
});

//58a8abbedbb77785b8163e14d2d32783f4f66b77dea08c6ef30b279a