const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    time,
} = require('@openzeppelin/test-helpers');
const {expect} = require('chai');
    
const Token = artifacts.require("Token");
const Token2 = artifacts.require("Token2");

module.exports = async (deployer, network, accounts) => {
    deployer = accounts[0];

    const tokenName = "riomrz Token"
    const tokenSymbol = "RMZ";
    const totSupply = 1000000;

    if (network == "development") {
        let IS_UPGRADE = false;
        // let TOKEN_ADDRESS = constants.ZERO_ADDRESS;
        let TOKEN_ADDRESS = "0xe997b749cA4821E67488D6625D8b8302E37bF837"

        if (IS_UPGRADE) {
            console.log('Token is being upgraded...');
            const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, { from: deployer });
            console.log(`New Token deployed @: ${tokenInstance.address}`);
            console.log('Token owner: ', await tokenInstance.owner());
        } else {
            console.log('Token is being deployed...');
            let tokenInstance = await deployProxy(Token, [tokenName, tokenSymbol, totSupply], {from: deployer});
            console.log('Token deployed @: ', tokenInstance.address);
            console.log('Token owner: ', await tokenInstance.owner());
        }
    } else if (network == "dashboard") {
        let IS_UPGRADE = true;
        // let TOKEN_ADDRESS = constants.ZERO_ADDRESS;
        let TOKEN_ADDRESS = "0xe997b749cA4821E67488D6625D8b8302E37bF837";

        if (IS_UPGRADE) {
            console.log('Token is being upgraded...');
            const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, { from: deployer });
            console.log('Token deployed @: ', tokenInstance.address);
            console.log('Token owner: ', await tokenInstance.owner());
        } else {
            console.log("Token is being deployed...");
            let tokenInstance = await deployProxy(Token, [tokenName, tokenSymbol, totSupply], { from: deployer })
            console.log('Token deployed @: ', tokenInstance.address);
            console.log('Token owner: ', await tokenInstance.owner());
        }
    }
}

