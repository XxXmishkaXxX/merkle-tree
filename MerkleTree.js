/**
 * Seminar 2.4 Simple Merkle Tree
 */

function concatHashes(a, b) {
    return `Hash(${a} + ${b})`;
} 

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves;
    }

    getConcatLeaves(leaves){
        if (leaves.length === 1) {
            return leaves[0];
        }
        const concatLeaves = [];
        for (let i = 0; i < leaves.length; i += 2) {
            const l1 = leaves[i];
            const l2 = leaves[i + 1];
            if (l2) {
                concatLeaves.push(concatHashes(l1, l2));
            } else {
                concatLeaves.push(l1);
            }
        }
        return this.getConcatLeaves(concatLeaves);
    }

    getProof(index, layer = this.leaves, proof = []) {
        if (layer.length === 1) return proof;
        const newLayer = [];
        for (let i = 0; i < layer.length; i += 2) {
            let left = layer[i];
            let right = layer[i + 1];
            if (!right) {
                newLayer.push(left);
            } else {
                newLayer.push(concatHashes(left, right));
                if (i === index || (i + 1) === index) {
                    let leftLeaf = index % 2 === 0;
                    proof.push({
                        hash: leftLeaf ? right : left,
                        left: !leftLeaf
                    });
                }
            }
        }
        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }
}

function verifyProof(proof, nodeHash, rootHash) {
    let hash = nodeHash;
    for (const p of proof) {
        if (p.left) {
            hash = concatHashes(p.hash, hash);
        } else {
            hash = concatHashes(hash, p.hash);
        }
    }
    return hash === rootHash;
}

module.exports = { MerkleTree, verifyProof };

