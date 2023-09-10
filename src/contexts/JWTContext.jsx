import {createContext, useEffect, useReducer} from 'react';
// utils
import {isValidToken, setSession} from '../utils/jwt';
import {getUser} from "src/services/users/user";

// ----------------------------------------------------------------------



// interface UserContextType {
//     isAuthenticated: boolean,
//     isInitialized: boolean,
//     user: object,
// }

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    panelType: null
};

const handlers = {
    SET_PANEL_TYPE: (state, action) => {
        const { panelType } = action.payload;
        return {
          ...state,
          panelType,
        };
      },
    INITIALIZE: (state, action) => {
        const {isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    REGISTER: (state, action) => {
        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: false,
            user,
        };
    },
    UPDATEUSER: (state, action) => {
        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);


const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
    changeUser: () => Promise.resolve(),
    saveUser: () => Promise.resolve(),
    updateUser: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                const refreshToken = window.localStorage.getItem('refreshToken');
                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken, refreshToken || '');
                    const response = await getUser();
                    const {data: user} = response;
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user: user,
                        },
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (access_token, refresh_token) => {
        setSession(access_token, refresh_token);
        const userInfo = await getUser();
        if (userInfo.isSuccess) {
            const {data: user} = userInfo
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: user,
                },
            });
        } else {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: {
                        username: 'پیش فرض',
                    },
                },
            });
        }
    };

    const register = async (mobile) => {
        await saveUser({mode: 'register',mobile: mobile})
    };

    const logout = async () => {
        setSession(null, null);
        dispatch({type: 'LOGOUT'});
    };

    const saveUser = async (user) => {
        dispatch({
            type: 'REGISTER',
            payload: {
                user: user
            },
        });
    };

    const changeUser = async (user) => {
        dispatch({
            type: 'INITIALIZE',
            payload: {
                isAuthenticated: true,
                user: user,
            },
        });
    };

    const updateUser = async () => {
        const response = await getUser();
        const {data: user} = response;
        dispatch({
            type: 'UPDATEUSER',
            payload: {
                isAuthenticated: true,
                user: user,
            },
        });
    };
    const setPanelType = async (panelType) => {
        dispatch({
            type: 'SET_PANEL_TYPE',
            payload: {
                panelType: panelType,
               
            },
        });
    };
  
  
    
    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
                changeUser,
                saveUser,
                updateUser,
                setPanelType
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};
