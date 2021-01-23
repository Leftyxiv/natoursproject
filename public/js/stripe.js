/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts'
const stripe = Stripe('pk_test_51ICUbJCmKh2QkhLrblIXLN8WyXOMcG8snpqJGvKAJ6I23fpIOUeQNUMBTr0dCijksuQYKTEhssdRfoYDA4tIxain00UHDreOsZ');

export const bookTour = async tourId => {
  try {
  const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
  
  await stripe.redirectToCheckout({
    sessionId: session.data.session.id,
  })
}catch(err){
//console.log(err)
showAlert('error', err)
  }
}