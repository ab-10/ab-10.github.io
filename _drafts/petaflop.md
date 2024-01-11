---
layout: post
title: "Why does it take 1 Petaflop to run neural net with 220B parameters?"
draft: true
---

TODO: update the number of parameters and flops in the title based on 70B

Organize the article by:
1. Running GPT2 in Google Colab and showing the compute requirements practically.
2. Demonstrating how the number of parameters scales from GPT2 to 70B LLAMA

# Roadmap

1. Understand the basic structure of the transformer.
   https://jaykmody.com/blog/gpt-from-scratch/
2. Understand KV cache
   https://www.dipkumar.dev/becoming-the-unbeatable/posts/gpt-kvcache/
3. Understand Transformer Inference Artithmetic
   https://kipp.ly/transformer-inference-arithmetic/
