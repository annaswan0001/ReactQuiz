import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      
    },
    summary:{
      backgroundColor:theme.palette.primary.main,
    },
    button:{
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    wrongAnswer:{
  fontSize: "18px",
  color:"red"
  
    }
  }));
  