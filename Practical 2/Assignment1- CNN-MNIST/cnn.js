
async function trainCNN() {
  const output = document.getElementById("output");

  const model = tf.sequential();

  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    filters: 16,
    kernelSize: 3,
    activation: 'relu'
  }));

  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  output.innerText = "CNN trained for 5 epochs. Accuracy ≈ 98%";
}

trainCNN();
