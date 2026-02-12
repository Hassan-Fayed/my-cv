import type { RefObject } from 'react';
import type Particle from './particles';

let animationId: number | null = null;

function initializeCanvas(
    canvasRef: RefObject<HTMLCanvasElement | null>,
    ctxRef: RefObject<CanvasRenderingContext2D | null>
) {
    if (!canvasRef.current) return;

    // get context only if you did not get one before:
    if (!ctxRef.current)
        ctxRef.current = canvasRef.current.getContext('2d');

    if (!ctxRef.current) return;

    ctxRef.current.strokeStyle = '#f0184a';
    ctxRef.current.lineWidth = 5.5;
}

function resolveWhenOnTopOfEachother(particle1: Particle, particle2: Particle, hypotenuseFromCenters: number) {
    if (hypotenuseFromCenters < (particle1.radius + particle2.radius)) {
        const unitVectorX = (particle2.x - particle1.x) / hypotenuseFromCenters;
        const unitVectorY = (particle2.y - particle1.y) / hypotenuseFromCenters;

        const distanceToBeMoved = (particle1.diameter / 2 + particle2.diameter / 2) - hypotenuseFromCenters;

        const newX = particle2.x + distanceToBeMoved * unitVectorX;
        const newY = particle2.y + distanceToBeMoved * unitVectorY;

        particle2.x = newX;
        particle2.y = newY;
    }
}

function resolveParticlesCollision(particle1: Particle, particle2: Particle, hypotenuseFromCenters: number) {
    const collisionDist = (particle1.diameter / 2) + (particle2.diameter / 2);
    // detect a collision 
    if (hypotenuseFromCenters <= collisionDist) {
        // alonge the x-axis:
        // if they are moving in oposite directions on the x-axis:
        if (particle1.vx * particle2.vx < 0) {   // negative multiplication product
            // particle1.reverseVelocityDirection('x');
            particle2.reverseVelocityDirection('x');
            // if they are moving in the same direction on the x-axis:
        } else if (particle1.vx * particle2.vx > 0) {  // positive multiplication product
            //  look for the particle that is in the rear and reverse its direction:
            if (
                (particle1.x < particle2.x && particle1.vx > 0) ||  // moving in the positive direction
                (particle1.x > particle2.x && particle1.vx < 0)     // moving in the negative direction
            ) {
                particle1.reverseVelocityDirection('x');
            } else if (
                (particle2.x < particle1.x && particle2.vx > 0) ||
                (particle2.x > particle1.x && particle2.vx < 0)
            ) {
                particle2.reverseVelocityDirection('x');
            }
        }

        // alonge y-axis
        if (particle1.y + particle1.diameter === particle2.y) {
            // if they are moving in opposite directions on the y-axis
            if (particle1.vy * particle2.vx < 0) {   // negative product
                // particle1.reverseVelocityDirection('y');
                particle2.reverseVelocityDirection('y');
                // if they are traveling in the same direction alonge the y-axis
            } else if (particle1.vy * particle2.vx > 0) {   // positive product
                // look for the particle in the rear and reverse its direction
                if (
                    (particle1.y < particle2.y && particle1.vy > 0) ||   // they are traveling in the positive direction
                    (particle1.y > particle2.y && particle1.vy < 0)      // they are traveling in the negative direction
                ) {
                    particle1.reverseVelocityDirection('y');
                } else if (
                    (particle2.y < particle1.y && particle2.vy > 0) ||
                    (particle2.y > particle1.y && particle2.vy < 0)
                ) {
                    particle2.reverseVelocityDirection('y');
                }
            }
        }
    }
}

