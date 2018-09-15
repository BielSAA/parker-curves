Math.TAU = Math.PI * 2;
class Turntable {
    /**
     * Creates a turntable
     * 
     * @constructor
     * @param {(Vector2|undefined)} pos Position of the turntable
     * @param {(Number|undefined)} radius Radius of the turntable
     * @param {(Number|undefined)} frequency Radians rotated every frame
     * @param {(Number|undefined)} startingAngle Angle to start on
     */
    constructor(pos, radius, frequency, startingAngle, stickSize) {
        this.pos = pos || new Vector2();
        this.size = radius || 50;
        this.rotation = startingAngle || 0; // Radians
        this.frequency = frequency || 0.03; // Radians / frame (60 fps on most screens)
        this.stickSize = stickSize || 300;
    }
    
    /**
     * Returns knobPosition
     * 
     * @returns {Vector2}
     */
    get knobPos() {
        return new Vector2(Math.cos(this.rotation), Math.sin(this.rotation))
                .scale(this.size - 10)
                .add(this.pos);
    }

    /**
     * Updates the turntable
     */
    update() {
        this.rotation += this.frequency;

        while(this.rotation >= Math.TAU)
            this.rotation -= Math.TAU;
    }

    /**
     * Draws `this` on `ctx`
     * 
     * @param {CanvasRenderingContext2D} ctx Context to draw `this` into
     */
    draw(ctx) {
        ctx.save();

        /* Drawing the turntable itself */
        ctx.fillStyle = "#730000";

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.TAU);
        ctx.fill();

        /* Drawing the knob */
        ctx.fillStyle = "#C10202";

        let knobPos = this.knobPos;

        ctx.beginPath();
        ctx.arc(knobPos.x, knobPos.y, 5, 0, Math.TAU);
        ctx.fill();

        /* Drawing possibility circle */
        ctx.strokeStyle = "#C10202";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.setLineDash([10, 30]);

        ctx.beginPath();
        ctx.arc(knobPos.x, knobPos.y, this.stickSize, 0, Math.TAU);
        ctx.stroke();

        ctx.restore();
    }
}