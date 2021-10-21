import { IconButton } from '@mui/material'
import React from 'react'

const StandardButton = (props) => {
    const { color, icon } = props
    return (
        <IconButton color={color || "primary"}>
            {icon}
        </IconButton>
    )
}

export default StandardButton
