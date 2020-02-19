---
layout: post
title: "Hands on BERT"
categories: Tutorials
---

## Setup

_This notebook is available on [Google Collab](https://colab.research.google.com/drive/1HsJdnp-cQOuIF6NQzcwK-MhChYxukttn)._

_Alternatively, you can `wget` it:_ 
```bash
$wget https://gist.githubusercontent.com/ab-10/6c758b1aedfe1bf25bfea930331d3864/raw/69e92a5017192768e52e651eb355a0c77a8bdbd6/BERTWorkshop.ipynb
```

## Goals

In this workshop, you'll learn the basics of using pre-trained BERT models. In particular, we'll use the 🤗Transformers library (that's Huggingface Transformers), which provides TensorFlow and PyTorch implementations and pre-trained weights of the state-of-the-art transformer models.

Documentation is available [here](https://huggingface.co/transformers/)

This workshop will cover:

1. Basics of tokenization with BERT vocabulary file.

2. Usage of BERT for masked word prediction.

3. Using BERT as input features to a feedforward neural-network


## Imports

```python
import torch
import nltk
from transformers import BertTokenizer, BertForMaskedLM, BertModel
```

Let's load the pretrained models. We are using BERT base (as compared to large) and uncased (i.e. cased insensitive).


```python
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForMaskedLM.from_pretrained('bert-base-uncased')
```

## Tokenization

`BertTokenizer` is our interface from natural language text to BERT models and back. The tokenizer takes care of preprocessing text so that it's compatible with the BERT models, including `BertForMaskedLM`. In particular, it takes care of tokenizing, converting tokens to BERT vocabulary IDs, adding special tokens, and model-specific paddings (those will become relevant once we're fine-tuning).


```python
text = "Brevity is the soul of wit."
tokens = tokenizer.tokenize(text)
print(f'Tokens: {tokens}')
print(f'Tokens length: {len(tokens)}')
encoding = tokenizer.encode(text)
print(f'Encoding: {encoding}')
print(f'Encoding length: {len(encoding)}')
```

    Tokens: ['br', '##ev', '##ity', 'is', 'the', 'soul', 'of', 'wit', '.']
    Tokens length: 9
    Encoding: [101, 7987, 6777, 3012, 2003, 1996, 3969, 1997, 15966, 1012, 102]
    Encoding length: 11


[Hmm](https://en.wikipedia.org/wiki/Hidden_Markov_model), how come there are two additional tokens in the encoding of the text?

And why are some words split?

Let's first find out what the special tokens are. Tokenizer's operations are reversible.


```python
encoding_ids = tokenizer.convert_ids_to_tokens(encoding)
print(f'Encoding ids: {encoding_ids}')
```

    Encoding ids: ['[CLS]', 'br', '##ev', '##ity', 'is', 'the', 'soul', 'of', 'wit', '.', '[SEP]']


So what are those sneaky `[CLS]` and `[SEP]` tokens?

>The first token of every sequence is always a special classification  token  (`[CLS]`).  The  final  hidden  state corresponding  to  this  token  is  used  as  the  aggregate sequence representation for classification tasks.   Sentence pairs are packed together into asingle sequence. We differentiate the sentences in two ways.  First, we separate them with a special token (`[SEP]`). Second, we add a learned embedding to every token indicating whether it belongs to sentenceA or sentenceB. [(Devlin 2019)](https://www.aclweb.org/anthology/N19-1423.pdf)

## Bert for Masked Word Prediction

Now that you've had a glance at the tokenization, let's apply that to one of the two tasks BERT was trained for — masked word prediction.

I'm going to introduce the third special token: `[MASK]`.
As the name suggests we will use it to mask out the word we want BERT to predict.


```python
# Obtain the id of the token we want to replace
wit_index = encoding_ids.index('wit')
```


```python
# [MASK] the token
encoding_ids[wit_index] = '[MASK]'
# add_special_tokens=False, because we've already added them
# return_tensors='pt' specifies that we want a PyTorch tensor
# instead of the default Python list
input_ids = tokenizer.encode(encoding_ids, add_special_tokens=False,
                return_tensors='pt')
predictions = model(input_ids)[0]
```

So what the heck are `predictions`. Try `predictions.shape` and see whether you recognize any numbers.


```python
predictions.shape
```




    torch.Size([1, 11, 30522])



- The dimension 0 size (1) is trivial.

- You should be able to recognize where the size of dimension 1 comes from (what's the length of the input tensor).

- But what are the 30522 entries in dimension 2? Let's see!


```python
witty_predictions = predictions[0][wit_index]
```


```python
_, max_prediction = witty_predictions.max(0)
tokenizer.convert_ids_to_tokens([max_prediction])
```




    ['man']



> Brevity is the soul of man.

BERT isn't particularly poetic that's for one.

What did I just do though? If you haven't noticed yet the 30522 is the default vocabulary size of BERT

![BERT vocabulary size config](https://i.imgur.com/VIDK2CT.png)

[Source: Hugginface Transformers docs](https://huggingface.co/transformers/model_doc/bert.html)

So the values at each index `i` corespond to the logits of that word `i` in the vocabulary being the token.

_Exercise: find out the probability of 'wit' being the masked token!_

1. Normalize the scores. (using torch.nn.functional.softmax(`tensor`,dim=`which dimension do you want to normalize?`)

2. Obtain the vocabulary index using tokenizer.encode(`[str]`, add_special_tokens=False)

3. I _hope_ this step is obvious.


```python

```

_Extra credit:_ likewise calculate the probability of the final full stop (don't forget to obtain new encoding ids and mask the dot.

Can you explain the result?

What are the result's implications in sentences with missing punctuation?


```python

```

## POS tagging with BERT

Part-of-speech (POS) tags denote the grammatical role that a token plays in a sentence. We'll be using the [universal tagset](http://arxiv.org/abs/1104.2086), consisting of 12 tags most of which you're already familiar with (e.g. nouns, verbs, adjectives, etc.).

Considering the fact that POS tags express simple grammatical information about words, it should be fairly straightforward to create a POS classifier from BERT embeddings. As a matter of fact [(Hewitt and Manning 2019)](https://www.aclweb.org/anthology/N19-1419.pdf) have shown that contextualized word embeddings represent syntax trees by mapping the trees from linear transformations on the embeddings


```python
embedder = BertModel.from_pretrained('bert-base-uncased')
```

First, let's obtain the word embeddings!


```python
input_ids = tokenizer.encode(text, return_tensors='pt')
last_hidden_state, pooler_out = embedder(input_ids)
```

`last_hidden_state` contains the embeddings we're interested in.

Its shape should look familiar (768 is the hidden_size):


```python
last_hidden_state.shape
```




    torch.Size([1, 11, 768])



And here's the embedding we're looking for:


```python
witty_embedding = last_hidden_state[0][wit_index]
witty_embedding.shape
```




    torch.Size([768])



_Exercise:_ define a function
    
`get_embedding(tokens:List[str], word:str) -> Torch.tensor`

That returns the embedding of a word in that sentence


```python
def get_embedding(tokens, word):
    raise NotImplementedError
```

Second, let's get the POS tags!


```python
nltk.download('tagsets')
```

    [nltk_data] Downloading package tagsets to /home/sartre/nltk_data...
    [nltk_data]   Package tagsets is already up-to-date!





    True




```python
tokens = nltk.word_tokenize(text)
nltk.pos_tag(tokens, tagset='universal')
```




    [('Brevity', 'NOUN'),
     ('is', 'VERB'),
     ('the', 'DET'),
     ('soul', 'NOUN'),
     ('of', 'ADP'),
     ('wit', 'NOUN'),
     ('.', '.')]




```python
UNIVERSAL_TAGS  = {'VERB':0,
                  'NOUN': 1,
                  'PRON': 2,
                  'ADJ' : 3,
                  'ADV' : 4,
                  'ADP' : 5,
                  'CONJ': 6,
                  'DET' : 7,
                  'NUM' : 8,
                  'PRT' : 9,
                  'X'   : 10,
                  '.'   : 11}
```

And finally, the meat of our soup — let's define the neural net. I'll start with a single layer.

Since our input is a single-word BERT embedding, the layer input size is the BERT layer size and the output size is the number of categories.

Note, the model doesn't apply softmax to the outputs, because we're using cross entropy loss, which applies the softmax for us.


```python
TAG_COUNT = len(UNIVERSAL_TAGS)
BERT_LAYER_SIZE = 768
class NNet(torch.nn.Module):
    
    def __init__(self):
        super(NNet, self).__init__()
        self.fc1 = torch.nn.Linear(BERT_LAYER_SIZE, TAG_COUNT)
    def forward(self, x):
        x = self.fc1(x)
        return x
```

Let's obtain our data. NLTK labelled datasets with one of the several tagsets, but not the universal one (which we're using since it is the simplest one).

So let's make one!

We'll use [Emma by Jane Austen](https://www.goodreads.com/book/show/6969.Emma) from [Project Gutenberg](https://www.gutenberg.org/).


```python
nltk.download('gutenberg')
```

    [nltk_data] Downloading package gutenberg to /home/sartre/nltk_data...
    [nltk_data]   Package gutenberg is already up-to-date!





    True




```python
sentences = []
for sent in nltk.corpus.gutenberg.sents('austen-emma.txt'):
    sentences.append(sent)
```


```python
len(sentences)
```




    7752



I've limited the number of sentences we're processing to 200, to limit the compute time. However, in the final setup ideally, you'd run it on > 1000 sentences.


```python
embeddings = []
tags = []
for tokens in sentences[:200]:
    input_ids = tokenizer.encode(tokens, add_special_tokens=True, return_tensors='pt')
    embed_sent, _ = embedder(input_ids)
    tag_sent = nltk.pos_tag(tokens, tagset='universal')
    for i in range(len(input_ids)):
        # index embed_sent at i+1 to skip the [CLS] token
        embeddings.append(embed_sent[0][i+1])
        tags.append(UNIVERSAL_TAGS[tag_sent[i][1]])
```


```python
# The Adam learning rate, this is the first hyperparameter you should
# optimize
LR = 0.01
```


```python
nnet = NNet()
optimizer = torch.optim.Adam(nnet.parameters(), lr=LR)
criterion = torch.nn.CrossEntropyLoss()
```


```python
nnet.train()
errors = []
# asumes that pos and neg train examples have the same len


for x,y in zip(embeddings,tags):
    optimizer.zero_grad()    # Forward pass
    y_pred = nnet(x)    # Compute Loss
    loss = criterion(y_pred.unsqueeze(0), torch.tensor([y]))
    # errors.append(loss)
    print(f"Loss: {loss}")\

    loss.backward()
    optimizer.step()
```

    Loss: 2.5722880363464355
    Loss: 0.48622024059295654
    Loss: 0.007227702531963587
    ...
    Loss: 5.673869609832764
    Loss: 13.888348579406738
    Loss: 0.953713595867157
    Loss: 4.097711086273193


So how well did we do? Let's see on our running example!


```python
tokens = nltk.word_tokenize(text)
input_ids = tokenizer.encode(tokens, return_tensors='pt', add_special_tokens=False)
embeddings, _ = embedder(input_ids)
predictions = nnet(embeddings)
truth = nltk.pos_tag(tokens, tagset='universal')
```


```python
INVERSE_TAGS = {}
for tag in UNIVERSAL_TAGS:
    INVERSE_TAGS[UNIVERSAL_TAGS[tag]] = tag
```


```python
_, tags = predictions.max(2)
' '.join([INVERSE_TAGS[tag.item()] for tag in tags[0]])
```




    'PRON PRON DET DET DET PRON NOUN'




```python
truth
```




    [('Brevity', 'NOUN'),
     ('is', 'VERB'),
     ('the', 'DET'),
     ('soul', 'NOUN'),
     ('of', 'ADP'),
     ('wit', 'NOUN'),
     ('.', '.')]



Ugh, looks awful! How do we make it better?

1. Increase the sample size.

2. Adjust the hyperparameter(s).

3. Increase the number of layers.
