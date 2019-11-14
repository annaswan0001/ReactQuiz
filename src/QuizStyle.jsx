
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/NQSWvyVRIJk/1600x900)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    paper: {
      margin: theme.spacing(3, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
      width: "60px",
      height: "60px",
      marginBottom: theme.spacing(2)
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    typography: {
      marginTop: theme.spacing(2)
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
      maxWidth: 300
    },
    button: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    title:{
     marginTop: theme.spacing(2)
    }

  }));