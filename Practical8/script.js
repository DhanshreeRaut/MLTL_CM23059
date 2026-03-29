let mobilenetModel;
let classifier;
let net;

let trainingData = [];
let labels = [];
let labelMap = {};

// 1️⃣ Load MobileNet Model
async function loadModel() {
    mobilenetModel = await mobilenet.load();
    net = mobilenetModel;

    // Custom classifier
    classifier = tf.sequential();
    classifier.add(tf.layers.dense({
        units: 100,
        activation: 'relu',
        inputShape: [1024]
    }));
    classifier.add(tf.layers.dense({
        units: 10,
        activation: 'softmax'
    }));

    classifier.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy'
    });

    console.log("✅ MobileNet Loaded!");
}

loadModel();

// 2️⃣ Image Preview
document.getElementById("imageUpload").onchange = function(event) {
    let img = document.getElementById("preview");
    img.src = URL.createObjectURL(event.target.files[0]);
};

// 3️⃣ Add Training Example
async function addExample() {

    let img = document.getElementById("preview");
    let label = document.getElementById("label").value;

    if (!label) {
        alert("Enter label!");
        return;
    }

    // Create label index
    if (!(label in labelMap)) {
        labelMap[label] = Object.keys(labelMap).length;
    }

    // Extract features using MobileNet
    let activation = net.infer(img, true);

    trainingData.push(activation);
    labels.push(labelMap[label]);

    console.log("Added example:", label);
    alert("Example added: " + label);
}

// 4️⃣ Train Classifier
async function train() {

    if (trainingData.length === 0) {
        alert("Add some training data first!");
        return;
    }

    const xs = tf.concat(trainingData);

    const ys = tf.oneHot(
        tf.tensor1d(labels, 'int32'),
        Object.keys(labelMap).length
    );

    console.log("Training started...");

    await classifier.fit(xs, ys, {
        epochs: 20
    });

    console.log("Training complete!");
    alert("Training complete!");
}

// 5️⃣ Predict Image
async function predict() {

    let img = document.getElementById("preview");

    if (!img.src) {
        alert("Upload image first!");
        return;
    }

    let activation = net.infer(img, true);
    let prediction = classifier.predict(activation);

    let index = prediction.argMax(1).dataSync()[0];

    let labelName = Object.keys(labelMap).find(
        key => labelMap[key] === index
    );

    document.getElementById("result").innerText =
        "Result: " + labelName;

    console.log("Prediction:", labelName);
}