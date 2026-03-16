let model;

// Load MobileNet model in the browser
async function loadModel() {
    model = await mobilenet.load();
    console.log("MobileNet model loaded!");
}
loadModel();

// Handle image upload
const imageUpload = document.getElementById('image-upload');
const inputImage = document.getElementById('input-image');
const predictionsDiv = document.getElementById('predictions');

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        inputImage.src = e.target.result;
        inputImage.onload = classifyImage; // classify after image loads
    }
    reader.readAsDataURL(file);
});

// Classify the uploaded image
async function classifyImage() {
    predictionsDiv.innerHTML = "Classifying...";

    const predictions = await model.classify(inputImage);

    predictionsDiv.innerHTML = "<h3>Top-3 Predictions:</h3>";
    predictions.forEach((pred, index) => {
        predictionsDiv.innerHTML += `<p>${index + 1}. ${pred.className} - ${(pred.probability * 100).toFixed(2)}%</p>`;
    });
}