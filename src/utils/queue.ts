import { BSTNodeType } from "./binarySearchTree";

interface QueueNodeType {
    data: BSTNodeType | null;
    next: QueueNodeType | null;
}

class QueueNode implements QueueNodeType {
    data: BSTNodeType | null;
    next: QueueNodeType | null;
    constructor(data: BSTNodeType | null) {
        this.data = data;
        this.next = null;
    }
}




interface QueueType {
    unshift: (data: BSTNodeType | null) => void;
    pop: () => BSTNodeType | null;
    traverse: () => (BSTNodeType | null)[];
}

class Queue implements QueueType {
    #head: QueueNodeType | null;
    #traversalArr: (BSTNodeType | null)[];
    length: number;
    constructor() {
        this.#head = null;
        this.#traversalArr = [];
        this.length = 0;
    }

    unshift(data: BSTNodeType | null) {
        const newNode = new QueueNode(data);

        if (this.#head === null) this.#head = newNode;
        else {
            const temp = this.#head;
            this.#head = newNode;
            this.#head.next = temp;
        }

        this.length++;
    }

    pop() {
        if (this.#head === null) return null;

        if (this.#head && this.#head.next === null) {
            const dataToBeReturned = this.#head.data;
            this.#head = null;
            this.length--;
            return dataToBeReturned;
        }

        else {
            let temp: QueueNodeType | null = this.#head;
            let beforeTemp: QueueNodeType = this.#head;

            while (temp.next !== null) {
                beforeTemp = temp;
                temp = temp.next;
            }

            const dataToBeReturned = temp.data;
            beforeTemp.next = null;
            this.length--;
            return dataToBeReturned;
        }
    }

    traverse() {
        if (this.#head === null) return [];

        else {
            this.#traversalArr = [];
            let temp: QueueNodeType | null = this.#head;
            while (temp !== null) {
                this.#traversalArr.push(temp.data);
                temp = temp.next;
            }

            return this.#traversalArr;
        }
    }
}

export { Queue };
export type { QueueType };