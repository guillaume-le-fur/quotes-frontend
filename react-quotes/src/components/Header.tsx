import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {Button} from "@material-ui/core";

const HeaderDiv = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8fcbff;
  flex-wrap: wrap;
`

const Logo = styled.img`
    padding: .5rem .5rem;
    height : 50px;
`

const LinkWrapper = styled.div`
    padding: 1rem;
    float: left;
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items : center
`

interface HeaderLinkInterface {
    link: string;
    text: string;
}

const HeaderLink = ({link, text}: HeaderLinkInterface) => (
    <LinkWrapper>
        <Button color="primary">
            <Link style={{textDecoration: 'none', color: 'white'}} to={link}>{text}</Link>
        </Button>
    </LinkWrapper>
)

const Header = () => (
    <HeaderDiv>
        <LogoContainer>
            <Logo src={process.env.PUBLIC_URL + '/logo_squirrel.png'} alt={"Company"}/>
            <h2>Quotes</h2>
        </LogoContainer>
        <nav>
            <HeaderLink link="/" text="Home" />
            <HeaderLink link="/edit" text="About" />
        </nav>
    </HeaderDiv>


)

export default Header;

