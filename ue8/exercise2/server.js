const { Pool } = require('pg');

let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();

app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const pool = require('./pool.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("EX3: This is a simple database-backed application");
});

app.get("/products", async (req, res) => {
    try {
        const { search, minPrice, maxPrice, minRatio, maxRatio } = req.query;
        
        // Base query: Calculate ratio dynamically to handle division by zero
        // Formula: L / (L + D). If (L+D) is 0, return 0.
        let query = `
            SELECT p.*, 
            COALESCE(p.likes_count::float / NULLIF(p.likes_count + p.dislikes_count, 0), 0) as ratio,
            (SELECT json_agg(tag) FROM products_tags WHERE id = p.id) as tags
            FROM products p
            WHERE 1=1
        `;
        
        const params = [];
        let paramIndex = 1;

        // 3. Search by partial match (name, description, or tags)
        if (search) {
            // We use a subquery for tags to keep the main WHERE clause clean
            query += ` AND (
                p.title ILIKE $${paramIndex} OR 
                p.description ILIKE $${paramIndex} OR
                p.id IN (SELECT id FROM products_tags WHERE tag ILIKE $${paramIndex})
            )`;
            params.push(`%${search}%`);
            paramIndex++;
        }

        // 4. Interval search by price
        if (minPrice) {
            query += ` AND p.price >= $${paramIndex}`;
            params.push(minPrice);
            paramIndex++;
        }
        if (maxPrice) {
            query += ` AND p.price <= $${paramIndex}`;
            params.push(maxPrice);
            paramIndex++;
        }

        // 5. Interval search by Ratio (Stars)
        // We wrap the logic in the WHERE clause using the same math as the SELECT
        if (minRatio) {
            query += ` AND COALESCE(p.likes_count::float / NULLIF(p.likes_count + p.dislikes_count, 0), 0) >= $${paramIndex}`;
            params.push(minRatio);
            paramIndex++;
        }
        if (maxRatio) {
            query += ` AND COALESCE(p.likes_count::float / NULLIF(p.likes_count + p.dislikes_count, 0), 0) <= $${paramIndex}`;
            params.push(maxRatio);
            paramIndex++;
        }

        query += ` ORDER BY p.id ASC`;

        const result = await pool.query(query, params);
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.get("/product/:id", (req, res) => {
	
	let id = req.params.id;
	
    const query = {
        text: `SELECT * from products where id=$1`,
        values: [id]
    }

    // issue query (returns promise)
    pool.query(query).then(results => {
        resultRows = results.rows;

        // no results
        if (resultRows.length < 1) {
            res.status(401).json({
                "message": "no results"
            });
            return;
        }

        // everything ok -- return results
        let response = resultRows[0]; // only return one element
        res.status(200).json(response);

    })
    .catch(error => {
        // error accessing db
        if (error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
        }
    });
});

// -------------------------------------------------------
// 1. Liking and Disliking products
// -------------------------------------------------------
// Route: PUT /products/:id/like
app.put("/products/:id/like", async (req, res) => {
    try {
        const { id } = req.params;
        // Increment likes_count
        const result = await pool.query(
            "UPDATE products SET likes_count = likes_count + 1 WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).send("Product not found");
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Route: PUT /products/:id/dislike
app.put("/products/:id/dislike", async (req, res) => {
    try {
        const { id } = req.params;
        // Increment dislikes_count
        const result = await pool.query(
            "UPDATE products SET dislikes_count = dislikes_count + 1 WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).send("Product not found");
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


// -------------------------------------------------------
// 2. Adding or Deleting a tag
// -------------------------------------------------------
// Route: POST /products/:id/tags
// Body: { "tag": "newTag" }
app.post("/products/:id/tags", async (req, res) => {
    try {
        const { id } = req.params;
        const { tag } = req.body;

        if (!tag) return res.status(400).send("Tag is required");

        // Optional: Ensure tag exists in 'tags' table first (if strict FK enforcement is needed)
        // For this exercise, we'll try to insert the tag into the main list first to avoid FK errors
        await pool.query("INSERT INTO tags (tag) VALUES ($1) ON CONFLICT (tag) DO NOTHING", [tag]);

        // Link tag to product
        // We use ON CONFLICT DO NOTHING to prevent errors if the product already has this tag
        // Note: products_tags has no unique constraint in provided SQL, so we check first or just insert.
        // Given the simple schema, a simple INSERT is safest:
        await pool.query("INSERT INTO products_tags (id, tag) VALUES ($1, $2)", [id, tag]);
        
        res.status(201).json({ message: "Tag added", productId: id, tag: tag });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Route: DELETE /products/:id/tags/:tag
app.delete("/products/:id/tags/:tag", async (req, res) => {
    try {
        const { id, tag } = req.params;
        await pool.query("DELETE FROM products_tags WHERE id = $1 AND tag = $2", [id, tag]);
        res.status(200).send("Tag removed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
  
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
