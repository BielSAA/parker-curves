Math.TAU = Math.PI * 2;
window.addEventListener("load", () => {
    const canvas = document.getElementById("pcurves"),
             ctx = canvas.getContext("2d");

    let turntables = new Array();
    turntables.push(new Turntable(new Vector2(400, 100)));
    turntables.push(new Turntable(new Vector2(100, 400), null, 0.06));

    let parkerPoints = new Array();

    function drawParkerCurves() {
        let i, j;

        for(i = 0; i < turntables.length; i++)
            for(j = i + 1; j < turntables.length; j++)
                turntables[i].drawParkerPoints(turntables[j], ctx);
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