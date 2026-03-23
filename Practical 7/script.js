// Load TensorFlow.js in HTML separately

let model;

// 1️⃣ Train Model
async function trainModel() {

    model = tf.sequential();

    model.add(tf.layers.dense({
        units: 1,
        inputShape: [1]
    }));

    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    // Training Data (y = 2x + 1)
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([3, 5, 7, 9], [4, 1]);

    console.log("Training started...");

    await model.fit(xs, ys, {
        epochs: 200
    });

    console.log("Training complete!");

    // Save model in LocalStorage
    await model.save('localstorage://my-model');

    console.log("Model saved in LocalStorage!");
}

// 2️⃣ Load Model
async function loadModel() {

    try {
        model = await tf.loadLayersModel('localstorage://my-model');
        console.log("Model loaded successfully!");
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

// 3️⃣ Predict Function
async function predict(value) {

    if (!model) {
        console.log("Model not loaded!");
        return;
    }

    const input = tf.tensor2d([[value]]);

    const prediction = model.predict(input);

    const output = await prediction.data();

    console.log("Prediction:", output[0]);

    return output[0];
}


// 🔥 Example Flow (Auto Run)
async function run() {
    await trainModel();      // Train & Save
    await loadModel();       // Reload

    let result = await predict(10);  // Predict for input 10

    console.log("Final Output for 10:", result);
}

run();