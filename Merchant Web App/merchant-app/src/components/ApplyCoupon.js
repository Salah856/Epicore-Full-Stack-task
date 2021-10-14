import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import REDEEM_COUPON from '../GraphQL/queries/redeemCoupon';
//import { useQuery } from '@apollo/client';

import {
  Box, Button, Card, CardContent,
  Divider, FormHelperText,
  Grid, TextField, makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ApplyCoupon = ({ className, ...rest }) => {
  
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    // const { loading, error, data } = useQuery(REDEEM_COUPON);

   return (
    <Formik
      enableReinitialize
      initialValues={{
        code: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(8, 'Must be exactly 8 digits')
        .max(8, 'Must be exactly 8 digits')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {

        
         // sending redeem coupon graphql

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          
          enqueueSnackbar('Coupon Redeemed Successfully!', {
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
                    error={Boolean(touched.code && errors.code)}
                    fullWidth
                    helperText={touched.code && errors.code}
                    label="Enter Coupon Code"
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code}
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
                Redeem Coupon Code
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ApplyCoupon.propTypes = {
  className: PropTypes.string,
};

export default ApplyCoupon;

