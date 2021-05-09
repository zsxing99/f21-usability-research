import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { Container } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  AddIcon
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles((theme) => ({
  bottomRight: {
    backgroundColor: "#00acc1 !important",
    border: "0px !important",
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function TestMenu(props) {
  const classes = useStyles();

  return(
    <Fab variant="extended" className={classes.bottomRight} onClick={props.onClick}>
      Finish Task
    </Fab>
  )
}