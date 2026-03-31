let quotes = [
    {q:"Believe you can and you're halfway there.", a:"Theodore Roosevelt", c:"motivation"},
    {q:"Success is not final, failure is not fatal.", a:"Winston Churchill", c:"success"},
    {q:"In the middle of every difficulty lies opportunity.", a:"Albert Einstein", c:"life"},
    {q:"Dream big and dare to fail.", a:"Norman Vaughan", c:"motivation"},
    {q:"Do what you can, with what you have.", a:"Theodore Roosevelt", c:"life"},
    {q:"Hard work beats talent when talent doesn’t work hard.", a:"Tim Notke", c:"success"},
    {q:"Stay hungry, stay foolish.", a:"Steve Jobs", c:"motivation"},
    {q:"The best way to get started is to quit talking and begin doing.", a:"Walt Disney", c:"success"},
    {q:"Don’t let yesterday take up too much of today.", a:"Will Rogers", c:"life"},
    {q:"It always seems impossible until it’s done.", a:"Nelson Mandela", c:"motivation"},
    {q:"If you can dream it, you can do it.", a:"Walt Disney", c:"motivation"},
    {q:"Act as if what you do makes a difference.", a:"William James", c:"life"},
    {q:"Success usually comes to those who are too busy to be looking for it.", a:"Henry David Thoreau", c:"success"},
    {q:"Opportunities don't happen. You create them.", a:"Chris Grosser", c:"success"},
    {q:"Don’t watch the clock; do what it does. Keep going.", a:"Sam Levenson", c:"motivation"},
    {q:"The future depends on what you do today.", a:"Mahatma Gandhi", c:"life"},
    {q:"Everything you’ve ever wanted is on the other side of fear.", a:"George Addair", c:"motivation"},
    {q:"Quality means doing it right when no one is looking.", a:"Henry Ford", c:"success"},
    {q:"Happiness depends upon ourselves.", a:"Aristotle", c:"life"},
    {q:"Turn your wounds into wisdom.", a:"Oprah Winfrey", c:"life"}
];

let count = 0;
let autoInterval;

// Generate Quote
function generateQuote() {
    let category = document.getElementById("category").value;
    let filtered = category === "all" ? quotes : quotes.filter(q => q.c === category);

    let random = filtered[Math.floor(Math.random() * filtered.length)];

    document.getElementById("quote").innerText = random.q;
    document.getElementById("author").innerText = "- " + random.a;

    count++;
    document.getElementById("count").innerText = "Quotes Generated: " + count;
}

// Copy
function copyQuote() {
    navigator.clipboard.writeText(document.getElementById("quote").innerText);
    alert("Copied!");
}

// Speak
function speakQuote() {
    let msg = new SpeechSynthesisUtterance(document.getElementById("quote").innerText);
    speechSynthesis.speak(msg);
}

// Save Favorite
function saveFavorite() {
    let fav = document.getElementById("quote").innerText;
    localStorage.setItem("favQuote", fav);
    alert("Saved!");
}

// Auto Generate
function toggleAuto() {
    if(autoInterval){
        clearInterval(autoInterval);
        autoInterval = null;
    } else {
        autoInterval = setInterval(generateQuote, 3000);
    }
}

// Share
function shareQuote() {
    let text = document.getElementById("quote").innerText;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
}

// Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark");
}