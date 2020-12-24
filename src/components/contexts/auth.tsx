import { createContext, useState, useContext, useEffect } from 'react'
import { getCookie, removeCookie, setCookie } from '../../actions/cookie'
import { useRouter } from 'next/router'
import axios from 'axios'
import { BASE_URL } from '../../config';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()


    useEffect(() => {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers.Accept = 'application/json';
        axios.interceptors.response.use(
            response => {
                return response;
            },
            err => {
                return new Promise(() => {
                    if (err.response !== undefined) {
                        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                            logout()
                        }
                    }
                    throw err;
                });
            }
        );

        (() => {
            const token = getCookie('token')

            if (token) {
                axios.defaults.headers.Authorization = `Bearer ${token}`
                // const { data: user } = await api.get('users/me')
                setUser({
                    token
                });

            }
            else setUser({});

            setLoading(false)
        })()

    }, [])


    const signIn = (data: { username: String; password: String; }): any => {

        return new Promise<void>((resolve, reject) => {

            axios({
                method: "POST",
                url: "authenticate",
                data: {
                    username: data.username,
                    password: data.password
                }
            })
                .then(response => {
                    const { token } = response.data;
                    if (token) {
                        setCookie('token', token)
                        axios.defaults.headers.Authorization = `Bearer ${token}`
                        setUser({
                            uid: 'dsdfsdf'
                        });
                        resolve()
                        router.push('/users/users-list')
                    }
                })
                .catch(error => {
                    console.log(error)
                    alert("ورود نا موفق !")
                    reject()
                })
        })
    }

    const logout = () => {
        removeCookie('token')
        setUser(null)
        router.push({
            pathname: '/auth/sign-in',
            query: {
                message: 'Your session is expired. Please login'
            }
        });
    }

    return (
        <AuthContext.Provider value={{ isAuth: !!user, user, signIn, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}



export default function useAuth() {
    return useContext(AuthContext)
};
