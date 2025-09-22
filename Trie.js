class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode(char);
            }
            current = current.children[char];
        }
        current.isWord = true;
    }

    hasNode(word) {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.isWord;
    }

    getAllNodes() {
        const result = [];
        function dfs(node, path) {
            if (node.isWord) {
                result.push(path);
            }
            for (const childKey in node.children) {
                dfs(node.children[childKey], path + childKey);
            }
        }
        dfs(this.root, "");
        return result;
    }
}

module.exports = { Trie };
