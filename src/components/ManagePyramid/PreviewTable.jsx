import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core'

export default function PreviewTable({ preview }) {
    return (
        <div>
            {preview &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Building Block</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Example</b></TableCell>
                            <TableCell><b>Tier</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {preview.map((block) => (
                            <TableRow>
                                <TableCell>{block.Name}</TableCell>
                                <TableCell>{block.Description}</TableCell>
                                <TableCell>{block.value}</TableCell>
                                <TableCell>{block.tier_id}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            }
        </div>
    )
}