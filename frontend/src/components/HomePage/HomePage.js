import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'

import styles from'./HomePage.module.css'

function HomePage() {


  return (
      <>
      <Navigation />
      </>
  );
}

export default HomePage;