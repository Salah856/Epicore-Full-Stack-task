import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import {
  Box, Button, Card, CardContent,
  Divider, FormHelperText,
  Grid, TextField, makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const CreateCoupon = ({ className, ...rest }) => {
  
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

   return (
    <Formik
      enableReinitialize
      initialValues={{
        expiryDate:  '',
        text: '',
        foodItemName: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        expiryDate: Yup.date().required(),
        text: Yup.string().max(255),
        foodItemName: Yup.string().max(255),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {

            const coupon = {
                foodItemName: values.foodItemName, 
                expiryDate: values.expiryDate, 
                text: values.text, 
                code: parseInt(Math.random().toFixed(8).split('.')[1])
            }

          
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          
          enqueueSnackbar('Coupon updated', {
            variant: 'success'
          });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.text && errors.text)}
                    fullWidth
                    helperText={touched.text && errors.text}
                    label="Coupon Text"
                    name="Coupon text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.text}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.foodItemName && errors.foodItemName)}
                    fullWidth
                    helperText={touched.foodItemName && errors.foodItemName ? errors.foodItemName : 'Name of Food Item'}
                    label="Food Item Name"
                    name="foodItemName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.foodItemName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.expiryDate && errors.expiryDate)}
                    fullWidth
                    helperText={touched.expiryDate && errors.expirtDate}
                    label="Coupon Expiry Date"
                    name="expiryDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.expiryDate}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

CreateCoupon.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default CreateCoupon;

