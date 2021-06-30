export default function RecommendBuildingBlocks({ pyramidData }) {
    return (
        <pre>
            {JSON.stringify(pyramidData, null, 2)}
        </pre>
    )
}
