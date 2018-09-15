Math.TAU = Math.PI * 2;
window.addEventListener("load", () => {
    const canvas = document.getElementById("pcurves"),
             ctx = canvas.getContext("2d");

    let turntables = new Array();
    //                                        x    y  radius speed  angle stickSize
    turntables.push(new Turntable(new Vector2(400, 100), 50, 0.03,   0,   300));
    turntables.push(new Turntable(new Vector2(100, 400), 50, 0.09,   0,   300));
    // Uncomment below for crazyness
    // turntables.push(new Turntable(new Vector2(400, 400), 50, 0.06,   0,   300));

    let parkerPoints = new Array();

    function drawParkerCurves() {
        let i, j;

        for(i = 0; i < turntables.length; i++)
            for(j = i + 1; j < turntables.length; j++)
                parkerPoints = parkerPoints.concat(turntables[i].drawParkerPoints(turntables[j], ctx)).slice(1450 - 950*turntables.length);
        
        ctx.save();

        parkerPoints.forEach((p, n) => {
            let t = n/parkerPoints.length;
            ctx.fillStyle = `rgba(240, 49, 7, ${1 - (1 - t)*(1 - t)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.TAU);
            ctx.fill();
        });

        ctx.restore();
    }

    function drawFrame() {
        /* Changing canvas size, if needed */
        if(canvas.width != window.innerWidth || canvas.height != window.innerHeight){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        /* Updating turntables */
        turntables.forEach(t => t.update());
        
        /* Clearing canvas */
        ctx.fillStyle = "#420000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Drawing the turntables */
        turntables.forEach(t => t.draw(ctx));

        /* Drawing the parker curves */
        drawParkerCurves();

        /* Next frame */
        requestAnimationFrame(drawFrame);
    }
    requestAnimationFrame(drawFrame);
});