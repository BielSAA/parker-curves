window.addEventListener("load", () => {
    const canvas = document.getElementById("pcurves"),
             ctx = canvas.getContext("2d");

    let turntables = new Array();

    function drawFrame() {
        /* Changing canvas size, if needed */
        if(canvas.width != window.innerWidth || canvas.height != window.innerHeight){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        /* Clearing canvas */
        ctx.fillStyle = "#420000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Drawing the turntables */
        turntables.forEach(t => t.draw(ctx));

        /* Next frame */
        requestAnimationFrame(drawFrame);
    }
    requestAnimationFrame(drawFrame);
});