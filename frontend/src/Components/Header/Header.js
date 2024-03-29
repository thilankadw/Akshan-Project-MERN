import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/Logo/logoblack.png';
import styles from '../../Styles/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { reset } from '../../features/order/orderSlice';
import { addToCart, viewCart, deleteFromCart } from '../../features/cart/cartSlice'

const Header = () => {

    const [open, setopen] = useState(false);

    const { user } = useSelector(
        (state) => state.auth
    )

    const { cart } = useSelector(
        (state) => state.cart
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        dispatch(viewCart())
    }, [deleteFromCart, addToCart, dispatch]);

    return (
        <>
            <div className={`flex justify-center`} >

                <div className='fixed top-0 left-0 right-0 z-10 py-[20px] px-[80px] flex flex-shrink flex-col xl:flex-row items-center justify-center xl:gap-[350px] bg-white'>

                    <div class="p-4 flex flex-row items-center justify-center gap-[130px] sm:gap-[180px]">
                        <div className='w-[109px] h-[22px]'><Link to='/'><img src={Logo} className='w-[109px] h-[22px]' alt="Logo" /></Link></div>
                        <button class="xl:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => {setopen(!open)}}>
                            <MenuIcon />
                        </button>
                    </div>

                    <div className={` ${open ? 'flex' : 'hidden'} xl:flex flex-col xl:flex-row items-center justify-center gap-[20px] xl:gap-[60px] max-w-fit`}>
                        <div className='w-max'>
                            <Link to='/' className={`${styles.body_14_regular} text-[#000]`} >Home</Link>
                        </div>
                        <div className='w-max'>
                            <Link to='/services' className={`${styles.body_14_regular} text-[#000]`}>Services</Link>
                        </div>
                        <div className='w-max'>
                            <Link to='/about-us' className={`${styles.body_14_regular} text-[#000] `}>About Us</Link>
                        </div>
                        <div className='w-max'>
                            <Link to='/shop' className={`${styles.body_14_regular} text-[#000]`}>Shop</Link>
                        </div>
                        <div className='w-max'>
                            <Link to='/contact-us' className={`${styles.body_14_regular} text-[#000]`}>Contact</Link>
                        </div>
                        {(!user) && (
                            <div className='w-max'>
                                <Link to='/login' className={`${styles.body_14_regular} text-[#000]`}>Login</Link>
                            </div>
                        )}
                        {(user) && (
                            <div className='w-max'>
                                <button 
                                    onClick={() =>  {dispatch(reset()); dispatch(logout()); navigate('/')}}
                                    className={`${styles.body_14_regular} text-[#000]`}>
                                    Log Out
                                </button>
                            </div>
                        )}
                        {(user) && (
                            <div className='w-max'>
                                <Link to='/cart' className={`${styles.body_14_extrabold} py-[11px] px-[30px] rounded-[20px] bg-[#EFF422]`}>
                                    {cart ? `Cart(${cart.length})` : `Cart(0)`}
                                </Link> 
                            </div>
                        )}
                    </div>

                </div>            

            </div>
        </>
    );
};

export default Header;
