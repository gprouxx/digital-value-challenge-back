# Intro

We want now to expose the tree relationships directly in the api so the client can display the tree structure. The second step consists in exposing the ancestors by listing all the ancestor categories of every category. For example, the path of the ancestors of `Jam` category is `Products`, `Spread`.

# Level 3 - Expose the tree structure: the ancestors

Add the `ancestors` attribute to the existing GET endpoint that satisfies the following schema:

```json
[
  {
    "id": 250162,
    "name": "Products",
    "ancestors": [],
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
    "ancestors": [
      {
        "id": 250162,
        "name": "Products"
      }
    ],
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
    "id": 250378,
    "name": "Jam",
    "ancestors": [
      {
        "id": 250162,
        "name": "Products"
      },
      {
        "id": 250222,
        "name": "Spread"
      }
    ],
    "children": []
  }
  // ...
]
```

Then go to [next level](../level4) (optional)
