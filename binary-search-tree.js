// Do not change this
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(val, currentNode = this.root) {
        let newNode = new TreeNode(val);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        if (val < currentNode.val) {
            if (currentNode.left === null) currentNode.left = newNode;
            else this.insert(val, currentNode.left);

        } else {
            if (currentNode.right === null) currentNode.right = newNode;
            else this.insert(val, currentNode.right);
        }
    }

    search(val, root = this.root) {
        if (!root) return false;
        if (root.val === val) return true;
        if (val < root.val) return this.search(val, root.left);
        else return this.search(val, root.right);
    }

    preOrderTraversal(currentNode = this.root) {
        if (currentNode) {
            console.log(currentNode.val);
            this.preOrderTraversal(currentNode.left);
            this.preOrderTraversal(currentNode.right);
        }
    }

    inOrderTraversal(currentNode = this.root) {
        if (currentNode) {
            this.inOrderTraversal(currentNode.left);
            console.log(currentNode.val);
            this.inOrderTraversal(currentNode.right);
        }
    }

    postOrderTraversal(currentNode = this.root) {
        if (currentNode) {
            this.postOrderTraversal(currentNode.left);
            this.postOrderTraversal(currentNode.right);
            console.log(currentNode.val);
        }
    }

    // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
        let queue = [this.root];

        while (queue.length > 0) {
            let curr = queue.shift(); // remove the 1st el in queue using .shift()
            console.log(curr.val);

            if (curr.left) queue.push(curr.left);
            if (curr.right) queue.push(curr.right);
        }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
        let stack = [this.root];

        while (stack.length > 0) {
            let curr = stack.pop(); // pop off the top el in stack using .pop()
            console.log(curr.val);

            if (curr.left) stack.push(curr.left);
            if (curr.right) stack.push(curr.right);
        }
    }
}

module.exports = { BinarySearchTree, TreeNode };
