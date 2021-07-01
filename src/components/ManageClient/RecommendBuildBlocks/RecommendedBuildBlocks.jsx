export default function RecommendedBuildBlocks() {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <Typography>
                    Recommend Building Blocks
                </Typography>
                <Typography>
                    You may recommend up to 3 building blocks to your client
                </Typography>
            </div>
            <div>
                {pyramidData.map((block) => (
                    <RecommendBuildingBlocks block={block} params={params} />
                ))}
            </div>
        </div>
    )
}