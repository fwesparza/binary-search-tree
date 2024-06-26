/********************************************
 * FUNCTIONS FOR BINARY SEARCH TREES (BST's)
 * ******************************************
 */
function findMinBST(rootNode) {
  while (rootNode.left) rootNode = rootNode.left;
  return rootNode.val;
}

function findMaxBST(rootNode) {
  while (rootNode.right) rootNode = rootNode.right;
  return rootNode.val;
}


/***********************************
 * FUNCTIONS FOR BINARY TREES (BT's)
 * *********************************
 */
function findMinBT(rootNode) {
  // if node doesn't exist, set min to Infinity so it's always > other nums
  if (!rootNode) return Infinity;

  // initialize min as equal to current val
  let min = rootNode.val;

  // recursivley find min of left & right nodes
  let minLeft = findMinBT(rootNode.left);
  let minRight = findMinBT(rootNode.right);

  //compare mins, return the smallest
  if (minLeft < min) min = minLeft;
  if (minRight < min) min = minRight;
  return min;
}

function findMaxBT(rootNode) {
  if (!rootNode) return -Infinity;

  let max = rootNode.val;
  let maxLeft = findMaxBT(rootNode.left);
  let maxRight = findMaxBT(rootNode.right);

  if (maxLeft > max) max = maxLeft;
  if (maxRight > max) max = maxRight;
  return max;
}

/**
 * getHeight()
 *
 * @returns -1 if tree has no children
 * @returns 0 if tree has 1 leaf node - current code works for this case because
 * height of non-exisitent node = -1, so, -1 + 1 = 0
 */
function getHeight(rootNode) {
  if (!rootNode) return -1;

  // find max height of left & right subtrees
  let heightLeft = getHeight(rootNode.left);
  let heightRight = getHeight(rootNode.right);

  // return the max of the 2 heights + 1 (add 1 because height includes current node)
  return Math.max(heightLeft, heightRight) + 1;
}

/**
 * balancedTree()
 *
 * a 'height balanced binary tree' is a binary tree in which the following are true:
 * 1) the height of it's left & right subtree differs by at most 1
 * 2) it's left & right subtrees are 'balanced'
 *
 */
function balancedTree(rootNode) {
  let stack = [rootNode];

  while (stack.length > 0) {
    let curr = stack.pop();

    // get heights of right & left subtrees
    let heightLeft = getHeight(curr.left);
    let heightRight = getHeight(curr.right);

    // if the heights of the two subtrees differs by > 1, tree is not balanced
    if (Math.abs(heightLeft - heightRight) > 1) return false;

    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }

  return true;
}

function countNodes(rootNode) {
  let stack = [rootNode];
  let nodesCount = 0;

  while (stack.length > 0) {
    let curr = stack.pop();
    nodesCount++;

    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }

  return nodesCount;
}

/**
 * getParentNode()
 *
 * @returns null if value of rootNode equals target
 * @returns value of parent node
 * uses a depth first traversal to have access to parent node in each iteration
 */
function getParentNode(rootNode, target) {
  if (rootNode.val === target) return null;
  let stack = [rootNode];

  while (stack.length > 0) {
    let curr = stack.pop();

    if (curr.left) {
      if (curr.left.val === target) return curr;
      stack.push(curr.left);
    }
    if (curr.right) {
      if (curr.right.val === target) return curr;
      stack.push(curr.right);
    }
  }
}

/**
 * inOrderPredecessor()
 *
 * @rootNode of a binary tree (not necessarily a binary search tree)
 * @returns 'null' if target is 1st value in in-order traversal
 * @returns value BEFORE target otherwise
 */
function inOrderPredecessor(rootNode, target) {
  // if target is the min of in-order traversal,
  // return null since it has no predecessor
  if (findMinBT(rootNode) === target) return null;

  // find  target node
  let targetNode = null;
  let stack = [rootNode];

  while (stack.length > 0) {
    let curr = stack.pop();

    if (curr.val === target) {
      targetNode = curr;
    } else {
      if (curr.left) stack.push(curr.left);
      if (curr.right) stack.push(curr.right);
    }
  }

  // if  target node has a left subtree
  // the predecessor will be the max of the left subtree
  if (targetNode.left) return findMaxBT(targetNode.left);

  // else, target node must only have a right subtree
  // therefore, preducessor will by the parent of the target node
  else return getParentNode(rootNode, target).val;
}

/**
 * @return 'undefined' if target is not in tree
 *
 * 1) deletes leaves (nodes without children) - set parents pointer to 'null'
 * 2) deletes nodes with 1 child - replace node with child
 * 3) deleted nodes with 2 children:
 *    a) replace target node value with in-order-predecessor or sucessor
 *    b) delete in-order predecessor or sucessor
 *
 */
function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let targetNode = null;
  let parentNode = null;
  let stack = [rootNode];

  while (stack.length > 0) {
    let curr = stack.pop();

    if (curr.val === target) {
      targetNode = curr;
      parentNode = getParentNode(rootNode, target);
    } else {
      if (curr.left) stack.push(curr.left);
      if (curr.right) stack.push(curr.right);
    }
  }

  // Undefined if the target cannot be found
  if (!targetNode) return undefined;


  /**************
   * NO CHILDREN
   * ************
   */
  if (!targetNode.left && !targetNode.right) {
    // Case 0: Zero children and no parent:
    //   return null
    if (!parentNode) return null;

    // Case 1: Zero children:
    //   Set the parent that points to it to null
    if (parentNode.left.val === target) parentNode.left = null;
    else parentNode.right = null;
  }

  /**************
   * 2 CHILDREN
   * ************
   */
  if (targetNode.left && targetNode.right) {
    // Case 2: Two children:
    //  Set the value to its in-order predecessor, then delete the predecessor
    let inOrderPredecessor = inOrderPredecessor(rootNode, target);
    target.val = inOrderPredecessor;
    deleteNodeBST(rootNode, inOrderPredecessor);

    //  Replace target node with the left most child on its right side,
    //  or the right most child on its left side.
    //  Then delete the child that it was replaced with.

  }

  /*********
  * 1 CHILD
  * ********
  */
  // Case 3: One child:
  //   Make the parent point to the child

  // if parent's right pointer points to target
  if (parentNode.right) {
    if (parentNode.right.val === target) {
      if (targetNode.right) parentNode.right = targetNode.right;
      else parentNode.right = targetNode.left;
    }

    // else, parent's left pointer must point to target
    else {
      if (targetNode.right) parentNode.left = targetNode.right;
      else parentNode.left = targetNode.left;
    }
  }

}

module.exports = {
  findMinBST,
  findMaxBST,
  findMinBT,
  findMaxBT,
  getHeight,
  countNodes,
  balancedTree,
  getParentNode,
  inOrderPredecessor,
  deleteNodeBST
}
