import Chip from '@material-ui/core/Chip';
import { useDispatch } from 'react-redux';

export default function BuildingBlockChip({ block, params }) {
    const dispatch = useDispatch();

    const handleBlockChipClick = (block) => {
        dispatch({
            type: 'TOGGLE_RECOMMENDED_BLOCK',
            user_id: params.id,
            block_id: block.id,
            client_id: params.id
        });
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {block.is_recommended ?
                <Chip
                    key={block.id}
                    label={block.name}
                    onClick={() => handleBlockChipClick(block)}
                    color="primary"
                />
                :
                <Chip
                    key={block.id}
                    label={block.name}
                    onClick={() => handleBlockChipClick(block)}
                    color="default"
                />
            }
        </div>
    );
}