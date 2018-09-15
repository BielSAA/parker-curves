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

        return; // Uncomment this to see the possibility circles
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
    
    /**
     * Returns parker points
     * 
     * @param {Turntable} target Turntable to intersect sticks
     * @returns {Array<Vector2>} Parker points
     */
    getParkerPoints(target) {
        let p0 = this.knobPos,
            p1 = target.knobPos;
        
        let d, a, h;

        d = p0.clone().sub(p1).mag;
        a = (this.stickSize*this.stickSize + d*d - target.stickSize*target.stickSize)/(2*d);
        h = Math.sqrt(this.stickSize * this.stickSize - a*a);

        let p2 = p1.clone().sub(p0).scale(a/d).add(p0);

        let x0 = p2.x + h*(p1.y - p0.y)/d,
            y0 = p2.y - h*(p1.x - p0.x)/d,
            x1 = p2.x - h*(p1.y - p0.y)/d,
            y1 = p2.y + h*(p1.x - p0.x)/d;
        
        return [
            new Vector2(x0, y0),
            new Vector2(x1, y1)
        ];
    }

    /**
     * Draws and returns parker points
     * 
     * @param {Turntable} target Turntable to intersect sticks
     * @returns {Array<Vector2>} Parker points
     */
    drawParkerPoints(target, ctx) {
        let points = this.getParkerPoints(target),
            k0 = this.knobPos,
            k1 = target.knobPos;

        ctx.save();
        ctx.strokeStyle = "#C10202";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        points.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(k0.x, k0.y);
            ctx.lineTo(p.x, p.y);
            ctx.lineTo(k1.x, k1.y);
            ctx.stroke();
        });

        ctx.restore();
        return points;
    }
}