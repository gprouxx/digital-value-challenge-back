# Intro

We want now to expose the tree relationships directly in the api so the client can display the tree structure. The first step consists in exposing the direct children of the categories.

# Level 2 - Expose the tree structure: the children

Add the `children` attribute to the existing GET endpoint that satisfies the following schema:

```json
[
  {
    "id": 250162,
    "name": "Products",
    "children": [
      {
        "id": 250222,
        "name": "Spread"
      },
      {
        "id": 250224,
        "name": "Breakfast"
      }
    ]
  },
  {
    "id": 250222,
    "name": "Spread",
    "children": [
      {
        "id": 250378,
        "name": "Jam"
      },
      {
        "id": 250301,
        "name": "Honey"
      }
      // ...
    ]
  },
  {
    "id": 250224,
    "name": "Breakfast",
    "children": [
      // ...
    ]
  }
  // ...
]
```

Then go to [next level](../level3)
