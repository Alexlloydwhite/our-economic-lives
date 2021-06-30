import Chip from '@material-ui/core/Chip';

export default function RecommendBuildingBlocks({ block }) {

    const handleBlockChipClick = () => {
        console.log('clicked!');
    }

    return (
        <>
            <Chip
                key={block.id}
                label={block.name}
                onClick={handleBlockChipClick}
            />
        </>
    );
}
