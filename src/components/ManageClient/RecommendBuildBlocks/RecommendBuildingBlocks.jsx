import Chip from '@material-ui/core/Chip';
import { useState } from 'react';

export default function RecommendBuildingBlocks({ block }) {
    const [color, setColor] = useState('default');

    const handleBlockChipClick = (block) => {
        console.log('clicked!', block.id);
        if (color === 'default') {
            setColor('primary');
        } else {
            setColor('default');
        }
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
