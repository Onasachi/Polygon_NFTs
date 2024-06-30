// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";

contract JenetToken is ERC721A {
    uint8 public maxSupply = 5;

    constructor() ERC721A("LIONS", "LIONS") {}

    function safeMint(uint8 _quantity) external payable {
        _safeMint(msg.sender, _quantity);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://Qmajj8UE8ZaojdRbpohEmpH5tb7VQpefCqQY2vueA2pFGe/";
    }

    function promptDescription() external pure returns (string memory) {
        return "i need an image that lions rule the world";
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return super.balanceOf(owner);
    }
}