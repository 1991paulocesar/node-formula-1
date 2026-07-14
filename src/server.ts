import fastify from "fastify";
import cors from "@fastify/cors";
import { pool } from "./database";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

interface Team {
  id: number;
  name: string;
  base: string;
}

interface Driver {
  id: number;
  name: string;
  team: string;
}

// ---------- GET ----------

server.get("/teams", async (request, response) => {
  const [rows] = await pool.query("SELECT * FROM teams");
  response.type("application/json").code(200);
  return { teams: rows };
});

server.get("/drivers", async (request, response) => {
  const [rows] = await pool.query("SELECT * FROM drivers");
  response.type("application/json").code(200);
  return { drivers: rows };
});

interface IdParams {
  id: string;
}

server.get<{ Params: IdParams }>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    }
    response.type("application/json").code(200);
    return { team: rows[0] };
  }
);

server.get<{ Params: IdParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM drivers WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }
    response.type("application/json").code(200);
    return { driver: rows[0] };
  }
);

// ---------- POST ----------

interface CreateTeamBody {
  name: string;
  base: string;
}

server.post<{ Body: CreateTeamBody }>(
  "/teams",
  async (request, response) => {
    const { name, base } = request.body;
    const [result]: any = await pool.query(
      "INSERT INTO teams (name, base) VALUES (?, ?)",
      [name, base]
    );

    response.type("application/json").code(201);
    return { team: { id: result.insertId, name, base } };
  }
);

interface CreateDriverBody {
  name: string;
  team: string;
}

server.post<{ Body: CreateDriverBody }>(
  "/drivers",
  async (request, response) => {
    const { name, team } = request.body;
    const [result]: any = await pool.query(
      "INSERT INTO drivers (name, team) VALUES (?, ?)",
      [name, team]
    );

    response.type("application/json").code(201);
    return { driver: { id: result.insertId, name, team } };
  }
);

// ---------- PUT ----------

interface UpdateTeamBody {
  name?: string;
  base?: string;
}

server.put<{ Params: IdParams; Body: UpdateTeamBody }>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const [existing] = await pool.query<any[]>(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    }

    const name = request.body.name ?? existing[0].name;
    const base = request.body.base ?? existing[0].base;

    await pool.query("UPDATE teams SET name = ?, base = ? WHERE id = ?", [
      name,
      base,
      id,
    ]);

    response.type("application/json").code(200);
    return { team: { id, name, base } };
  }
);

interface UpdateDriverBody {
  name?: string;
  team?: string;
}

server.put<{ Params: IdParams; Body: UpdateDriverBody }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const [existing] = await pool.query<any[]>(
      "SELECT * FROM drivers WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }

    const name = request.body.name ?? existing[0].name;
    const team = request.body.team ?? existing[0].team;

    await pool.query("UPDATE drivers SET name = ?, team = ? WHERE id = ?", [
      name,
      team,
      id,
    ]);

    response.type("application/json").code(200);
    return { driver: { id, name, team } };
  }
);

// ---------- DELETE ----------

server.delete<{ Params: IdParams }>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const [existing] = await pool.query<any[]>(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    }

    await pool.query("DELETE FROM teams WHERE id = ?", [id]);

    response.type("application/json").code(200);
    return { message: "Team deleted", team: existing[0] };
  }
);

server.delete<{ Params: IdParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const [existing] = await pool.query<any[]>(
      "SELECT * FROM drivers WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }

    await pool.query("DELETE FROM drivers WHERE id = ?", [id]);

    response.type("application/json").code(200);
    return { message: "Driver deleted", driver: existing[0] };
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});