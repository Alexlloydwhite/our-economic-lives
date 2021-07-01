import Chip from '@material-ui/core/Chip';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

export default function BuildingBlockChip({ block, params, classes }) {
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
        <Grid
            item
            className={classes.chip}
        >
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