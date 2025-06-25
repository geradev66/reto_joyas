const pool = require("../db");

const formatearHATEOAS = (joyas, limit, page) => {
  return {
    total: joyas.length,
    page: Number(page),
    limit: Number(limit),
    results: joyas.map(j => ({
      name: j.nombre,
      href: `/joyas/${j.id}`,
    })),
  };
};

const getJoyas = async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;

    const sql = `SELECT * FROM inventario ORDER BY ${campo} ${direccion} LIMIT $1 OFFSET $2`;
    const values = [limits, offset];
    const { rows } = await pool.query(sql, values);

    res.json(formatearHATEOAS(rows, limits, page));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en la consulta de joyas" });
  }
};

const getJoyasByFilters = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    let filtros = [];
    let values = [];

    if (precio_min) {
      values.push(precio_min);
      filtros.push(`precio >= $${values.length}`);
    }
    if (precio_max) {
      values.push(precio_max);
      filtros.push(`precio <= $${values.length}`);
    }
    if (categoria) {
      values.push(categoria);
      filtros.push(`categoria = $${values.length}`);
    }
    if (metal) {
      values.push(metal);
      filtros.push(`metal = $${values.length}`);
    }

    const sql = `SELECT * FROM inventario ${filtros.length ? "WHERE " + filtros.join(" AND ") : ""}`;
    const { rows } = await pool.query(sql, values);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el filtrado de joyas" });
  }
};

module.exports = { getJoyas, getJoyasByFilters };
