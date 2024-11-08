// TrieNode represents each node in the Trie
class TrieNode {
  constructor() {
    // Each node has a map of children nodes
    this.children = new Map();
    // Flag to indicate if the node represents the end of a word
    this.isEndOfWord = false;
  }
}

// Trie structure with insert, search, and autocomplete features
class Trie {
  constructor() {
    // The Trie starts with an empty root node
    this.root = new TrieNode();
  }

  // Method to insert a word into the Trie
  insert(word) {
    let current = this.root;

    // Traverse each character in the word
    for (let char of word) {
      // If the character does not exist in the current node's children, create it
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      // Move to the child node associated with the current character
      current = current.children.get(char);
    }
    // Mark the end of the word
    current.isEndOfWord = true;
    return "Added";
  }

  // Method to search for a word in the Trie
  search(word) {
    let current = this.root;

    // Traverse each character in the word
    for (let char of word) {
      // If the character is not found, return false
      if (!current.children.has(char)) {
        return false;
      }
      // Move to the child node associated with the current character
      current = current.children.get(char);
    }
    // Return true if the word exists in the Trie and is marked as an end of word
    return current.isEndOfWord;
  }

  // Method to check if a prefix exists in the Trie
  startsWith(prefix) {
    let current = this.root;

    // Traverse each character in the prefix
    for (let char of prefix) {
      // If the character is not found, return false
      if (!current.children.has(char)) {
        return false;
      }
      // Move to the child node associated with the current character
      current = current.children.get(char);
    }
    // Return true if the prefix exists in the Trie
    return current.children;
  }

  // Method to get word suggestions based on a prefix
  getSuggestions(prefix, limit = 5) {
    let suggestions = [];
    let current = this.root;

    // Traverse each character in the prefix
    for (let char of prefix) {
      // If the prefix is not found, return an empty list
      if (!current.children.has(char)) {
        return suggestions;
      }
      // Move to the child node associated with the current character
      current = current.children.get(char);
    }

    // Helper function to find all words from the current node
    function findWords(node, currentWord) {
      // Stop if we've reached the suggestion limit
      if (suggestions.length >= limit) return;

      // Add the word to suggestions if it’s marked as an end of word
      if (node.isEndOfWord) {
        suggestions.push(currentWord);
      }

      // Recursively search for words in each child node
      for (let [char, children] of node.children) {
        if (suggestions.length >= limit) break;
        findWords(children, currentWord + char);
      }
    }
    // Start the word search from the last character of the prefix
    findWords(current, prefix);
    return suggestions;
  }
}

// Create a Trie instance
const tries = new Trie();

// Insert words into the Trie

// Search for a word in the Trie
// console.log(tries.search("Search")); // false
