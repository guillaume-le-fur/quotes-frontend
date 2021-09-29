import {
    AppBar,
    Fab, Theme,
    Toolbar,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FooterElement from "./FooterElement";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {Link} from "react-router-dom";
import {MOBILE_WIDTH} from "../constants";
import {makeStyles} from "@mui/styles";

const FooterLinks = [
    {
        label: "Home",
        href: "/",
        icon: <HomeOutlinedIcon color="secondary"/>
    },
    {
        label: "My quotes ",
        href: "/myQuotes",
        icon: <MoreHorizOutlinedIcon color="secondary"/>
    },
    {
        label: "About",
        href: "/about",
        icon: <SearchOutlinedIcon color="secondary"/>
    },
    {
        label: "Account (redirects home)",
        href: "/account",
        icon: <PersonOutlinedIcon color="secondary"/>
    }
];

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        top: 'auto!important',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute!important' as any,
        zIndex: '1!important' as any,
        left: '0!important' as any,
        right: '0!important' as any,
        margin: '0 auto!important' as any,
        backgroundColor: theme.palette.primary.contrastText + '!important'
    },
    spacedIcons: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

const Footer = ({currentUser}: any) => {
    const styles = useStyles();
    const width = useWindowDimensions().width;

    return (
        <div>
            {currentUser && (
                <div>
                    <Toolbar/>
                    <Toolbar/>
                    <AppBar position="fixed" color="primary" className={styles.appBar}>
                        <Toolbar className={styles.spacedIcons}>
                            {FooterLinks.map(element => (
                                <FooterElement key={element.label} icon={element.icon} label={element.label}
                                               href={element.href}/>
                            ))}
                            <Fab size={width < MOBILE_WIDTH ? "small" : "medium"}
                                 style={{top: width < MOBILE_WIDTH ? -25 : -30}}
                                 component={Link}
                                 to={'/add'}
                                 color="secondary"
                                 aria-label="add"
                                 className={styles.fabButton}
                            >
                                <AddIcon/>
                            </Fab>
                        </Toolbar>
                    </AppBar>
                </div>
            )}
        </div>
    )

}

export default Footer;

