import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { UltraMinter } from "./output/sample_UltraMinter";
import { prepareTactDeployment } from "@tact-lang/deployer";
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    // Parameters
    let testnet = false;
    let packageName = "sample_UltraMinter.pkg";
    let owner = Address.parse(process.env.TON_ADDRESS || "");
    let init = await UltraMinter.init(owner);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
