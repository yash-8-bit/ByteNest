import type React from "react";
import toast from "react-hot-toast";

export async function ApiFunction({ callback, setLoading }: { callback: Function, setLoading?: React.Dispatch<React.SetStateAction<boolean>> }) {
    try {
        setLoading?.(true);
        await callback();

    }
    catch (error: any) {
        if (error.response && error.response.data) {
            toast.error(error.response.data?.message || "Server Error")
            return;
        }
    }
    finally {
        setLoading?.(false);
    }
}