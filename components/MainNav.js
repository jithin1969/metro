import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import { useAtom } from "jotai";
import Link from 'next/link';
import { searchHistoryAtom } from "../store";
import Button from 'react-bootstrap/Button';

function BasicExample() {
    const router = useRouter();
    const [search, setSearchField] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);



  function submitForm(e) {
    e.preventDefault();

    if(search !=""){router.push(`/artwork?title=true&q=${search}`);
    setSearchField("");
  }
  setSearchHistory((current) => [...current, `title=true&q=${search}`]);
  setIsExpanded(false); 
  }


  return (
    <>
    <Navbar expanded={isExpanded} expand="lg" className="fixed-top bg-primary navbar-dark">
      <Container>      
        <Navbar.Brand>Jithin Biju</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior>
          <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
          </Link>
          <Link href="/search" passHref legacyBehavior>
          <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
          </Link>
          </Nav>
          &nbsp;<Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search} onChange={(e) => setSearchField(e.target.value)}
            />  
            <Button type="submit" varient = "success">Search</Button>
          </Form>&nbsp;
          <Nav>
          <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
              </Link>

              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <br />
    <br />
    </>

  );
}

export default BasicExample;