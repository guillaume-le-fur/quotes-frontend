import {
    AppBar,
    Fab,
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import FooterElement from "./FooterElement";
import useWindowDimensions from "../hooks/useWindowDimensions";

const headersLinks = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About",
        href: "/edit",
    },
];

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: '#abcfff'
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
        backgroundColor: "#2b86ff"
    },
    spacedIcons: {
        display: 'flex',
        justifyContent: 'space-between',

    }
}));

const Header = () => {
    const styles = useStyles();
    const width = useWindowDimensions().width;

    return (
        <AppBar position="fixed" color="primary" className={styles.appBar}>
            <Toolbar className={styles.spacedIcons}>
                <FooterElement icon={<HomeIcon />} label={'Home'} href={'/'}/>
                <FooterElement icon={<MoreIcon />} label={'My quotes'} href={'/'}/>
                <FooterElement icon={<SearchIcon />} label={'About'} href={'edit'}/>
                <FooterElement icon={<HomeIcon />} label={'Home'} href={'/'}/>
                <Fab size={width < 500 ? "small" : "medium"} color="secondary" aria-label="add" className={styles.fabButton}>
                    <AddIcon />
                </Fab>
            </Toolbar>
        </AppBar>
    )

}

export default Header;

