import react, {useContext, useEffect} from 'react'
import AuthCont from '../Context/authContext';
import {useHistory} from 'react-router-dom'

const Home = () => {

    const {isAuth} = useContext(AuthCont);

    const {history} = useHistory();

    useEffect(() => {
        if(isAuth)
            history.push('/')
    }, [])

    return(
        <div>

        </div>
    )
}

export default Home;