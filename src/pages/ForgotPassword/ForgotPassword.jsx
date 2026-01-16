import React, { useState, useContext } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const { url } = useContext(StoreContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${url}/user/forgot-password`, { email });
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='forgot-password'>
            <form onSubmit={handleSubmit} className="forgot-password-container">
                <h2>Forgot Password</h2>
                <p>Enter your email address to reset your password.</p>
                <input
                    type="email"
                    placeholder='Your Email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <p>Go to  <Link to="/">Home Page</Link></p>
            </form>
        </div>
    );
};

export default ForgotPassword;
