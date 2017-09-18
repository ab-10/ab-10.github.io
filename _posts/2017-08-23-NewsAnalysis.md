---
layout: post
title: "Dissecting News Through The Power of Text Mining"
date: 2017-08-23 23:32:00 +0000
categories: Reflections
---

During my previous internship, I spent a lot of time searching and
perfecting a language independent algorithm that would filter out news
articles covering the same event. In this blog post I will describe my
search for that algorithm, including the process of testing potential
solutions.

From the very beginning, it was clear to me that the final project will
most likely consist of some sort of a similarity measure and an
assessment of whether the similarity exceeds the maximum allowed
threshold. In this article I will dissect my thought process, by first
explaining my choice of similarity measurement (Jaccard vs TF—IDF and
approach to comparing TF—IDF scores between articles) and then the
rationale behind setting the similarity thresholds.

Jaccard Similarity of Sets
--------------------------

Initially I tried using [Jaccard
Similarity](http://infolab.stanford.edu/~ullman/mmds/ch3.pdf), where I
would create a set of words from every article and compare similarity
between these sets. Admittedly, there are better ways of creating the
sets, such as ignoring [stop
words](https://www.researchgate.net/publication/273127322_Preprocessing_Techniques_for_Text_Mining).
However in this project I was unable to do that, due to the number of
languages involved.

Initially this algorithm looked promising for my project, however after
implementing and testing it, Jaccard Similarity did not provide the
expected results. Its main flaw is not taking into account importance of
the word in the text, thereby allowing common words to create excessive
noise. Therefore, this approach left me searching for an algorithm, that
would also assess the importance of the word.

TF-IDF
------

Term Frequency — Inverse Document Frequency or simply
[TF-IDF](http://blog.christianperone.com/2011/09/machine-learning-text-feature-extraction-tf-idf-part-i/)
is a score that assesses the importance of a term (in this case — a
word) in a document relative to a set of documents.

When using this method, the article comparison consists of two main
parts: calculating the TF—IDF scores for words and comparing the scores
between articles. The standard algorithm for comparison is [cosine
similarity](https://brenocon.com/blog/2012/03/cosine-similarity-pearson-correlation-and-ols-coefficients/)
and it works well for comparing the degree of similarity, but is
resource expensive.

This method provides similarity of articles relative to the group that
they belong to, therefore prior grouping of the articles can increase
the accuracy of measurements. For example I conducted my first trial
using a set of 200 documents written in approximately 10 different
languages, as a result the similarity scores only predicted the language
that the document belonged to and could vaguely indicate similar news
topics. However, when I split the articles into language groups, I was
able to set threshold for filtering out articles covering same events.

However, I believe that there's room for performance improvement. Since
we are exclusively concerned about whether the similarity exceeds the
threshold, we can take advantage of this fact when labeling words as
either important or not and thus take advantage of boolean operations in
article comparison. I further discuss this idea under 'Other
Comparisons' subsection, however I haven't perfected the idea to a point
where it would be superior to Cosine Comparison.

### Calculating Weights

Calculating the importance of each word in a document, using TF—IDF
weights, is straightforward and follows a simple formula:

\\[ TFIDF = TF * IDF \\]

$$TF = W / N$$

*Where:*

W \\( \leftarrow \\) number of occurrences of a word in the article

N \\(\leftarrow\\) number of words in the article

$$IDF = ln(D/O)$$

*Where:*

O \\(\leftarrow\\) number of documents containing the word

D \\(\leftarrow\\) total number of documents

### Cosine Comparison

When comparing TF—IDF scores of articles, cosine comparison is the
standard approach and it is the one that I ended up using in my final
implementation.

Formula for calculating similarity between vectors containing TF—IDF
weights A and B is as follows:

$$Cosine Similarity = \frac{ \sum\limits_{i=1}^{n}{A_i B_i} }{ \sqrt{\sum\limits_{i=1}^{n}{A_i^2}} \sqrt{\sum\limits_{i=1}^{n}{B_i^2}} }$$

Under the current implementation this formula can be nicely extended for
entire dataframes.

\\(A \leftarrow\\) matrix containing TF—IDF scores, with each row belonging
to a particular article and each column to a word.

\\(n \leftarrow\\) no. of words

$$S_i \leftarrow \sqrt{\sum\limits^{n}_{j=1} A_{ij}^{2}}$$

### Other Comparisons

While implementing the TF-IDF algorithm, I tried optimising the vector
comparison, by marking a word as either important `true` or unimportant
`false`. Then I would calculate the similarity by dividing the number of
words marked as `true` in both the articles with the number of words
marked as `true` in both articles.

Initially I thought that this might be a significantly more efficient
approach than the cosine similarity, since the loop in which word values
are marked as `true` or `false` has to run only once and boolean
operations between words in articles are very efficient. Nevertheless,
after a more careful consideration of the algorithm I realised that
there are a couple of disadvantages to its efficiency. First, since
comparison has to be made between all article pairs the growth rate ends
up being \\(n^2)\\ just with a lower coefficient. Second, cosine similarity
can be implemented in R using a couple of highly optimised dataframe
operators, while my proposed algorithm presents an optimisation problem
in itself. The bottom line being that while the method is promising, it
presents optimisation problems too large to make it viable for this
project.

Setting Thresholds
------------------

At this point I have chosen to use TF—IDF weights to assess the
importance of words within articles and cosine similarity, to compare
the 'important words' between articles. In this section I explain my
thought process, when setting the cosine similarity values of TF—IDF
weights, above which articles are labeled as duplicates.

Initially I tried comparing the articles by exclusively assessing the
similarity scores within the main text, yet it wasn't enough, since it
would give unreasonably high similarity scores between events of the
same type, with different subjects (two different stocks go up or two
different football teams win).

Because of this, I decided to compare the similarity between titles
first and then set different similarity thresholds for the full text.
For my dataset, I've found a good threshold for labeling articles as
repeats to be 0.2 full text similarity, when title similarity exceeds
0.2, full text similarity of 0.7, when title similarity is between 0.1
and 0.2 and 0.85 when title similarity is below 0.1.

This is the part of the process that will require the most fine—tuning,
based on the desired balance between removing all repeating information
and allowing the most unique items through.
