export default async function dbFunction({ main, res,forerror }) {
    try {
        await main();
    }
    catch (err) {
        console.error(err)
        forerror?.();
        res.status(500).json({ message: "Database Error" });
    }
}

