import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, SimpleRNN, Embedding, Flatten
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

sentences = [
    "I love this product",
    "This is amazing",
    "I am very happy",
    "I hate this",
    "This is terrible",
    "Very bad experience"
]

labels = [1,1,1,0,0,0]

tokenizer = Tokenizer(num_words=1000)
tokenizer.fit_on_texts(sentences)

sequences = tokenizer.texts_to_sequences(sentences)
padded = pad_sequences(sequences, maxlen=5)

X = np.array(padded)
y = np.array(labels)

model = Sequential([
    Embedding(1000,16,input_length=5),
    SimpleRNN(8),
    Dense(1,activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

model.fit(X,y,epochs=10)

test = ["This product is great"]
seq = tokenizer.texts_to_sequences(test)
pad = pad_sequences(seq,maxlen=5)

prediction = model.predict(pad)

print("Sentiment Score:", prediction)
