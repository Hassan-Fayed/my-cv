import type { BSTNodeType } from "@/utils/binarySearchTree";

interface PCoordinates {
    x: number;
    y: number;
}

function getGeoSeqVal(startVal: number, ratio: number, position: number) {
    return startVal * ratio ** (position - 1);
}

function drawBinaryTree(
    pNode: BSTNodeType | null,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    geoSeqPos: number,
    pCoordinates: PCoordinates | null = null
) {
    const ballImageLength = Math.max(canvas.width / 35, 20);
    const y = ballImageLength * 2;
    const spaceBetNodesStartVal = ballImageLength;
    const rowHeight = ballImageLength * 1.5;

    ctx.font = `bold ${ballImageLength * 0.6}px Arial`;
    ctx.lineWidth = ballImageLength * 0.07;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ballImg = new Image();
    ballImg.src = '/pixelBall.png';
    ballImg.onload = () => {
        (function drawRecursive(
            pNode: BSTNodeType | null,
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            rowHeight: number,
            geoSeqPos: number,
            ballImg: HTMLImageElement,
            pCoordinates: PCoordinates | null = null
        ) {
            if (pNode === null)
                return;

            // if this node has a parent, draw a line between them
            if (pCoordinates) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(pCoordinates.x, pCoordinates.y);
                ctx.stroke();
            }

            // calculate the amount of space along the x-axis to shift the children nodes of this node (left and right):
            const geoSeqVal = getGeoSeqVal(spaceBetNodesStartVal, 2, geoSeqPos);

            // postorder traversal:
            drawRecursive(
                pNode.left,
                ctx,
                x - geoSeqVal,
                y + rowHeight,
                rowHeight,
                geoSeqPos - 1,
                ballImg,
                { x, y }
            );
            drawRecursive(
                pNode.right,
                ctx,
                x + geoSeqVal,
                y + rowHeight,
                rowHeight,
                geoSeqPos - 1,
                ballImg,
                { x, y }
            );
            ctx.drawImage(ballImg, x - ballImageLength / 2, y - ballImageLength / 2, ballImageLength, ballImageLength);
            ctx.fillText(String(pNode.data), x, y + 2);
        })(pNode, ctx, x, y, rowHeight, geoSeqPos, ballImg, pCoordinates);
    }
}

export default drawBinaryTree;