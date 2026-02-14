
const usersDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <h1>Showing details fo r user #{id}</h1>
        </div>
    )
}

export default usersDetail