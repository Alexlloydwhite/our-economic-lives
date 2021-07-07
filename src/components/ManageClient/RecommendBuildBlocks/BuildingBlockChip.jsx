// MUI
import { Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
// React
import { useDispatch } from 'react-redux';

export default function BuildingBlockChip({ block, params, classes }) {
    const dispatch = useDispatch();

    // Clicking on the block chip toggles the block as recommended
    const handleBlockChipClick = (block) => {
        dispatch({
            type: 'TOGGLE_RECOMMENDED_BLOCK',
            user_id: params.id,
            block_id: block.id,
            client_id: params.id
        });
    }

    return (
        <Grid
            item
            className={classes.chip}
        >
            {/* 
                Checks if block is recommended 
                Displays blue chip if true &
                Grey chip if false
            */}
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
        </Grid>
    );
}