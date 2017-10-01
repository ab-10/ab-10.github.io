---
layout: post
title: 'Using TF—IDF and Cosine Similarity to Identify Similar News Articles in R-Programming'
date: 2017-10-01 23:32:00 +0000
categories: Tutorials
---

_When trying to programmatically identify duplicate news articles, I had a hard time finding materials on the topic, so this guide attempts to fill the gap. In case you're interested in my thought process behind choosing the similarity measurements that I did, have a look at: [Dissecting News Through The Power of Text Mining]({{ site.baseurl }}{% post_url 2017-08-23-NewsSimilarityTutorial.md %})_

In this article I will use the [`tm library`](https://cran.r-project.org/web/packages/tm/index.html) in R, to create a similarity matrix between article titles and articles themselves. When such a matrix is created, I've found that specifying full text similarity thresholds for each title similarity level is the optimal approach. However the optimal thresholds depend on desired balance between eliminating duplicates and allowing unique articles through and thus should be adjusted by the reader based on their circumstances.

## Setup

So first things first, make sure that you have the `tm library` installed and call it. Then tell R to stop attempting categorizing your texts and finally import your dataset. In this example I read it from CSV file, but any method should be fine as long as you end up with a dataframe, that contains a column with titles and another one with full texts of articles.

```
library(tm)
options(stringsAsFactors = FALSE)
news = read.csv('news.csv')
```

## Preprocessing Using TM Library

While the TM library vastly simplifies and optimises the process of obtaining article similarity, it requires couple of data type transformations.

```
# Assumes that column 1 contains titles and 2 contains articles
titles = VectorSource(news[,1])
articles = VectorSource(news[,2])

# Change the language according to your texts
titleCorpus = SimpleCorpus(titles, control = list(language='en'))
articleCorpus = SimpleCorpus(articles, control = list(language='en'))
```

## Obtaining TF—IDF Weights

In this step I obtain a sparse matrix of TF—IDF weights and convert them to a standard matrix for further analysis.

```
titleTfidf = DocumentTermMatrix(titleCorpus, control = list(weighting = weightTfIdf))
articleTfidf = DocumentTermMatrix(articleCorpus, control = list(weighting = weightTfIdf))

titleMatrix = as.matrix(titleTfidf)
articleMatrix = as.matrix(articleTfidf)
```

## Calculating Cosine Similarity

While you can use an [external function](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/dist.html) for calculating cosine similarity between matrices, I prefer to avoid importing additional libraries for trivial tasks. To avoid redundancy I defined a function computing cosine similarity for a matrix and its inverse and call that for titles and full articles.

```
cos_sim = function(matrix){
    numerator = matrix %*% t(matrix)
    A = sqrt(apply(matrix^2, 1, sum))
    denumerator = A %*% t(A)
    return(numerator / denumerator)
}

titleSim = cos_sim(titleMatrix)
articleSim = cos_sim(articleMatrix)
```

## Eliminating Duplicates

This step requires the most fine tuning from the reader and while I do provide the thresholds that I used in my project, they should be adjusted based on the article nature. I have set the threshold for similarity as 0.2 full text similarity, when title similarity exceeds 0.2, 0.7 when title similarity is between 0.1 and 0.2 and 0.85 full text similarity for articles with title similarity below 0.1.

In my implementation, I specify only the bottom of title similarity window. This is because required article similarity for the title similarity window above it will always be lower and statements for each window are connected with `or` operator. That is to say that if an article above the statement's window is marked as `true`, it will be marked the same by the statement for that window. However, in the case that the statement for the window below marks an article as `false`, despite the window's statement marking it as `true`, it will be correctly marked as `true`, thanks to the `or` operator.


```
select = ((titleSim > 0.2) & (articleSim >= 0.2)) |
    ((titleSim >= 0.1) & (articleSim >= 0.7)) |
    (articleSim >= 0.85)
select1 = c(select)
select2 = c(t(select))
titles1 = rep(news[,4], length(news[,4]))
titles2 = rep(news[,4], length(news[,4]))
titles1 = titles1[select1]
titles2 = titles2[select2]
```

So now you have two vectors, `titles1` and `titles2`, that contain corresponding duplicate titles (so `titles1[n]` and `titles[n]` are the duplicate title pairs).

I hope this was helpful to your text mining. In case you have any questions or suggestions to this article, please leave a comment below and I'll do my best to reply.
