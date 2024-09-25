import type { Comment } from "./fetchComments";

class LinkedListNode {
    data: Comment;
    next: LinkedListNode | null;
    constructor(data: Comment) {
        this.data = data;
        this.next = null;
    }
}

export default class CommentsLinkedList {
    #head: LinkedListNode | null;
    #length: number;
    constructor() {
        this.#head = null;
        this.#length = 0;
    }

    get length() {
        return this.#length;
    }

    unshift(val: Comment) {
        const newNode = new LinkedListNode(val);
        this.#length++;

        if (this.#head === null) {
            this.#head = newNode;
            return;
        }

        newNode.next = this.#head;
        this.#head = newNode;
    }

    push(val: Comment) {
        const newNode = new LinkedListNode(val);
        this.#length++;

        if (this.#head === null) {
            this.#head = newNode;
            return;
        }

        let temp = this.#head;
        while (temp.next !== null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    traverse() {
        const traversalArr: Comment[] = [];
        let temp = this.#head;
        while (temp !== null) {
            traversalArr.push(temp.data);
            temp = temp.next;
        }
        return traversalArr;
    }

    shift() {
        if (this.#head === null)
            return;

        this.#length--;

        if (this.#head.next === null) {
            this.#head = null;
            return;
        }

        let temp: LinkedListNode | null = this.#head;
        this.#head = this.#head.next;
        temp.next = null;
        temp = null;
    }

    pop() {
        if (this.#head === null)
            return;

        this.#length--;

        if (this.#head.next === null) {
            this.#head = null;
            return;
        }

        let temp: LinkedListNode | null = this.#head;
        let beforeTemp: LinkedListNode | null = this.#head;
        while (temp.next !== null) {
            beforeTemp = temp;
            temp = temp.next;
        }

        beforeTemp.next = null;
        temp.next = null;
        temp = null;
        beforeTemp = null;
    }

    delete(commentIdToBeDeleted: string) {
        if (!this.#head) return;

        if (this.#head.data.id === commentIdToBeDeleted) {
            this.shift();
            return;
        }

        let temp: LinkedListNode | null = this.#head;
        let beforeTemp: LinkedListNode | null = this.#head;

        while (temp !== null && temp.data.id !== commentIdToBeDeleted) {
            beforeTemp = temp;
            temp = temp.next;
        }

        if (!temp)
            return;

        this.#length--;
        beforeTemp.next = temp.next;
        temp.next = null;
        temp = null;
        beforeTemp = null;
    }
}