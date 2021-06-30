import Chip from '@material-ui/core/Chip';
import { useState } from 'react';

export default function RecommendBuildingBlocks({ block }) {
    const [color, setColor] = useState('default');

    const handleBlockChipClick = (block) => {
        color === 'default' ? setColor('primary') : setColor('default');
    }

    return (
        <>
            <Chip
                key={block.id}
                label={block.name}
                onClick={() => handleBlockChipClick(block)}
                color={color}
            />
        </>
    );
}
