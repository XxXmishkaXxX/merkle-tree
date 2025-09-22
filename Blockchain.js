/**
 * Seminar 2.1 Blockchain primitive
 */

const { sha256 } = require('ethereum-cryptography/sha256');
const { utf8ToBytes } = require('ethereum-cryptography/utils');

class Block {
    constructor(data) {
        this.data = data;
        this.previousHash = null;
    }

    toHash() {
        const hashBytes = utf8ToBytes(this.data + this.previousHash);
        return sha256(hashBytes);
    }
}

class Blockchain {
    constructor() {
        const genesis = new Block("Genesis Block");
        genesis.previousHash = "0";
        this.chain = [genesis];
    }

    addBlock(block) {
        const previousBlock = this.chain[this.chain.length - 1];
        block.previousHash = Buffer.from(previousBlock.toHash()).toString("hex");
        this.chain.push(block);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const prev = this.chain[i - 1];

            const prevHash = Buffer.from(prev.toHash()).toString("hex");
            if (current.previousHash !== prevHash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = { Block, Blockchain };
