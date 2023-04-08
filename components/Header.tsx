// Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div>
      <Link href="/" className="bold" data-active={isActive('/')} style={{fontWeight: "bold", ...styles.nextLink, color: isActive('/') ? "black" : "gray"}}>
          Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/" className="bold" data-active={isActive('/')} style={{fontWeight: "bold", ...styles.nextLink, color: isActive('/') ? "black" : "gray"}}>
            Feed
        </Link>
      </div>
    );
    right = (
      <div className="right" style={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right" style={styles.right}>
        <Link href="/api/auth/signin" style={{fontWeight: 'bold', ...styles.nextLink, color: isActive('/') ? 'black' : 'gray'}} >
          <button style={styles.rightButton}>
            Log in
          </button>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" style={{fontWeight: 'bold', ...styles.nextLink, color: isActive('/') ? 'black' : 'gray'}}>
            Feed
        </Link>
        <Link href="/drafts" style={{fontWeight: 'bold', ...styles.nextLink, color: isActive('/drafts') ? 'black' : 'gray'}}>
          My drafts
        </Link>
        
      </div>
    );
    right = (
      <div style={styles.right}>
        <p style={styles.p}>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create" style={styles.rightButton}>
          <button style={{...styles.nextLink, ...styles.button}}>
            New post
          </button>
        </Link>
        <Link href="#" style={styles.rightButton}>
          <button onClick={() => signOut()} style={{...styles.nextLink, ...styles.button}}>
            Log out
          </button>
        </Link>
      </div>
    );
  }

  return (
    <nav style={styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;

const styles = {
  nav: {
    display: "flex",
    padding: "2rem",
    alignItems: "center"
  },
  nextLink: {
    textDecoration: "none",
    display: "inline-block",
    margin: "0px 10px"
  },
  p: {
    display: "inline-block",
    fontSize: "13px",
    paddingRight: "1rem"
  },
  right: {
    marginLeft: "auto"
  },
  button: {
    border: "none",
    backgroundColor: "transparent"
  },
  rightButton: {
    border: '1px solid black', 
    padding: "0.5rem 1rem", 
    borderRadius: "3px",
    margin: "0 10px"
  }
}