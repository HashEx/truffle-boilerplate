pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/MintableToken.sol";


contract ExampleToken is MintableToken {

	string public name = "ExampleToken";
	string public symbol = "EXT";
	uint8 public decimals = 3;

	uint256 public constant INITIAL_SUPPLY = 1000;

	/**
	* @dev Token constructor that sets intial values and gives initial supply to msg.sender
	*/
	function ExampleToken() public {
		totalSupply = INITIAL_SUPPLY;
		balances[msg.sender] = INITIAL_SUPPLY;
	}

}