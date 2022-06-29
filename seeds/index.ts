import { open } from "sqlite";
import * as sqlite3 from "sqlite3";

import { categories } from "./data/categories.json";
import { volumes } from "./data/volumes.json";

(async () => {
  const db = await open({
    filename: "db.sqlite",
    driver: sqlite3.Database,
  });

  await db.run("DROP TABLE IF EXISTS categories");
  await db.run("DROP TABLE IF EXISTS categories_closure");
  await db.run("DROP TABLE IF EXISTS volumes");

  await db.run(`
    CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        parent_id INTEGER,
        FOREIGN KEY (parent_id) REFERENCES categories (id)
    )`);

  await db.run(`
    CREATE TABLE categories_closure (
        ancestor_id INTEGER,
        descendant_id INTEGER,
        FOREIGN KEY (ancestor_id) REFERENCES categories (id)
        FOREIGN KEY (descendant_id) REFERENCES categories (id)
    )`);

  await db.run(`
    CREATE TABLE volumes (
        category_id INTEGER,
        date DATE,
        volume INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    )`);

  for (const category of categories) {
    await db.run(
      "INSERT INTO categories (id, name, parent_id) VALUES (?, ?, ?)",
      [category.id, category.name, category.ancestors[category.depth - 1]?.id]
    );

    for (const ancestor of category.ancestors) {
      await db.run(
        "INSERT INTO categories_closure (ancestor_id, descendant_id) VALUES (?, ?)",
        [ancestor.id, category.id]
      );
    }
  }

  for (const volume of volumes) {
    await db.run(
      "INSERT INTO volumes (category_id, date, volume) VALUES (?, ?, ?)",
      [volume.category_id, volume.date, volume.volume]
    );
  }

  await db.close();
})();
