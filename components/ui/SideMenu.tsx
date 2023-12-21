import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { UiContext } from '../../context/ui/UiContext';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { isLoggedIn, user , logout} = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    
    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItemButton>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm(e.target.value)}
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSearchTerm}
                                    aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItemButton>

                {
                    isLoggedIn && (
                        <>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItemButton>
                        </>
                    )
                }


                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/women')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/kids')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItemButton>

                {
                    isLoggedIn
                    ? (
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                    )
                    : (
                        <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItemButton>
                    )
                }


                {/* Admin */}
                {
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItemButton>
                            <ListItemButton>                
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />                                        
                            </ListItemButton>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}