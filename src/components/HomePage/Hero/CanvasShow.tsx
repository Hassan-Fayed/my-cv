'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface CanvasShowProps {
    pixelLength: number;
    tenValuesImage: StaticImageData;
}

export default function CanvasShow({ tenValuesImage, pixelLength }: CanvasShowProps) {
    const canvasElementRef = useRef<HTMLCanvasElement>(null);
    const imgElementRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!canvasElementRef.current || !imgElementRef.current) return;
        drawASCIIImage(canvasElementRef.current, imgElementRef.current, pixelLength);
    }, [pixelLength]);

    return <>
        <canvas
            className="w-[56em] h-[39.2em]"
            ref={canvasElementRef}
            width={tenValuesImage.width}
            height={tenValuesImage.height}
        >
            <Image
                className="w-[56em] h-[39.2em]"
                src="/heroImageAlternative.png"
                alt="An ASCII style image of Hassan Fayed"
                width={1000}
                height={700}
            />
        </canvas>
        <Image
            className="hidden"
            ref={imgElementRef}
            src={tenValuesImage}
            alt=""
            priority
        />
    </>;
}

function drawASCIIImage(canvas: HTMLCanvasElement, img: HTMLImageElement, pixelLength: number) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const scannedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${pixelLength}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = 0; x < canvas.width; x += pixelLength) {
        for (let y = 0; y < canvas.height; y += pixelLength) {
            const position = (x + (y * canvas.width)) * 4;

            if (scannedImageData[position + 3] >= 255) {
                ctx.fillStyle = '#001314';
                ctx.fillRect(x, y, pixelLength, pixelLength);
                ctx.fillStyle = '#f7fff2';

                if (scannedImageData[position] < 28 && scannedImageData[position] >= 0)
                    ctx.fillText(' ', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 57 && scannedImageData[position] >= 28)
                    ctx.fillText('.', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 85 && scannedImageData[position] >= 57)
                    ctx.fillText('-', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 113 && scannedImageData[position] >= 85)
                    ctx.fillText('+', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 142 && scannedImageData[position] >= 113)
                    ctx.fillText('!', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 170 && scannedImageData[position] >= 142)
                    ctx.fillText('7', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 198 && scannedImageData[position] >= 170)
                    ctx.fillText('9', x + pixelLength / 2, y);
                else if (scannedImageData[position] < 227 && scannedImageData[position] >= 198)
                    ctx.fillText('W', x + pixelLength / 2, y);
                else if (scannedImageData[position] <= 255 && scannedImageData[position] >= 227)
                    ctx.fillText('@', x + pixelLength / 2, y);
            }
        }
    }
}