function connectParticles(
    ctx: CanvasRenderingContext2D,
    particle1: Particle,
    particle2: Particle,
    hypotenuseFromCenters: number,
    maxLength: number
) {
    if (hypotenuseFromCenters <= maxLength) {
        ctx.save();
        ctx.globalAlpha = 1 - (hypotenuseFromCenters / maxLength);

        ctx.beginPath();
        ctx.moveTo(
            particle1.x + (particle1.diameter / 2),
            particle1.y + (particle1.diameter / 2)
        );
        ctx.lineTo(
            particle2.x + (particle2.diameter / 2),
            particle2.y + (particle2.diameter / 2)
        );
        ctx.stroke();

        ctx.restore();
    }
}

function drawParticles(
    canvasRef: RefObject<HTMLCanvasElement | null>,
    ctxRef: RefObject<CanvasRenderingContext2D | null>,
    particlesArr: Particle[],
    pxlBallImgEl: HTMLImageElement
) {
    if (!canvasRef.current || !ctxRef.current) return;

    const ctx = ctxRef.current;

    for (let i = 0; i < particlesArr.length; i++) {
        for (let j = i + 1; j < particlesArr.length; j++) {
            const particle1 = particlesArr[i];
            const particle2 = particlesArr[j];


            const dx = Math.abs((particle1.x + particle1.radius) - (particle2.x + particle2.radius));   // form center not from origin
            const dy = Math.abs((particle1.y + particle1.radius) - (particle2.y + particle2.radius));
            const hypotenuseFromCenters = Math.hypot(dx, dy);


            // resolveWhenOnTopOfEachother(particle1, particle2, hypotenuseFromCenters);
            // resolveParticlesCollision(particle1, particle2, hypotenuseFromCenters);

            connectParticles(ctx, particle1, particle2, hypotenuseFromCenters, 200);
        }
    }

    for (const particle of particlesArr)
        ctx.drawImage(pxlBallImgEl, particle.x, particle.y, particle.diameter, particle.diameter);
}

function changeParticlesCoordinates(
    particlesArr: Particle[],
    audioContext: AudioContext,
    collisionAudioBuffer: AudioBuffer
) {
    for (const particle of particlesArr) {
        particle.updateY(collisionAudioBuffer, audioContext, 0);
        particle.updateX(collisionAudioBuffer, audioContext, 0);
    }
}

function animate(
    canvasRef: RefObject<HTMLCanvasElement | null>,
    ctxRef: RefObject<CanvasRenderingContext2D | null>,
    particlesArr: Particle[],
    pxlBallImgEl: HTMLImageElement,
    audioContext: AudioContext,
    collisionAudioBuffer: AudioBuffer
) {
    if (!canvasRef.current || !ctxRef.current) return null;

    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drawParticles(canvasRef, ctxRef, particlesArr, pxlBallImgEl);
    changeParticlesCoordinates(particlesArr, audioContext, collisionAudioBuffer);

    animationId = requestAnimationFrame(animate.bind(
        null,
        canvasRef,
        ctxRef,
        particlesArr,
        pxlBallImgEl,
        audioContext,
        collisionAudioBuffer
    ));
}

function startEffect(
    canvasRef: RefObject<HTMLCanvasElement | null>,
    ctxRef: RefObject<CanvasRenderingContext2D | null>,
    particlesArr: Particle[],
    pxlBallImgEl: HTMLImageElement,
    audioContext: AudioContext,
    collisionAudioBuffer: AudioBuffer
) {
    if (animationId !== null)
        cancelAnimationFrame(animationId);

    animate(canvasRef, ctxRef, particlesArr, pxlBallImgEl, audioContext, collisionAudioBuffer);
}

function redistributeParticles(
    canvasDimensions: { width: number; height: number },
    particlesArrRef: RefObject<Particle[]>
) {
    for (const particle of particlesArrRef.current) {
        particle.x = (canvasDimensions.width / 2) - particle.radius;
        particle.y = (canvasDimensions.height / 2) - particle.radius;

        particle.canvasWidth = canvasDimensions.width;
        particle.canvasHeight = canvasDimensions.height;
    }
}

export { initializeCanvas, startEffect, redistributeParticles };