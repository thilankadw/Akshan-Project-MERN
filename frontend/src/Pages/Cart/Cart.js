import styles from '../../Styles/styles';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, viewCart, deleteFromCart, reset } from '../../features/cart/cartSlice'
import { createOrder } from '../../features/order/orderSlice'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cart } = useSelector(
        (state) => state.cart
    )
    const { isSuccess, orderId } = useSelector(
        (state) => state.order
    )

    const { user } = useSelector(
        (state) => state.auth
    )

    //fees calculation
    let subTotal = 0 ;
    const calculateSubTotal = () => {
        if(cart && cart.length > 0){
            cart.forEach((product) => {
                const total = product.quantity * product.productPrice;
                subTotal += total;
            });
        }       
    };
    calculateSubTotal();

    let processing = 3;

    const totalAmount = (subTotal + subTotal * (processing / 100)).toFixed(2);

    //get itemid and quantity from cart array for create order
    const items = [];

    cart.forEach(item => {
        const newItem = {
          item: item.productId,
          quantity: item.quantity
        };
        items.push(newItem);
    });

    //prepare data for send to server
    const ordertDetails = { items, totalAmount };

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        if(isSuccess || orderId){
            navigate('/order')
        }

        dispatch(viewCart())
    }, [deleteFromCart, addToCart, dispatch, createOrder, orderId, isSuccess]);

    return(

        <>
            <div>
                <Header/>

                <div className='flex items-start justify-center mt-[123px] mb-[80px] gap-[150px]'>

                    {

                        cart && cart.length > 0 ?

                        <div className='flex flex-col sm:flex-row items-start justify-center gap-[150px] w-[330px] sm:w-[900px]'>

                            <div className='flex flex-col gap-[30px] w-[330px] sm:w-full ml-[20px] sm:ml-0'>

                                {cart.map((item) => {
                                    const productId = item.productId;
                                    const cartDeleteData = { productId }
                                    return (
                                        <div className='flex items-start gap-[40px]' key={item._id}>
                                            <div className='w-[100px] overflow-hidden'><img src={item.cartImage} className='rounded-[5px]' /></div>
                                            <div className='flex flex-col gap-[10px]'>
                                                <div className={`${styles.body_18_regular} flex gap-[20px] w-[130px] sm:w-[300px]`}>{item.productName}<div>{item.quantity}x</div></div>
                                                <div className={`${styles.body_14_regular} flex`}>$  <div>{item.productPrice}</div></div>
                                                <div className={`${styles.body_14_regular}`}>
                                                    <button onClick={() => { dispatch(deleteFromCart(cartDeleteData)) }}><DeleteIcon></DeleteIcon></button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>

                            <div className='flex flex-col w-[300px] sm:w-[400px] relative top-[-15px] gap-[20px] '>
                                <div className={`${styles.body_40_semibols} font-[400] pl-[30px] sm:pl-0`}>Summary</div>
                                <div className={`${styles.body_20_regular} flex flex-col sm:flex-row justify-between pl-[30px] sm:pl-0`}>Subtotal <div>{subTotal} $</div></div>
                                <div className={`${styles.body_20_regular} flex flex-col sm:flex-row justify-between pl-[30px] sm:pl-0`}>Tax & other processing fees <div>{processing}%</div></div>
                                <div className={`${styles.body_24_regular} text-[30px] w-[300px] flex justify-center gap-[50px] sm:gap-[120px]`}>Total<div>{totalAmount} $</div></div>
                                <div className={`${styles.body_20_regular} flex flex-col sm:flex-row justify-center items-center mt-[10px] pl-[20px] sm:pl-0`}>
                                    <button 
                                        onClick={() => {dispatch(createOrder(ordertDetails));}}
                                        className='bg-black text-white py-[11px] px-[80px] rounded-[35px]'
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>

                        </div>

                        : 

                        
                        <div className='flex flex-col items-center justify-center gap-[50px] mt-[50px]'>

                            <div className={`${styles.body_40_regular}`}>Your Cart is Empty</div>
                            <div className={`${styles.body_28_semibols}`}><Link to='/shop' className='flex gap-[30px] justify-center items-center bg-black text-white py-[10px] px-[50px] rounded-[30px]'>Visit Shop<ArrowForwardIosIcon></ArrowForwardIosIcon></Link></div>

                        </div>
    

                    }

                    

                    
                </div>

                <Footer/>
            </div>
        </>

    );

};

export default Cart;