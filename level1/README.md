# Intro

You are asked to build a simple rest json api that presents a category tree and some metrics linked to the categories.

A small sqlite database is available in the file [db.sqlite](../db.sqlite) with 3 tables. The tables contain data that we'd like to present via an api.

- `categories`: the categories and the relation to their parent

```
┌────────┬───────────────────────────────┬───────────┐
│   id   │             name              │ parent_id │
├────────┼───────────────────────────────┼───────────┤
│ 250162 │          'Products'           │   null    │
│ 250222 │           'Spread'            │  250162   │
│ 250224 │          'Breakfast'          │  250162   │
│ 250301 │            'Honey'            │  250222   │
│ 250303 │       'Breakfast bread'       │  250224   │
│ 250328 │           'Butter'            │  250222   │
│ 250332 │      'Breakfast cereal'       │  250224   │
│ 250333 │      'Other nuts spread'      │  250222   │
│ 250378 │             'Jam'             │  250222   │
│ 253921 │        'Yeast extract'        │  250222   │
│ 258361 │   'Hazelnut & cocoa spread'   │  250222   │
│ 274714 │ 'Chocolate candy and praline' │  250162   │
│ 274734 │           'Praline'           │  274714   │
│ 274736 │       'Chocolate candy'       │  274714   │
└────────┴───────────────────────────────┴───────────┘
```

- `categories_closure`: the tree relationships, a set of node pairs for each path from the ancestor to a descendant, including a path to itself.

```
┌─────────────┬───────────────┐
│ ancestor_id │ descendant_id │
├─────────────┼───────────────┤
│   250162    │    250162     │
│   250162    │    250222     │
│   250222    │    250222     │
│   250162    │    250224     │
│   250224    │    250224     │
│   250224    │    250303     │
│   ...       │    ...        │
└─────────────┴───────────────┘
```

- `volumes`: the volume represents the number of searches per month in Google about the terms related to the category, the metric is associated to each leaf category

```
┌─────────────┬──────────────┬────────┐
│ category_id │     date     │ volume │
├─────────────┼──────────────┼────────┤
│   250301    │ '2018-07-01' │ 165890 │
│   250301    │ '2018-08-01' │ 231780 │
│   250301    │ '2018-09-01' │ 177260 │
│   250301    │ '2018-10-01' │ 209610 │
│   250301    │ '2018-11-01' │ 207770 │
│   ...       │ ...          │ ...    │
└─────────────┴──────────────┴────────┘
```

📝 If your db file get corrupted for any reason, run `yarn ts-node seeds` to reset the database

# Level 1 - Expose the list of categories

We want to expose the list of categories in a flat manner.

Implement a GET endpoint that exposes the categories and satisfies the following schema:

```json
[
  {
    "id": 250162,
    "name": "Products"
  },
  {
    "id": 250222,
    "name": "Spread"
  },
  {
    "id": 250224,
    "name": "Breakfast"
  }
  // ...
]
```

Then go to [next level](../level2)
