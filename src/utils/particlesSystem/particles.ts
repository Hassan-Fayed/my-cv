function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export default class Particle {
    static volumeValue = 0.5;
    #diameter: number;
    #radius: number;
    #x: number;
    #y: number;
    #vx: number;
    #vy: number;
    #canvasWidth: number;
    #canvasHeight: number;
    constructor(diameter: number, canvasWidth: number, canvasHeight: number) {
        this.#diameter = diameter;
        this.#radius = diameter / 2;

        this.#x = getRandomInt(0, canvasWidth - diameter);
        this.#y = getRandomInt(0, canvasHeight - diameter);

        this.#vx = getRandomFloat(-1, 1);
        this.#vx = this.#vx === 0 ? 0.1 : this.#vx;

        this.#vy = getRandomFloat(-1, 1);
        this.#vy = this.#vy === 0 ? 0.1 : this.#vy;

        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
    }

    get diameter() {
        return this.#diameter;
    }

    get radius() {
        return this.#radius;
    }

    get x() {
        return this.#x;
    }

    set x(newVal: number) {
        this.#x = Math.round(newVal);
    }

    get y() {
        return this.#y;
    }

    set y(newVal: number) {
        this.#y = Math.round(newVal);
    }

    get vx() {
        return this.#vx;
    }

    get vy() {
        return this.#vy;
    }

    set canvasWidth(newVal: number) {
        this.#canvasWidth = newVal;
    }

    set canvasHeight(newVal: number) {
        this.#canvasHeight = newVal;
    }

    updateX(audioBuffer: AudioBuffer, audioContext: AudioContext, audioStartTime = 0) {
        if (this.#x >= this.#canvasWidth - this.#diameter) {    // collision with the wall on the right
            this.#playCollisionSound(audioBuffer, audioContext, audioStartTime);
            this.#vx = Math.abs(this.#vx) * -1;
        } else if (this.#x <= 0) {     // collision with the wall on the left
            this.#playCollisionSound(audioBuffer, audioContext, audioStartTime);
            this.#vx = Math.abs(this.#vx);
        }


        this.#x = this.#x + this.#vx;
    }

    updateY(audioBuffer: AudioBuffer, audioContext: AudioContext, audioStartTime = 0) {
        if (this.#y >= this.#canvasHeight - this.#diameter) {   // collision with the ground
            this.#playCollisionSound(audioBuffer, audioContext, audioStartTime);
            this.#vy = Math.abs(this.#vy) * -1;
        } else if (this.#y <= 0) {  // collision with the Ceiling
            this.#playCollisionSound(audioBuffer, audioContext, audioStartTime);
            this.#vy = Math.abs(this.#vy);
        }

        this.#y = this.#y + this.#vy;
    }

    reverseVelocityDirection(axis: 'x' | 'y') {
        if (axis === 'x') {
            this.#vx *= -1;
        } else {
            this.#vy *= -1;
        }
    }

    #playCollisionSound(audioBuffer: AudioBuffer, audioContext: AudioContext, audioStartTime: number) {
        const bufferSource = audioContext.createBufferSource();
        bufferSource.buffer = audioBuffer;

        const volume = audioContext.createGain();
        volume.gain.value = Particle.volumeValue;

        bufferSource.connect(volume);
        volume.connect(audioContext.destination);

        bufferSource.start(audioStartTime);
    }
}