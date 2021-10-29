import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadSpinner from '../Materialui/LoadSpinner'

const ShopBrand = () => {
    const brands = useSelector(state => state.brands)

    if (!brands || brands.length === 0) {
        return (
            <LoadSpinner />
        )
    }

    const issey = brands.find(brand => brand.name.toLowerCase().startsWith('issey'))
    const raf = brands.find(brand => brand.name.toLowerCase().startsWith('raf'))
    const yohji = brands.find(brand => brand.name.toLowerCase().startsWith('yohji'))

    return (
        <Box sx={{ width: '100 %', mt: 5 }}>
            <Typography align='center' variant='h4' sx={{ my: 5 }}>
                Shop By Brand
            </Typography>
            <Stack direction='row' justifyContent='center' alignItems='center'>
                <Button component={Link} to={`/brands/${issey.id}`} sx={{ '&:hover': { boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)' } }}>
                    <img src='/shopBrand/brandCard-issey-miyake.jpg' width='85%' />
                </Button>
                <Button component={Link} to={`/brands/${raf.id}`} sx={{ '&:hover': { boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)' } }}>
                    <img src='/shopBrand/brandCard-raf-simons.jpg' width='85%' />
                </Button>
                <Button component={Link} to={`/brands/${yohji.id}`} sx={{ '&:hover': { boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)' } }}>
                    <img src='/shopBrand/brandCard-yohji-yamamoto.jpg' width='85%' />
                </Button>
            </Stack>
        </Box>
    )
}

export default ShopBrand
