let model, webcam, canvas, ctx;

// Load Coco-SSD model
async function loadModel() {
    model = await cocoSsd.load();
    console.log("Coco-SSD model loaded!");
    startWebcam();
}

// Start webcam
async function startWebcam() {
    webcam = document.getElementById('webcam');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcam.srcObject = stream;
        webcam.addEventListener('loadeddata', detectFrame);
    } catch (err) {
        console.error("Webcam error:", err);
    }
}

// Detect objects frame by frame
async function detectFrame() {
    const predictions = await model.detect(webcam);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw predictions
    predictions.forEach(pred => {
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3]);

        ctx.fillStyle = "#00FFFF";
        ctx.font = "16px Arial";
        ctx.fillText(`${pred.class} - ${(pred.score*100).toFixed(1)}%`, pred.bbox[0], pred.bbox[1] > 20 ? pred.bbox[1]-5 : 10);
    });

    requestAnimationFrame(detectFrame);
}

// Start everything
loadModel();