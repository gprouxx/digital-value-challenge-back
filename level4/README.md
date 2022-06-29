# Intro

Now we have exposed the tree structure, we want to expose the historical search volume of any categories. Remember, the metric is only associated to the leaf categories. For the non-leaf categories, the metric corresponds to the sum of the metrics of its descendants.

# Level 4 - Expose the historical search volume (optional)

Implement a new endpoint that expose the average monthly volumes in the last 24 months of a category at any level of the tree that satisfies the following schema:

```json
{
  "category": {
    "id": 274714,
    "name": "Chocolate candy and praline"
  },
  "averageMonthlyVolume": 799705
}
```

# Bonus

Surprise us! Add a feature that you think would work well here.
