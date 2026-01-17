import { Queue } from './queue';
import type { QueueType } from './queue';

interface BSTNodeType {
    left: BSTNode | null;
    right: BSTNode | null;
    data: number;
}

interface BSTType {
    root: BSTNodeType | null;
    add: (value: number) => void;
    preorder: () => number[];
    inorder: () => number[];
    postorder: () => number[];
    min: () => number | null;
    max: () => number | null;
    delete: (toBeDel: number) => void;
    maxDepth: () => number;
    breadthFirstTraversal: () => number[];
}

class BSTNode implements BSTNodeType {
    left: BSTNode | null;
    right: BSTNode | null;
    data: number;
    constructor(data: number) {
        this.left = null;
        this.right = null;
        this.data = data;
    }
}

class BST implements BSTType {
    #root: BSTNode | null;
    constructor() {
        this.#root = null;
    }

    get root() {
        return this.#root;
    }

    #addHelper(pNode: BSTNode | null, value: number) {
        if (pNode === null)
            return new BSTNode(value);

        if (pNode.data > value)
            pNode.left = this.#addHelper(pNode.left, value);
        else if (pNode.data <= value)
            pNode.right = this.#addHelper(pNode.right, value);

        pNode = this.#balance(pNode);
        return pNode;
    }

    add(value: number) {
        this.#root = this.#addHelper(this.#root, value);
    }

    preorder(): number[] {
        const result: number[] = [];

        (function preorderHelper(pNode: BSTNode | null) {
            if (pNode === null) return;

            result.push(pNode.data);
            preorderHelper(pNode.left);
            preorderHelper(pNode.right);
        })(this.#root);


        return result;
    }

    inorder(): number[] {
        const result: number[] = [];

        (function inorderHelper(pNode: BSTNode | null) {
            if (pNode === null) return;

            inorderHelper(pNode.left);
            result.push(pNode.data);
            inorderHelper(pNode.right);
        })(this.#root);

        return result;
    }

    postorder(): number[] {
        const result = [];

        (function postorderHelper(pNode: BSTNode | null) {
            if (pNode === null) return;

            postorderHelper(pNode.left);
            postorderHelper(pNode.right);
            result.push(pNode.data);
        })(this.#root);

        return result;
    }

    breadthFirstTraversal(): number[] {
        if (this.#root === null) return [];

        const bFSArr: number[] = [];
        const processQueue = new Queue();

        processQueue.unshift(this.#root);

        while (processQueue.length) {
            const currentNode = processQueue.pop();
            if (currentNode === null) break;

            bFSArr.push(currentNode.data);

            if (currentNode.left)
                processQueue.unshift(currentNode.left);
            if (currentNode.right)
                processQueue.unshift(currentNode.right);
        }

        return bFSArr;
    }

    #minHelper(pNode: BSTNode | null): number | null {
        if (pNode === null) return null;

        if (pNode.left)
            return this.#minHelper(pNode.left);

        return pNode.data;
    }

    min() {
        return this.#minHelper(this.#root);
    }

    #maxHelper(pNode: BSTNode | null): number | null {
        if (pNode === null) return null;

        if (pNode.right)
            return this.#maxHelper(pNode.right);

        return pNode.data;
    }

    max() {
        return this.#maxHelper(this.#root);
    }

    #deleteHelper(pNode: BSTNode | null, toBeDel: number): BSTNode | null {
        if (pNode === null) return null;

        if (pNode.data > toBeDel)
            pNode.left = pNode.left = this.#deleteHelper(pNode.left, toBeDel);
        else if (pNode.data < toBeDel)
            pNode.right = pNode.right = this.#deleteHelper(pNode.right, toBeDel);
        else {
            if (pNode.left === null && pNode.right === null) {   // leaf node
                pNode = null;
            } else if (pNode.left !== null && pNode.right === null) {    // only left child
                pNode = pNode.left;
            } else if (pNode.right !== null && pNode.left === null) {   // only right child
                pNode = pNode.right;
            } else {
                const rightMinValue = this.#minHelper(pNode.right);
                pNode.data = rightMinValue as number;
                pNode.right = this.#deleteHelper(pNode.right, rightMinValue as number);
            }
        }

        return pNode;
    }

    delete(toBeDel: number) {
        this.#root = this.#deleteHelper(this.#root, toBeDel);

        const inOrderArr = this.inorder();
        this.#root = this.#constructBalancedTree(inOrderArr);
    }

    #maxDepthHelper(pNode: BSTNodeType | null): number {
        if (pNode === null) return 0;

        return 1 + Math.max(this.#maxDepthHelper(pNode.left), this.#maxDepthHelper(pNode.right));
    }

    maxDepth() {
        return this.#maxDepthHelper(this.#root);
    }

    #getBalanceFactor(pNode: BSTNodeType): number {
        return this.#maxDepthHelper(pNode.right) - this.#maxDepthHelper(pNode.left);
    }

    #rotateLeft(pNode: BSTNodeType): BSTNodeType {
        if (pNode.right === null) return pNode;

        const temp = pNode;
        pNode = pNode.right;
        temp.right = pNode.left;
        pNode.left = temp;
        return pNode;
    }

    #rotateRight(pNode: BSTNodeType): BSTNodeType {
        if (pNode.left === null) return pNode;

        const temp = pNode;
        pNode = pNode.left;
        temp.left = pNode.right;
        pNode.right = temp;

        return pNode;
    }

    #rotateRightLeft(pNode: BSTNodeType) {
        pNode.right = this.#rotateRight(pNode.right as BSTNodeType);
        pNode = this.#rotateLeft(pNode);

        return pNode;
    }

    #rotateLeftRight(pNode: BSTNodeType) {
        pNode.left = this.#rotateLeft(pNode.left as BSTNodeType);
        pNode = this.#rotateRight(pNode);

        return pNode;
    }

    #balance(pNode: BSTNodeType) {
        const balanceFactor = this.#getBalanceFactor(pNode);

        if (balanceFactor > 1) {    // unbalanced and right heavy
            const rightBalanceFactor = this.#getBalanceFactor(pNode.right as BSTNodeType);
            if (rightBalanceFactor > 0)     // also right heavy
                pNode = this.#rotateLeft(pNode);
            else if (rightBalanceFactor < 0)  // left heavy
                pNode = this.#rotateRightLeft(pNode);

        } else if (balanceFactor < -1) {    // unbalanced and left heavy 
            const leftBalanceFactor = this.#getBalanceFactor(pNode.left as BSTNodeType);
            if (leftBalanceFactor < 0)      // also left heavy
                pNode = this.#rotateRight(pNode);
            else if (leftBalanceFactor > 0) // right heavy
                pNode = this.#rotateLeftRight(pNode);
        }

        return pNode;
    }

    #constructBalancedTree(inOrderArr: number[]): BSTNode | null {
        if (inOrderArr.length === 0) return null;
        if (inOrderArr.length === 1) return new BSTNode(inOrderArr[0]);

        const midIdx = Math.floor(inOrderArr.length / 2);
        const startIdx = 0;
        const endIdx = inOrderArr.length - 1;

        function recursiveHelper(startIdx: number, endIdx: number): BSTNode | null {
            if (startIdx > endIdx) return null;

            const midIdx = Math.floor((startIdx + endIdx) / 2);
            const pNode = new BSTNode(inOrderArr[midIdx]);
            pNode.left = recursiveHelper(startIdx, midIdx - 1);
            pNode.right = recursiveHelper(midIdx + 1, endIdx);

            return pNode;
        }
        const root = recursiveHelper(startIdx, endIdx);

        return root;
    }
}

export { BST, BSTNode };
export type { BSTType, BSTNodeType };