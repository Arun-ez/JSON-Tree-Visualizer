'use server'

import { cookies } from "next/headers"

const setCookie = async (key: string, value: string, expires?: number): Promise<void> => {
    const store = await cookies();
    store.set(key, value, { expires: expires });
}

export { setCookie }