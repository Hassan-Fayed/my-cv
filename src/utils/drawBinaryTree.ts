import { Queue } from "./queue";
import type { BSTType, BSTNodeType } from "./binarySearchTree";

function getGeometricSum(position: number, initialVal = 1, ratio = 2) {
    return (initialVal * (1 - Math.pow(ratio, position))) / (1 - ratio);
}

function getGeometricValue(position: number, initialVal = 1, ratio = 2) {
    return initialVal * Math.pow(ratio, position - 1);
}

function writeSpaces(amount: number) {
    let spaces = '';
    for (let i = 0; i < amount; i++)
        spaces = spaces + ' ';
    return spaces;
}

function write_s(amount: number) {
    let _s = '';
    for (let i = 0; i < amount; i++)
        _s = _s + '_';
    return _s;
}

function contructTreeArray(binaryTree: BSTType) {
    if (binaryTree.root === null) return [];

    const maxDepth: number = binaryTree.maxDepth();
    const numberOfNodes = getGeometricSum(maxDepth);

    const constructedTreeArr: (number | null)[] = [];

    const processQueue = new Queue();

    processQueue.unshift(binaryTree.root);
    let currNode: BSTNodeType | null;
    for (let i = 0; i < numberOfNodes; i++) {
        currNode = processQueue.pop();

        if (currNode === null) {
            constructedTreeArr.push(null);
            processQueue.unshift(null);
            processQueue.unshift(null);
        } else {
            constructedTreeArr.push(currNode.data);
            processQueue.unshift(currNode.left);
            processQueue.unshift(currNode.right);
        }
    }

    return constructedTreeArr;
}

function constructTreeLvlsArr(treeArr: (number | null)[]) {
    const constructedTreeArr = [];

    let j = 0, currGeoPosition = 1;
    let currGeoSum = getGeometricSum(currGeoPosition);
    let currLvlStr = '';
    while (j <= treeArr.length) {
        if (j < currGeoSum) {
            if (j === treeArr.length) break;

            if (treeArr[j] === null)
                currLvlStr = currLvlStr + '-- ';
            else if (treeArr[j]?.toString().length === 1)
                currLvlStr = currLvlStr + '0' + treeArr[j] + ' ';
            else
                currLvlStr = currLvlStr + treeArr[j] + ' ';

            j++
        } else {
            constructedTreeArr.push(currLvlStr.trim());
            constructedTreeArr.push('');
            currLvlStr = '';
            currGeoPosition++;
            currGeoSum = getGeometricSum(currGeoPosition);
        }
    }

    if (constructedTreeArr.length > 1)
        constructedTreeArr.length = constructedTreeArr.length - 1;

    return constructedTreeArr;
}

function add_s(treeStrLvlsArr: string[]) {
    let currGeoPosition = 1;
    let _sAmout = 2;
    let _sIncrementAmount: number;
    let _s: string;
    for (let i = treeStrLvlsArr.length - 5; i >= 0; i -= 2) {
        _s = write_s(_sAmout);
        treeStrLvlsArr[i] = _s + treeStrLvlsArr[i] + _s;
        treeStrLvlsArr[i] = treeStrLvlsArr[i].replace(/ /g, _s + ' ' + _s);
        _sIncrementAmount = getGeometricValue(currGeoPosition, 4);
        _sAmout += _sIncrementAmount;
        currGeoPosition++;
    }

    return treeStrLvlsArr;
}

function addInnerSpaces(treeStrLvlsArr: string[]) {
    let currGeoPosition = 1;
    let spacesAmount = 2;
    let innerSpaces: string;
    let spacesIncrementAmount: number;
    for (let i = treeStrLvlsArr.length - 1; i >= 2; i -= 2) {
        innerSpaces = writeSpaces(spacesAmount);
        treeStrLvlsArr[i] = treeStrLvlsArr[i].replace(/ /g, innerSpaces);
        spacesIncrementAmount = getGeometricValue(currGeoPosition, 4);
        spacesAmount += spacesIncrementAmount;
        if (i < treeStrLvlsArr.length - 1)
            currGeoPosition++;
    }

    return treeStrLvlsArr;
}

function addOuterSpaces(treeStrLvlsArr: string[]) {
    let spacesAmount = 2
    for (let i = treeStrLvlsArr.length - 3; i >= 0; i -= 2) {
        treeStrLvlsArr[i] = writeSpaces(spacesAmount) + treeStrLvlsArr[i] + ' ';
        treeStrLvlsArr[i + 1] = writeSpaces(treeStrLvlsArr[i].length + 1);
        spacesAmount *= 2;
    }

    return treeStrLvlsArr;
}

function addArrows(treeStrLvlsArr: string[]) {
    const treeMaxDepth = Math.round(treeStrLvlsArr.length / 2);     // because it includes levels for the arrows
    let startingSpacesAmount = getGeometricValue(treeMaxDepth - 1, 2);  // so that we don't start searching at the beginning of the string since we know it starts with spaces 

    for (let i = 0; i < treeStrLvlsArr.length - 1; i += 2) {
        for (let j = startingSpacesAmount - 1; j < treeStrLvlsArr[i].length; j++) {
            if (
                treeStrLvlsArr[i][j].match(/[0-9_-]/) &&
                treeStrLvlsArr[i][j - 1] === ' '
            ) {
                treeStrLvlsArr[i + 1] =
                    treeStrLvlsArr[i + 1].slice(0, j - 1) +
                    `${treeStrLvlsArr[i + 2][j - 1] !== '-' ? '/' : ' '}` +
                    treeStrLvlsArr[i + 1].slice(j);
            }
            else if (
                treeStrLvlsArr[i][j] === ' ' &&
                treeStrLvlsArr[i][j - 1].match(/[0-9_-]/)
            ) {
                treeStrLvlsArr[i + 1] =
                    treeStrLvlsArr[i + 1].slice(0, j) +
                    `${treeStrLvlsArr[i + 2][j + 1] !== '-' ? '\\' : ' '}` +
                    treeStrLvlsArr[i + 1].slice(j + 1);
            }
        }

        startingSpacesAmount = startingSpacesAmount / 2;
    }

    return treeStrLvlsArr;
}

function removeEmptyNodesfromLast2Rows(treeStrLvlsArr: string[]) {
    for (let i = 0; i < treeStrLvlsArr.length; i += 2)
        treeStrLvlsArr[i] = treeStrLvlsArr[i].replace(/--/g, '  ');

    return treeStrLvlsArr;
}

export default function drawBinaryTree(binaryTree: BSTType): string[] {
    const treeArray = contructTreeArray(binaryTree);

    let result = constructTreeLvlsArr(treeArray);
    result = add_s(result);
    result = addInnerSpaces(result);
    result = addOuterSpaces(result);
    result = addArrows(result);
    result = removeEmptyNodesfromLast2Rows(result);

    return result;
}