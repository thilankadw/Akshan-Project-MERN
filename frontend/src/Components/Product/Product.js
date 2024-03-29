import { Link } from 'react-router-dom';
import styles from '../../Styles/styles';

const Product = (props) => {

    return(

        <>
            <div>
                <div className='mb-[60px] w-[330px] sm:w-full'>
                    <Link to={`/product/${props.ProductId}`}>
                        <div className='w-[410px] overflow-hidden'>
                            <img src={props.ImageLink} className='rounded-[10px] w-[300px] sm:w-[500px]'/>
                        </div>
                    </Link>
                    <div className={`${styles.body_20_regular} text-[#000] mt-[33px]`}>{props.ProductName}</div>
                    <div className={`${styles.body_20_regular} text-[#000] mt-[15px]`}>$ {props.ProductPrice}</div>
                </div>
            </div>
        </>

    );
};

export default Product;