'use client';

import type { RefObject } from 'react';
import type { StaticImageData } from 'next/image';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

import { pressStart2pFont } from '@/utils/fonts';

interface CanvasShowProps {
    getCurrScrollInfo: () => { scrollPercentage: number; pixelLength: number } | null;
    tenValuesImage: StaticImageData;
}

export default function CanvasShow({ tenValuesImage, getCurrScrollInfo }: CanvasShowProps) {
    const canvasElementRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const imgElementRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            const currScrollInfo = getCurrScrollInfo();
            if (currScrollInfo === null || !canvasElementRef.current || !imgElementRef.current) return;
            drawASCIIImage(
                canvasElementRef.current,
                ctxRef,
                imgElementRef.current,
                currScrollInfo.pixelLength,
                currScrollInfo.scrollPercentage
            );
        });
    }, [getCurrScrollInfo]);

    const handleImgLoad = () => {
        const currScrollInfo = getCurrScrollInfo();
        if (currScrollInfo === null || !canvasElementRef.current || !imgElementRef.current) return;
        drawASCIIImage(
            canvasElementRef.current,
            ctxRef,
            imgElementRef.current,
            currScrollInfo.pixelLength,
            currScrollInfo.scrollPercentage
        );
    }

    return <>
        <canvas
            className="w-[55em] h-auto"
            ref={canvasElementRef}
            width={tenValuesImage.width}
            height={tenValuesImage.height}
        ></canvas>
        <Image
            className="hidden"
            ref={imgElementRef}
            src={tenValuesImage}
            alt=""
            priority
            onLoad={handleImgLoad}
        />
    </>;
}

function drawASCIIImage(
    canvas: HTMLCanvasElement,
    ctxRef: RefObject<CanvasRenderingContext2D | null>,
    img: HTMLImageElement,
    pixelLength: number,
    scrollPercentage: number
) {
    if (!ctxRef.current) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;
        ctx.font = `${pixelLength}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctxRef.current = ctx;
    }

    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    ctxRef.current.drawImage(img, 0, 0);
    const scannedImageData = ctxRef.current.getImageData(0, 0, canvas.width, canvas.height).data;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

    ctxRef.current.font = `${pixelLength}px Arial`;
    for (let x = 0; x < canvas.width; x += pixelLength) {
        for (let y = 0; y < canvas.height; y += pixelLength) {
            const position = (x + (y * canvas.width)) * 4;

            if (scannedImageData[position + 3] >= 179) {
                ctxRef.current.fillStyle = '#001314';
                ctxRef.current.fillRect(x, y, pixelLength, pixelLength);
                ctxRef.current.fillStyle = '#fafff7';

                if (scannedImageData[position] < 29 && scannedImageData[position] >= 0)
                    ctxRef.current.fillText(' ', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 57 && scannedImageData[position] >= 29)
                    ctxRef.current.fillText('.', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 85 && scannedImageData[position] >= 57)
                    ctxRef.current.fillText('-', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 113 && scannedImageData[position] >= 85)
                    ctxRef.current.fillText('+', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 141 && scannedImageData[position] >= 113)
                    ctxRef.current.fillText('!', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 172 && scannedImageData[position] >= 141)
                    ctxRef.current.fillText('7', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 200 && scannedImageData[position] >= 172)
                    ctxRef.current.fillText('9', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] < 228 && scannedImageData[position] >= 200)
                    ctxRef.current.fillText('W', x + pixelLength / 2, y + pixelLength / 2);
                else if (scannedImageData[position] <= 255 && scannedImageData[position] >= 228)
                    ctxRef.current.fillText('@', x + pixelLength / 2, y + pixelLength / 2);
            }
        }
    }

    ctxRef.current.save();
    ctxRef.current.font = `27px ${pressStart2pFont.style.fontFamily}`;
    ctxRef.current.fillStyle = '#88c070';
    ctxRef.current.textBaseline = 'alphabetic';
    ctxRef.current.fillText(`${scrollPercentage}%`, canvas.width - 231, canvas.height - 37);
    ctxRef.current.restore();
}