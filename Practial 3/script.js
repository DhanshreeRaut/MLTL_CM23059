const positiveWords = ["happy", "good", "great", "awesome", "excellent", "love"];
const negativeWords = ["sad", "bad", "terrible", "worst", "hate", "angry"];

function predict() {

const text = document.getElementById("text").value.toLowerCase();
const body = document.body;

if (text.trim() === "") {
alert("Please enter some text");
return;
}

let score = 0;

positiveWords.forEach(word => {
if (text.includes(word)) score++;
});

negativeWords.forEach(word => {
if (text.includes(word)) score--;
});

let resultText = "Neutral 😐";
body.className = "neutral";

if (score > 0) {
resultText = "Positive 😊";
body.className = "positive";
}

if (score < 0) {
resultText = "Negative 😞";
body.className = "negative";
}

document.getElementById("result").innerText = resultText;

}

function resetPage(){

document.getElementById("text").value = "";
document.getElementById("result").innerText = "";
document.body.className = "neutral";

}