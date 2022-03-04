import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => (
      navigate('/')
    ), 3000);
  },[])

  return <p>No such page. Redirecting home...</p>
};

export default NotFound;
