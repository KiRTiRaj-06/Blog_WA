import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home,  Login, SignupPage  , AllPost , AddPost , EditPost, Post} from './pages/index2.js'
import AuthLayout from './components/AuthLayout.jsx'

const Router = createBrowserRouter([
        {
          path: '/',
          element: <App />,
          children:[
            {
              path:'/ ',
              element: <Home />
            },
            {
                path:'/login',
              element: (
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              )
            },
            {
                path:'/signup',
              element: (
                <AuthLayout authentication={false}>
                  <SignupPage />
                </AuthLayout>
              )
            },
            {
                path:'/all-posts',
              element: (
                <AuthLayout authentication>
                  {' '}
                  <AllPost />
                </AuthLayout>
              )
            },
            {
                path:'/add-post',
              element: (
                <AuthLayout authentication>
                  {' '}
                  <AddPost />
                </AuthLayout>
              )
            },
            {
                path:'/Edit-Post/:slug',
              element: (
                <AuthLayout authentication>
                  {' '}
                  <EditPost />
                </AuthLayout>
              )
            },
            {
                path:'/post/:slug',
              element: (
                <AuthLayout authentication>
                  {' '}
                  <Post />
                </AuthLayout>
              )
            },
          ]
        }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </StrictMode>
)
