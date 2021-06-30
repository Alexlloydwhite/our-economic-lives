import Chip from '@material-ui/core/Chip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function RecommendBuildingBlocks({ block, params }) {
    const dispatch = useDispatch();
    // Color of chips
    const [color, setColor] = useState('default');

    const handleBlockChipClick = (block) => {
        color === 'default' ? setColor('primary') : setColor('default');
        dispatch({
            type: 'TOGGLE_RECOMMENDED_BLOCK',
            user_id: params.id,
            block_id: block.id,
        })
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