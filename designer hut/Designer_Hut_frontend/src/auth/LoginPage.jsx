import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { loginData } from '@/redux/designerAssetsSlice'
import { Endpoint } from '@/constants/endpoints'



const LoginPage = () => {

const navigate = useNavigate()
const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {

   try {
           const response = await api.post(Endpoint.LOGIN, {
           email: data.email,
           password: data.password,
        
      })

       const loadingat = toast.loading('...loging')
      if(response?.data?.success){


        toast.success(response.data.message || 'login     successful!',{
          id : loadingat ,
          duration : 3000
        })

             dispatch(loginData({                      
        user : response?.data?.user,
        authenticate  : response?.data?.isauthenticated ,
        token : response?.data?.token  
      }))

        localStorage.setItem('designerhut_user', JSON.stringify({
        user :response?.data?.user ,
        isauthenticated : response?.data?.isauthenticated  ,
        token : response?.data?.token  
      }))

        navigate('/')
        reset()  

      }
      else{
        toast.error(response?.data?.message || 'registration failed',{
          id : loadingat ,
          duration : 3000
        })
      }
        } catch (error) {
         toast.error("loging error",error);
        toast.error(error?.response?.data?.message || error.message || 'login failed',{
          duration : 3000
        })
        } 


    
     

    reset();
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">

                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-bold">{errors.email.message}</p>
                )}
              </div>


              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-bold">{errors.password.message}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full mt-2 bg-amber-300">
              Login
            </Button>

            <Button variant="link" type="button" className="w-full">
              <Link to={'/register'}>   Sign up </Link>
            </Button>

          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
