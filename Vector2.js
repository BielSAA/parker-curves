class Vector2 {
    /**
     * Creates a new Vector2
     * 
     * @constructor
     * @param {(Number|undefined)} x X coord
     * @param {(Number|undefined)} y Y coord
     */
    constructor(x, y) {
        this.x = Number(x) || 0;
        this.y = Number(y) || 0;
    }

    /**
     * Returns a new Vector2 identical to the first one
     * 
     * @returns {Vector2} new 2D vector
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
}