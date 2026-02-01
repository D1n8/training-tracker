import { useState } from "react";

function useFetching(callback: Function) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(args)
        } catch (e: any) {
            setError(e.message)
        } finally{
            setIsLoading(false)
        }
    }

    return [fetching, error, isLoading] as const
}

export default useFetching;