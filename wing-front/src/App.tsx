import './App.css';
import {DropDetails, Revenue} from "./DropDetails";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import { Copyright } from '@mui/icons-material';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type { ReactElement} from "react";
const App = (): ReactElement => {
	const defaultTheme = createTheme();
	const queryClient = new QueryClient()

	return <QueryClientProvider client={queryClient}>
		<ThemeProvider theme={defaultTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="absolute" >
					<Toolbar>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							Wing
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>


				<Box
					component="main"
					sx={{
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<div className="grid grid-cols-1 gap-4 items-center content-center">

						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<Revenue />
						</Paper>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<DropDetails />
						</Paper>

						<Copyright sx={{ pt: 4 }} />
					</div>
				</Box>
			</Box>
		</ThemeProvider>
	</QueryClientProvider>
}


export default App;
