import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const ContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface FooterNavElementProps {
    icon: any;
    label: string;
    href: string;
}

const FooterElement = ({icon, label, href}: FooterNavElementProps) => (
    <ContainerDiv>
        <Link to={href} style={{textDecoration: 'none', color: "white"}}>
            <ContainerDiv>
                {icon}
                {label}
            </ContainerDiv>
        </Link>
    </ContainerDiv>

)

export default FooterElement;