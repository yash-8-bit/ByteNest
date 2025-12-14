import type React from "react";
import toast from "react-hot-toast";

export async function ApiFunction({ callback, onerror, setLoading }:
    { callback: Function, onerror?: Function; setLoading?: React.Dispatch<React.SetStateAction<boolean>> }) {
    try {
        setLoading?.(true);
        await callback();
    }
    catch (error: any) {
        if (error.response && error.response.data) {
            toast.error(error.response.data?.message || "Server Error")
            onerror?.();
            return;
        }
    }
    finally {
        setLoading?.(false);
    }
}