Math.TAU = Math.PI * 2;
class Turntable {
    /**
     * Creates a turntable
     * 
     * @constructor
     * @param {(Vector2|undefined)} pos Position of the turntable
     * @param {(Number|undefined)} radius Radius of the turntable
     */
    constructor(pos, radius) {
        this.pos = pos || new Vector2();
        this.size = radius || 50;
    }

    /**
     * Draws `this` on `ctx`
     * 
     * @param {CanvasRenderingContext2D} ctx Context to draw `this` into
     */
    draw(ctx) {
        ctx.save();

        ctx.fillStyle = "#730000";

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.TAU);
        ctx.fill();

        ctx.restore();
    }
}