import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import { DashboardOutlined, CreditCardOffOutlined, AttachMoneyOutlined, CreditCardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Grid, CardContent, Typography, Card } from '@mui/material';
import { SummaryTile } from '../../components/admin/SummaryTile';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';


const DashboardPage = () => {

  const { data, error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick');
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn -1 : 30);
    }, 1000)
  
    return () => clearInterval(interval);
  }, []);  

  if(!error && !data) {
    return <></>
  }

  if(error){
    console.log(error)
    return <Typography>Error al cargar la informacion</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  }= data!;
  
  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={<DashboardOutlined/>}
    >
        <Grid container spacing={2}>

          <SummaryTile 
            title={numberOfOrders} 
            subTitle={'Ordenes totales'} 
            icon={<CreditCardOffOutlined color='secondary' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={paidOrders} 
            subTitle={'Ordenes pagadas'} 
            icon={<AttachMoneyOutlined color='success' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={notPaidOrders} 
            subTitle={'Ordenes pendientes'} 
            icon={<CreditCardOutlined color='error' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={numberOfClients} 
            subTitle={'Clientes'} 
            icon={<GroupOutlined color='primary' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={numberOfProducts} 
            subTitle={'Productos'} 
            icon={<CategoryOutlined color='warning' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={productsWithNoInventory} 
            subTitle={'Sin Existencias'} 
            icon={<CancelPresentationOutlined color='error' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={lowInventory} 
            subTitle={'Bajo inventario'} 
            icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize: 40}}/>}
          />
          <SummaryTile 
            title={refreshIn} 
            subTitle={'Actualizacion en: '} 
            icon={<AccessTimeOutlined color='secondary' sx={{fontSize: 40}}/>}
          />

        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage;