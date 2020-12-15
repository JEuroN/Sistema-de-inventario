import react, {useContext, useEffect} from 'react'
import {AuthContext} from '../Context/authContext';
import {useHistory} from 'react-router-dom'

const Home = () => {

    const {isAuth} = useContext(AuthContext);

    const history = useHistory();

    const check = () =>{
        if(!isAuth)
            history.push('/')
    }


    useEffect(check, [isAuth])


    return(
        <div>

        </div>
    )
}

export default Home;