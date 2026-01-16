import React, { useState, useContext } from 'react';
import '../ForgotPassword/ForgotPassword.css'; // Reuse CSS
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { url } = useContext(StoreContext);
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${url}/user/reset-password/${token}`, { password });
            if (res.data.success) {
                toast.success("Password reset successfully. Please login.");
                navigate('/');
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
                <h2>Reset Password</h2>
                <p>Enter your new password.</p>
                <input
                    type="password"
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                />
                <input
                    type="password"
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
