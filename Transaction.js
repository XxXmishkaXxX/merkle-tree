/**
 * Seminar 2.2 Transaction output
 */
const { sha256 } = require('ethereum-cryptography/sha256');
const { utf8ToBytes } = require('ethereum-cryptography/utils');

class Transaction {
    constructor(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.spent = false;
        this.hash = this.computeHash();
    }

    computeHash() {
        const data = this.from + this.to + this.value;
        return sha256(utf8ToBytes(data));
    }

    spend() {
        if (this.spent) {
            throw new Error('Already spended!');
        }
        this.spent = true;
    }
}

module.exports = { Transaction };
