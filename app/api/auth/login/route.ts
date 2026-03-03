import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    // Dummy validation for demonstration purposes
    const validUser = "admin";
    const validPass = "securepassword";

    if (username === validUser && password === validPass) {
        return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 });
    }
}