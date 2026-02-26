## Background


What problem is KV cache solving?

As `k` and `v` are computed from `x` at each layer, how can they be cached?

```python
def self_attention(x, w_k, w_q, w_v, w_proj): # [n_seq, n_embd] -> [n_seq, n_embd]
    # qkv projections
    q = x @ w_k # [n_seq, n_embd] @ [n_embd, n_embd] -> [n_seq, n_embd]
    k = x @ w_q # [n_seq, n_embd] @ [n_embd, n_embd] -> [n_seq, n_embd]
    v = x @ w_v # [n_seq, n_embd] @ [n_embd, n_embd] -> [n_seq, n_embd]

    # perform self attention
    x = attention(q, k, v) # [n_seq, n_embd] -> [n_seq, n_embd]

    # out projection
    x = x @ w_proj # [n_seq, n_embd] @ [n_embd, n_embd] -> [n_seq, n_embd]

    return x
```

## KV Cache in _gpt from scratch_

1. only pass the last token for inference
2. compute k and v for that token as normal
3. **special step:** `k = k_cached || k`, `v = v_cached || v`
4. compute attention as normal

## Theoretical advantages of KV cache

1. Which operations does caching `k` and `v` save?
2. From these operations, which ones are the most computationally expensive?
3. What are the memory costs of KV cache?


## KV Cache in 🤗

`model.forward(input, use_cache=True).past_key_values` has shape -> `[32, 2, 1, 32, sequence_len, 128]`

TODO: explain each dimension's size and how it relates to the original concept of KV cache?

## How much does KV cache speed 🤗 inference?

With 100 tokens:

W/ kv cache: `1.65 s ± 7.52 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)`

W/o kv cache: `3.81 s ± 124 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)`


## Further exploration

1. How does this compare with inference arithmetic suggested by: https://kipp.ly/transformer-inference-arithmetic/#kv-cache

2. How does it scale with changes in context size and model size?

3. What is the output of `model.forward` when `use_cache=None`? Why is using that output slower than no cache?
4. How does calling `model.forward` with all past tokens compare to calling it with only the last token?
5. How does using KV cache compare on a CPU and GPU?

## Where to go from here?

### RWKV

[RWKV](https://arxiv.org/abs/2305.13048) solves a similar problem to KV cache by slightly changing the transformer architecture.
Instead of caching values, RWKV makes every layer of every state only depend on the previous layer of the same depth.

![](../../asssets/rwkv.gif)

[Image credit](https://wiki.rwkv.com/advance/architecture.html)

### Paged Attention

[Paged Attention](https://arxiv.org/abs/2309.06180)
