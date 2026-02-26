---
layout: post
title: "Better PyTorch DataLoaders With Named Tuples."
categories: Tutorials
---

> Explicit is better than implicit

The first line of a PyTorch training loop normally looks like this:

`text, hypothesis, judgement = current_batch`

Or it might look like this 🤔:

`hypothesis, text, judgement = current_batch`

It's easy to forget the correct order and I prefer to make the components of my minibatch explicit.

`current_batch.hypothesis`

This blog post is going to demonstrate how to use `NamedTuples` to allow the above access.

We will implement a custom `torch.utils.data.Dataset` and will pass it to the `data.DataLoader`.

Our `InferenceDataset` is just a wrapper over `pandas.DataFrame` that returns `namedtuples` :

```python
class InferenceDataset(Dataset):

    def __init__(self, df: pd.DataFrame):
        self.df = df

    def __len__(self):
        return len(self.df)

    def __getitem__(self, key):
        assert type(key) is int, f"Non-intiger key ({key})"
        current_row = self.df.iloc[key]

        InfRow = namedtuple("InfRow", ("text", "hypothesis", "judgement"))
        return InfRow(text=current_row.text,
                      hypothesis=current_row.hypothesis,
                      judgement=current_row.judgement)
```

If you're not familiar with `namedtuple`s, returning an instance of `InfRow` might seem confusing, however, it just acts like a regular tuple with the added benefit of named access to fields.

Consequently, the vanilla tuple operations work:

```python
row = InfRow(text="I've believed as many as six impossible things before breakfast.",
	     hypothesis="I've believed in three impossible things before breakfast.",
	     judgement="implication")

# integer indexation is the same as for vanilla tuples
print(row[1])
>>> I've believed in three impossible things before breakfast

# and so is unpacking
text, hypothesis, judgement = row
```

The above is great news for backwards compatability, ensuring that you can modify and test your `DataLoaders` one at a time, while keeping the old code for training and inference.

In addition to the standard access methods, `namedtuples` provide the named fields, that we're after:

```python
# cont. from above
print(row.hypothesis)
>>> I've believed in three impossible things before breakfast
```

We construct the `InferenceDataset` by loading our dataset files into a `DataFrame` and passing the `DataFrame` to the `InferenceDataset` constructor:

```python
import pandas as pd
...
train_df = pd.read_csv(dataset_path)
train_dataset = InferenceDataset(train_df)
```

And then pass it to the `DataLoader`

```python
train_dataloader = DataLoader(
        train_dataset,
        sampler=RandomSampler(train_dataset),
        batch_size=batch_size)
```

And within normal iteration, we can access the minibatch fields by names:

```python
for batch in train_dataloader:
    prediction = model(batch.text, batch.hypothesis)
    ....
```
