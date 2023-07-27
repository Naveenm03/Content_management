import { Form } from "formik";
import React from "react";
import "./Register.css";
import Sociopaedia from '../Socio Paedia.svg'
import Blog from  '../19197307.jpg'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";


const Register = () => {
  const theme = useTheme();
  return (
    <div>
      <div class="flex">
    
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
        {/* <div>
            <img
            className="h-[80vh]"
          sr={Blog}
            // src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones-2x.png?__makehaste_cache_breaker=73SVAexZgBW"
          alt="SOCIOPAEDIA Homepage"
        />
        </div> */}
        
        <div class="">
          <img
            src={Sociopaedia}
            alt="SOCIOPAEDIA Logo" Style={{width:"100px",height:"50px"}}
          />

          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
