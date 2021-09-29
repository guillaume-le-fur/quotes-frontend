import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {Tooltip} from "@mui/material";


const useStyles = makeStyles({
    footerElm : {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: "white"
    }
})

interface FooterNavElementProps {
    icon: any;
    label: string;
    href: string;
}

const FooterElement = ({icon, label, href}: FooterNavElementProps) => {
    const styles = useStyles();

    return (
        <div className={styles.footerElm}>
            <Link to={href} className={styles.link}>
                <Tooltip title={label}>
                    {icon}
                </Tooltip>
            </Link>
        </div>

    )
}

export default FooterElement;