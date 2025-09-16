import { query } from "../db.js";

export const getClients = async () => {
  const { rows } = await query("SELECT * FROM clients_tb");
  return rows;
};

export const createClient = async (clientData) => {
  const { name, email, job, isactive } = clientData;
  const { rows } = await query(
    `INSERT INTO clients_tb (name, email, job, isactive) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, job, isactive]
  );

  return rows[0];
};

export const updateClient = async (clientId, clientData) => {
  const { name, email, job, isactive } = clientData;

  const { rows } = await query(
    `UPDATE clients_tb SET name = $1, email = $2, job = $3, isactive = $4
       WHERE id = $5 RETURNING *`,
    [name, email, job, isactive, clientId]
  );

  return rows[0];
};

export const deleteClient = async (clientId) => {
  const { rowCount } = await query(`DELETE FROM clients_tb WHERE id = $1`, [
    clientId,
  ]);
  return rowCount > 0; // Returns true if a row was deleted, false otherwise
};

export const searchClients = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
    [`%${searchTerm}%`]
  );
  return rows;
};
