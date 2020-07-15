import React, { Fragment } from 'react';
import { TextareaAutosize } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textarea: {
    resize: 'none',
  },
  error: {
    color: '#f44336',
    fontSize: 12,
    marginLeft: 14,
    marginTop: 0,
  },
}));

const TextareaField = ({
  cols,
  rows,
  label,
  name,
  handleChange,
  runControlValidation,
  formState
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <TextareaAutosize
        cols={cols}
        rows={rows}
        className={classes.textarea}
        placeholder={label}
        id={name}
        onChange={handleChange}
        onBlur={runControlValidation(name)}
      />
      {formState.errors && formState.errors[name] ? (
        <p className={classes.error}>{formState.errors[name]}</p>
      ) : null}
    </Fragment>
  );
};

export default TextareaField;
