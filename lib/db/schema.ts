import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    userId: serial('user_id').notNull(),
    expires: timestamp('expires').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});