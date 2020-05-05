import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { green } from '@material-ui/core/colors';
import { Button, ButtonGroup } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { ACCESS_TOKEN, USER_ID } from '../constants';
import SearchInput from './SearchInput';


const Header = () => {
	const [open, setOpen] = useState(false);
	const anchorRef = React.useRef(null);
	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};
	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const handleLogout = (event) => {
		handleClose(event);
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(USER_ID);
		window.location.reload();
	}
	
	const handleHome = (event) => {
		handleClose(event);
		localStorage.getItem(ACCESS_TOKEN);
	}
	// if (localStorage.getItem(ACCESS_TOKEN)) {
	// 	setUser(jwtDecode(localStorage.getItem(ACCESS_TOKEN)));
	// }
	return (
		<Container>
			<Toolbar >
				<Grid container >
					<Grid item xs={3}>
						<Link to="/" style={{ textDecoration: 'none' }}>

							{/* <Typography variant="h6" style={{flexGrow:1}}>
                            Lemon
                        </Typography> */}
							{/* <img src={logo} alt="Logo" className="logo-header"/> */}
							<h3 style={{ color: 'white' }}>Seenit</h3>
						</Link>

					</Grid>
					<Grid item xs={5}>
						<SearchInput />
					</Grid>
					<Grid item xs={4}>
						<LeftContainer container justify="flex-start" alignItems="center">
							{
								localStorage.getItem(ACCESS_TOKEN) &&
								<div>
									<Button
										ref={anchorRef}
										aria-controls={open ? 'menu-list-grow' : undefined}
										aria-haspopup="true"
										onClick={handleToggle}
									>
										<AccountCircleIcon style={{ color: green[50] }} />

									</Button>
									<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
										{({ TransitionProps, placement }) => (
											<Grow
												{...TransitionProps}
												style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
											>
												<Paper>
													<ClickAwayListener onClickAway={handleClose}>
														<MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
															<MenuItem onClick={handleHome}><Link to="/">Home</Link></MenuItem>
															<Link to="/user/" style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose}>My profile</MenuItem></Link>
															<MenuItem onClick={handleClose}><Link to="/setting">Setting</Link></MenuItem>
															<MenuItem onClick={handleLogout}><Link to="/">Logout</Link></MenuItem>
														</MenuList>
													</ClickAwayListener>
												</Paper>
											</Grow>
										)}
									</Popper>
								</div>
							}
							{
								!localStorage.getItem(ACCESS_TOKEN) &&
							  <div>
									<ButtonGroup>
									<button className="button is-white" style={{ marginLeft: "5%" }}> <Link to="/login">Log in</Link></button>
									<button className="button is-white" style={{ marginLeft: "3%" }}> <Link to="/register">Sign up</Link> </button>
									</ButtonGroup>
								</div>
							}
						</LeftContainer>

					</Grid>
				</Grid>
			</Toolbar>
		</Container>
	)
};

const LeftContainer = styled(Grid)`
	padding-left: 40%;
`

const Container = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	height: 70px;
	background-color: ${props => props.theme.foreground};
	border-bottom: 1px solid ${props => props.theme.border};
	z-index: 1000
`;

export default Header;
