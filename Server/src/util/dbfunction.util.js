export default async function dbFunction({ main, res,forerror }) {
    try {
        await main();
    }
    catch (error) {
        console.error(error)
        forerror?.();
        res.status(500).json({ message: "Database Error" });
    }
}

