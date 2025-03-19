import React from 'react'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { peticionesPost } from './peticionesAPI'

const stripePromise = loadStripe('pk_test_51QzmmfGIqfSUarvoTHAmMWdtBopJfOy76PQh7jxLQHHUYFpGMgIce0ONjtvI4Ma3uycL0qOAgzvwHRDfZx6yJuTY00GH2GTe8o')

const PayForm = ({ monto }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await peticionesPost('create-payment-intent', false, { amount: monto, currency: 'mxn' });
                if (!response) throw new Error("Error obteniendo el clientSecret");

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchClientSecret();
    }, [monto]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if (result.error) {
            console.log('Error', error.message)
            // showNotification(error.message, 'error')
        } else {
            console.log('Pago exitoso')
            // showNotification('Pago exitoso', 'success')
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <CardElement />
            <button type='submit' disabled={!stripe} > Pagar </button>
        </form>
    )
}

const PaymentPage = ({ monto }) => {
    return (
        <Elements stripe={stripePromise}>
            <PayForm monto={monto} />
        </Elements>
    );
};

export default PaymentPage