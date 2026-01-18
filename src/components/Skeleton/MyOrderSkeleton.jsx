import React from 'react'
import './MyOrderSkeleton.css'

const MyOrderSkeleton = () => {
    return (
        <div className='my-order-skeleton'>
            <div className="skeleton-card">
                <div className="skeleton-img"></div>
                <div className="skeleton-box" style={{ width: '80%' }}></div>
                <div className="skeleton-box" style={{ width: '50%' }}></div>
                <div className="skeleton-box" style={{ width: '30%' }}></div>
                <div className="skeleton-box" style={{ width: '40%' }}></div>
                <div className="skeleton-btn"></div>
            </div>
        </div>
    )
}

export default MyOrderSkeleton
