---
layout: post
title: "What on Earth is Natural Language Processing?"
categories: Reviews
---

![A confused reader](/assets/whatisnlp/reader.png)

Back in the days when dinner parties were still legal[^1], whenever I would mention that I research NLP, I would receive nothing more than awkward silence and confused looks in response.
There's a good reason behind the confusion: most people don't know what the term *natural language* refers to (despite using at least one daily), and they're equally puzzled by what *processing* means in relation to machines of either mechanical or the [Turing](https://www.cl.cam.ac.uk/projects/raspberrypi/tutorials/turing-machine/one.html#one-one) kind.


In the context of NLP *natural language* roughly refers to any language humans use to communicate between themselves, as opposed to programming languages.
I say *roughly* because the term should also exclude *all* constructed languages, even though some of them, such as Esperanto, are used for human communication and in the author's humble opinion are [fair game for NLP](https://github.com/fidelisrafael/esperanto-analyzer).

The *processing* bit is where all of the [magic](https://youtu.be/mwkmgqbYXdE) (and confusion) happens.
Intuitively language is abstract, whereas computer algorithms are as precise as something gets.
Therefore, it is reasonable to be surprised at the fact that computers can be of any use for the task of understanding language.

So how do we reconcile the abstract nature of language with the exact requirements for building programs?
We look for **regularities** in language and make **simplifying assumptions** about it.
For example, a simple, yet fundamental algorithm for NLP — [TFIDF]({% post_url 2017-10-01-NewsSimilarityTutorial %}) — makes an assumption that a word's relevance decreases as more documents use it and the relevance increases with the number of uses in the individual document.
For example, the Wikipedia article about [Siamosaurus](https://en.wikipedia.org/wiki/Siamosaurus) mentions *is* 57 times and *dinosaur* 31 times, however, because the word *is* occurs in almost every Wikipedia article, whereas *dinosaur* does not*,* we can infer that *dinosaur* is more relevant to Siamosaurus than *is*.
I'll leave calculating the relevant TFIDF values as an exercise for the enthusiastic reader.

Some assumptions are common enough to have their own names.
For example, the bag of words assumption suggests that if you would cut up your text into words and put them into a bag, you wouldn't lose any meaning.
The distributional hypothesis is the most widespread assumption at the moment and according to which "you shall know a word by the company it keeps"[^2].

By now I hope you're wondering why these assumptions are useful, considering that they are incorrect.
Here lies the key in fitting the intangible natural language within the exact requirements of computation.
The cliché "perfect is the enemy of the good" is just as relevant in NLP as anywhere else.
By making simplifying assumptions we are explicit about (some of) the areas where the model will fail and are able to provide tangible results in other areas.

[^1]: Historical note (05/07/2025): this was due to COVID.
    Fortunately, the dinner parties in question are legal again!
    I occasionally invite readers of my blog there.
    If you're reading this, you're my kind of person and I'd like to see you there.
    Sign up to [my newsletter]({% link email.html %}) to stay in touch.

[^2]: Firth, J.R. (1957). "A synopsis of linguistic theory 1930-1955". Studies in Linguistic Analysis: 1–32.
