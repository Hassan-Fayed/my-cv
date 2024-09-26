import { expect, it, describe } from 'vitest';

import CommentsLinkedList from './commentsLinkedList';
import type { Comment } from './fetchComments';

describe('traverse()', () => {
    it('Returns an array of comments when calling traverse() on a populated linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);

        //  Act 
        const commentsArr = commentsLinkedList.traverse();

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded2, commentToBeAdded1]);
    });

    it('Returns an empty array when calling traverse() on an empty linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();

        // Act
        const commentsArr = commentsLinkedList.traverse();

        // Assert
        expect(commentsArr).toEqual([]);
    });
});

describe('unshift()', () => {
    it('Adds at the beginning of the linked list when it is empty.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded: Comment = {
            id: 'test-id',
            name: 'test-name',
            content: 'test-content',
            ownerUid: 'test-owner-uid',
        };

        // Act
        commentsLinkedList.unshift(commentToBeAdded);
        const commentsLinkedListTraversal: Comment[] = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsLinkedListTraversal).toEqual([commentToBeAdded]);
        expect(commentsLinkedListLength).toBe(1);
    });

    it('Adds at the beginning of the linked list when it is not empty.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        commentsLinkedList.unshift(commentToBeAdded1);

        // Act
        commentsLinkedList.unshift(commentToBeAdded2);
        const commentsLinkedListTraversal: Comment[] = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsLinkedListTraversal).toEqual([commentToBeAdded2, commentToBeAdded1]);
        expect(commentsLinkedListLength).toBe(2);
    });
});

describe('push()', () => {
    it('Adds at the end of the linked list when it is empty.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded: Comment = {
            id: 'test-id',
            name: 'test-name',
            content: 'test-content',
            ownerUid: 'test-owner-uid',
        };

        // Act
        commentsLinkedList.push(commentToBeAdded);
        const commentsLinkedListTraversal: Comment[] = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsLinkedListTraversal).toEqual([commentToBeAdded]);
        expect(commentsLinkedListLength).toBe(1);
    });

    it('Adds at the end of the linked list when it is not empty.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        commentsLinkedList.push(commentToBeAdded1);

        // Act
        commentsLinkedList.push(commentToBeAdded2);
        const commentsLinkedListTraversal: Comment[] = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsLinkedListTraversal).toEqual([commentToBeAdded1, commentToBeAdded2]);
        expect(commentsLinkedListLength).toBe(2);
    });
});

describe('shift()', () => {
    it('Removes from the beginning when there is only one node left inside the linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        commentsLinkedList.push(commentToBeAdded1);

        // Act 
        commentsLinkedList.shift();
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([]);
        expect(commentsLinkedListLength).toBe(0);
    });

    it('Removes from the beginning when there are more than one node inside the linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);

        // Act 
        commentsLinkedList.shift();
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded1]);
        expect(commentsLinkedListLength).toBe(1);
    });

    it('Works properly when removing from the beginning of the linked list while it is empty.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();

        // Act
        commentsLinkedList.shift();
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([]);
        expect(commentsLinkedListLength).toBe(0);
    });
});

describe('pop()', () => {
    it('Removes from the end of the linked list when there is only one node left in it.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        commentsLinkedList.push(commentToBeAdded1);

        // Act
        commentsLinkedList.pop();
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([]);
        expect(commentsLinkedListLength).toBe(0);
    });

    it('Removes from the end of the linked list when there are more than one node inside of it.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);

        // Act
        commentsLinkedList.pop();
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded2]);
        expect(commentsLinkedListLength).toBe(1);
    });

    it('Works properly when removing from the end of the linked list while it is empty.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();

        // Act
        commentsLinkedList.pop();
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([]);
        expect(commentsLinkedListLength).toBe(0);
    });
});

describe('delete()', () => {
    it('Removes from the middle of a populated linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        const commentToBeAdded3: Comment = {
            id: 'test-id-3',
            name: 'test-name-3',
            content: 'test-content-3',
            ownerUid: 'test-owner-uid-3',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);
        commentsLinkedList.unshift(commentToBeAdded3);

        // Act
        commentsLinkedList.delete('test-id-2');
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded3, commentToBeAdded1]);
        expect(commentsLinkedListLength).toBe(2);
    });

    it('Removes from the beginning of a populated linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        const commentToBeAdded3: Comment = {
            id: 'test-id-3',
            name: 'test-name-3',
            content: 'test-content-3',
            ownerUid: 'test-owner-uid-3',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);
        commentsLinkedList.unshift(commentToBeAdded3);

        // Act
        commentsLinkedList.delete('test-id-3');
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded2, commentToBeAdded1]);
        expect(commentsLinkedListLength).toBe(2);
    });


    it('Removes from the end of a populated linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        const commentToBeAdded3: Comment = {
            id: 'test-id-3',
            name: 'test-name-3',
            content: 'test-content-3',
            ownerUid: 'test-owner-uid-3',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);
        commentsLinkedList.unshift(commentToBeAdded3);

        // Act
        commentsLinkedList.delete('test-id-1');
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded3, commentToBeAdded2]);
        expect(commentsLinkedListLength).toBe(2);
    });

    it('Removes when there is only one node inside the linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        commentsLinkedList.push(commentToBeAdded1);

        // Act
        commentsLinkedList.delete('test-id-1');
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([]);
        expect(commentsLinkedListLength).toBe(0);
    });

    it('Does not remove from the linked list when a non existent comment\'s id is passed.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();
        const commentToBeAdded1: Comment = {
            id: 'test-id-1',
            name: 'test-name-1',
            content: 'test-content-1',
            ownerUid: 'test-owner-uid-1',
        };
        const commentToBeAdded2: Comment = {
            id: 'test-id-2',
            name: 'test-name-2',
            content: 'test-content-2',
            ownerUid: 'test-owner-uid-2',
        };
        commentsLinkedList.unshift(commentToBeAdded1);
        commentsLinkedList.unshift(commentToBeAdded2);

        // Act
        commentsLinkedList.delete('test-id-non-existent');
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([commentToBeAdded2, commentToBeAdded1]);
        expect(commentsLinkedListLength).toBe(2);
    });

    it('Works properly when removing from an empty linked list.', () => {
        // Arrange
        const commentsLinkedList = new CommentsLinkedList();

        // Act
        commentsLinkedList.delete('test-id-non-existent');
        const commentsArr = commentsLinkedList.traverse();
        const commentsLinkedListLength = commentsLinkedList.length;

        // Assert
        expect(commentsArr).toEqual([]);
        expect(commentsLinkedListLength).toEqual(0);
    });
});