const TempusToken = artifacts.require('./ExampleToken')

import EVMThrow from './helpers/EVMThrow'
const BigNumber = web3.BigNumber
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('ExampleToken', accounts => {

	beforeEach(async function() {
		this.owner = accounts[0]
		this.token = await TempusToken.new()
		// await this.token.mint(this.owner, 1000000	)
	})

	it('total supply should be set', async function() {
		const totalSupply = await this.token.totalSupply();
		assert.equal(1000, totalSupply.valueOf(), "correct total supply should be set")
	})

	it('should be minted only by admin', async function() {
		const admin = accounts[0]
		await this.token.mint(admin, 1000, {from: accounts[1]}).should.be.rejected

		await this.token.mint(admin, 1000, {from: admin})
		
		const balance = await this.token.balanceOf.call(admin)
		assert.equal(balance.valueOf(), 2000, "tokens should be minted to specified address")
	})

	it('should change total supply after mint', async function() {
		let totalTokens = await this.token.totalSupply()
		await this.token.mint(this.owner, 1000)
		let newTotalTokens = await this.token.totalSupply()
		assert.equal(newTotalTokens.valueOf(), totalTokens.add(1000), 
			"mint should properly increase token total supply")

	})

})