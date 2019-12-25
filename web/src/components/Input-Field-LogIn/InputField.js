import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './InputField.css'

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     //flexWrap: 'wrap',
//     flexDirection:'column'
//   },
//   margin: {
//     //margin: theme.spacing(1),
//   },
//   textField: {
//     fontSize: 12,
//     height:1,
//     //marginBottom:10,
//     position:"relative",
//     flexBasis: 50,
//   },
// }));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection:'column'
  },
  textField: {
    fontSize: 12,
    height:1,
    position:"relative",
    flexBasis: 50,
  },
  margin: {
    marginBottom: theme.spacing(4)
  }
}));
  
export default function OutlinedInputAdornments({handleChange,handleClickShowPassword,showPassword}) {
  const classes = useStyles();
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
  <div className=''>
    <div className={classes.root}>
      <div className="input">
        <TextField
            required
            id="standard-required"
            label="Email"
            defaultValue=""
            className={classes.textField}
            margin="normal"
            onChange={handleChange('email')}
            inputProps={{style: {fontSize: 12}}}
          InputLabelProps={{style: {fontSize: 12, marginTop: -7}}}
          />
        {/* OEIGINAL INPUT FIELD FOR EMAIL
        <TextField
        id="outlined-adornment-name"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Email"
        onChange={handleChange('email')}
        inputProps={{style: {fontSize: 12}}}
        InputLabelProps={{style: {fontSize: 12, marginTop: -7}}}
        /> */}
      </div>
      <div style={{marginTop:"6px"}} className="input">
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}            
            autoComplete="current-password"
            margin="normal"
            onChange={handleChange('password')}
            inputProps={{style: {fontSize: 12}}}
            InputLabelProps={{style: {fontSize: 12, marginTop: -7}}}    
            InputProps={{
              endAdornment: (
                <div className={classes.eyeButton}>
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                </div>
              ),
            }}
          />
          {/* <TextField
            id="outlined-adornment-password"
            className="textField"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            inputProps={{style: {fontSize: 12}}}
            InputLabelProps={{style: {fontSize: 12, marginTop: -7}}}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}
      </div>
    </div>
  </div>
  );
}
  
  // {values.showPassword ? <VisibilityOff /> : <Visibility />}