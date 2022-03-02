import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => (
      <div className={styles.layout}>
        <header className={styles.header}>
          <Link className={styles.link} to={'/'}>
            <h3 className={styles.title}>Hacker News</h3>
          </Link>
        </header>
        <main className={styles.content}>
          <Outlet/>
        </main>
        <footer className={styles.footer}/>
      </div>
);

export default Layout;
