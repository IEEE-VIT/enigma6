import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

  export default function OutlinedTextFields() {
    const classes = useStyles();
    // const [values, setValues] = React.useState({
    //   name: 'Cat in the Hat',
    //   age: '',
    //   multiline: 'Controlled',
    //   currency: 'EUR',
    // });
  
    return (
        <TextField
        error
        id="outlined-error"
        label="Error"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />);
  }