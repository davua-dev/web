const db = require('../db');

class PlantController {

    async getAll(req, res) {
        try {
            const complexes = await db.query('SELECT * FROM plants');
            res.json(complexes[0]);
        } catch (error) {
            console.error('Error fetching plants:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOne(req, res) {
        const id = req.params.id;

        try {
            const results = await db.query('SELECT * FROM plants WHERE id = ?', [id]);

            // Перевірка наявності результатів запиту
            if (results[0].length > 0) {
                const complex = results[0][0];
                res.json(complex);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } catch (error) {
            console.error('Error fetching complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            await db.query('DELETE FROM plants WHERE id = ?', [id]);
            res.json({ message: 'Plant deleted successfully' });
        } catch (error) {
            console.error('Error deleting plant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req, res) {
        const { title, price, category, des } = req.body;

        try {
            await db.query('INSERT INTO plants (title, price, category, des) VALUES (?, ?, ?, ?)', [title, price, category, des]);
            res.json({ message: 'Plant created successfully' });
        } catch (error) {
            console.error('Error creating plant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const { title, price, category, des } = req.body;

        try {
            await db.query('UPDATE plants SET title = ?, price = ?, category = ?, des = ? WHERE id = ?', [title, price, category, des, id]);
            res.json({ message: 'Plant updated successfully' });
        } catch (error) {
            console.error('Error updating plant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new PlantController();
