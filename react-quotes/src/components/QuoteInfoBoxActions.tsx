import useWindowDimensions from "../hooks/useWindowDimensions";
import React, {useState} from "react";
import {MOBILE_WIDTH} from "../constants";
import {speedDialElementProps} from "./QuoteInfoBox";
import {IconButton, Menu, MenuItem, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

interface QuoteInfoBoxActionsProps {
    actions: Array<speedDialElementProps>
}

const QuoteInfoBoxActions = ({actions}: QuoteInfoBoxActionsProps) => {
    const width = useWindowDimensions().width;
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    return(
        <div >
            {width <= MOBILE_WIDTH ?
                <div>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertOutlinedIcon/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {actions.map(action => (
                            <MenuItem onClick={action.onClick} dense={true}>{action.icon}{action.name}</MenuItem>
                        ))}
                    </Menu>
                </div>
            :
                <SpeedDial
                    ariaLabel={"actions"}
                    open={speedDialOpen}
                    onOpen={handleSpeedDialOpen}
                    icon={<SpeedDialIcon openIcon={<MoreHorizOutlinedIcon/>} icon={<MoreVertOutlinedIcon/>}/>}
                    onClose={handleSpeedDialClose}
                    direction="left"
                    FabProps={{
                        size: "small",
                        style: {
                            backgroundColor: "rgba(255, 0, 0, 0)",
                            boxShadow: "none",
                            color: "black"
                        }
                    }}
                >
                    {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            onClick={action.onClick}
                            tooltipTitle={action.name}
                            FabProps={{
                                size: "small",
                                style: {
                                    backgroundColor: "rgba(255, 0, 0, 0)",
                                    boxShadow: "none",
                                    color: "black",
                                    margin: "2px"
                                }
                            }}
                        />
                    ))}
                </SpeedDial>
            }
        </div>
    )
}

export default QuoteInfoBoxActions;