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

const RegisterPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const isDesigner = watch('isDesigner')

  const onSubmit = async (data) => {
    console.log("Form Submitted", data)
      const loadingToast = toast.loading('Registering...')
    try {

      const response = await api.post("/register", {
        name: data.name,
        password: data.password,
        email: data.email,
        isdesigner: data.isDesigner || false,
        role: data.job_type || null
      })

      if (response?.data?.success) {
        toast.success(response.data.message || 'Registration successful!', {
          id: loadingToast,
          duration: 3000,
        })
        navigate('/login')
        reset()
      } else {
        toast.error(response?.data?.message || 'Registration failed', {
          id: loadingToast,
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error?.response?.data?.message || error.message || 'Registration failed. Please try again.', {
        duration: 3000,
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 mt-13">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>Enter your Details</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Full name is required' })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 font-bold">{errors.name.message}</p>
                )}
              </div>

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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-bold">{errors.password.message}</p>
                )}
              </div>

             
              <div className="flex items-center space-x-2">
                <input
                  id="isDesigner"
                  type="checkbox"
                  {...register('isDesigner')}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                />
                <Label htmlFor="isDesigner" className="text-sm text-gray-600">Register as a Designer</Label>
              </div>

              {isDesigner && (
                <div>
                  <Label htmlFor="job_type" className="ml-2 text-sm text-gray-500 ">Job Type</Label>
                  <select
                    id="job_type"
                    {...register('job_type', { required: true })}
                    className="peer w-full mt-2 p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-5"
                  >
                    
                     <option value="Web Designer">Web Designer</option>
              <option value="Branding">Branding</option>
              <option value="Illustration">Illustration</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Product Design">Product Design</option>
              <option value="Logo Design">Logo Design</option>
                  </select>
                  {errors.job_type && (
                    <p className="text-sm text-red-500 mt-1">Job Type is required</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full mt-2 bg-amber-200">
              Register
            </Button>
            <Button variant="link" type="button" className="w-full">
              <Link to={'/login'}>Sign in</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage
