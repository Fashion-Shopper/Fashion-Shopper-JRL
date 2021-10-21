import { Button } from '@mui/material'
import React from 'react'

const StandardButton = (props) => {
    const { shape, label, color, icon } = props
    return (
        <Button variant={shape || "outlined"} startIcon={icon || null} color={color || 'primary'}>
            {label}
        </Button>
    )
}

export default StandardButton
