// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "./TokenStorage.sol";

contract Token is ERC20Upgradeable, OwnableUpgradeable {
    uint8 private VERSION;

    function initialize(string memory _tokenName,
    string memory _tokenSymbol,
    uint256 _supply) public initializer {
        __ERC20_init_unchained(_tokenName, _tokenSymbol);
        __Ownable_init_unchained();

        _mint(msg.sender, _supply*(1e18));
        VERSION = 1;
    }

    function getContractVersion() external view returns(uint8) {
        return VERSION;
    }    
}
