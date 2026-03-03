import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password, email } = await request.json();

        if (!username || !password || !email) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Add more validation as required

        // Registration logic, e.g., saving to database, can go here.

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}