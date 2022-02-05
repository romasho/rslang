import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link'

function Header() {
  return (

    <header>
      <nav>
        <Link component={RouterLink} to="/">Home</Link>
        <Link component={RouterLink} to="/about">About</Link>
        <Link component={RouterLink} to="/dictionary">Dictionary</Link>
      </nav>
    </header>


  );
}

export default Header;
