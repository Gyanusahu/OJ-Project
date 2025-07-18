import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Headers.css';


// import useGeneral from "../hooks/useGeneral";
import { useEffect } from "react";
// import httpAction from "../utils/httpAction";
// import apis from "../utils/apis";
import { useState } from "react";
import useGeneral from '../../hooks/useGeneral';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
const Headers = () => {
  const [user,setUser]=useState('')
      useEffect(()=>{
         const getUser=async()=>{
          const data={
              url:apis().userProfile,
          }
          const result=await httpAction(data)
          if(result?.status){
              setUser(result?.user)
          }
         }
         getUser()
      },[])
      const {navigate}=useGeneral();
  const handleLogout =async () => {
const data={
            url:apis().logout
        }
        const result=await httpAction(data)
        if(result?.status){
            navigate("/login")
        }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid className="d-flex align-items-center">
        <Navbar.Brand href="/" className="brand-title">
          CodeRush
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Side Nav */}
          <Nav className="ms-4 d-flex gap-3 align-items-center">
            <Nav.Link href="/problems" className="custom-nav-link">Problems</Nav.Link>
            <Nav.Link href="/addproblems" className="custom-nav-link">Add Problems</Nav.Link>
          </Nav>

          {/* Right Side Logout */}
          <div className="ms-auto me-3">
            <Button variant="outline-light" className="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;
