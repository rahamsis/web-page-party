
import mysql, { Connection } from 'mysql2/promise';

export type User = {
    id?: string;
    name: string | undefined | null;
    email: string | undefined | null;
};

// Create the connection to database
export default async function connection(): Promise<Connection> {
    const connection = await mysql.createConnection({
        host: process.env.NEXTAUTH_SECRET_HOST,
        user: process.env.NEXTAUTH_SECRET_USER,
        password: process.env.NEXTAUTH_SECRET_PASSWORD,
        database: process.env.NEXTAUTH_SECRET_DATABASE,
        port: (process.env.NEXTAUTH_SECRET_PORT as unknown) as number,
    });
    return connection;
}

export async function getUser(nombre: string, celular: string): Promise<User | null> {
    let sql = null;
    try {
        sql = await connection();

        await sql.query("INSERT INTO invitados (nombre, celular) VALUES (?, ?)", [
            nombre,
            celular,
        ]);

        const user: User = {
            name: nombre,
            email: celular,
        }

        return user;
    } catch (error) {
        throw new Error((error as any).sqlMessage || (error as any).message || 'Database Error');
    } finally {
        sql?.end()
    }
}
