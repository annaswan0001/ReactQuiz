import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundImage: "url(https://source.unsplash.com/HzaT5l4Fzqc)",
      backgroundSize:"cover"
    },
    
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
      
    },
    footer: {
      padding: theme.spacing(2),
      marginTop: "auto",
      backgroundColor: "white"
    },
    button:{
        display:"block",
        marginBottom: theme.spacing(4),
    }
  }));