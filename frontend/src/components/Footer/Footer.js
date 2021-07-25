import React from 'react';

import styles from './footer.module.css'

function Footer(){
//   const github='https://www.linkedin.com/in/lema-el-sherbiny-b41340193/'
  const linkedIn='https://github.com/Simonvargas'
  return (
    <div>
    <nav className={styles.footer}>
        <a  href='https://www.linkedin.com/in/simon-vargas-aa0b6a14b/' style={{ marginLeft: '20px', color: "white",textDecoration:"none" }}>LinkedIn</a>
        <a  href={linkedIn} style={{ marginLeft: '20px', color: "white", textDecoration:"none"}}>Github Profile</a>
    </nav>
    </div>
  );
}
export default Footer;