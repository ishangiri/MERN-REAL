import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import fetchData from '../utils/fetchUtil'
import { toast } from 'react-toastify'
import { useDashboardContext } from './DashboardLayout'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'



export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await fetchData.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-jobs');
  }
};    


const EditJob = () => {

  const params = useParams();
  console.log(params);
  const {job} = useLoaderData();
  const navigate = useNavigate();
  


  const { isDarkTheme } = useDashboardContext();
 
  const formSchema = z.object({
    // Basic string validation
    company: z.string().min(2, {
      message: "Company must be at least 2 characters."
    }),
    
    // Email validation
    position: z.string().min(2, { 
      message: "position must be atleast 2 characters" 
    }),

    salary : z.string().min(2, {
      message : "Salary must be 2 characters"
    }),
    
    //JOb Location validation
    jobLocation: z.string().min(2,{
      message : "location must be atleast 2 characters"
    }),
    
    // Number field with min/max validation
    jobDescription: z.string().min(20, {
      message : () => ({message : "Invalid Job Description"})
    }),
    
    // Enum or specific string values
    jobType: z.enum(["full-time", "part-time", "internship"], {
      errorMap: () => ({ message: "Invalid job type" })
    })
  })

  // Create form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: job.company,
      position: job.position,
      salary : job.salary,
      jobLocation: job.jobLocation,
      jobDescription: job.jobDescription,
      jobType: job.jobType
    }
  })

  // Submit handler
const onSubmit = async(data) => {
  console.log(data);
  
   try {
     await fetchData.patch(`/jobs/${params.id}`, data);
     toast.success("Job Edited Successfully");
     navigate('../all-jobs')
   } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
     
   }
  
}

return (
  <div
    style={{ backgroundColor: isDarkTheme ? "#4D4D4D" : "white" }}
    className="border-none  p-6 sm:p-10 lg:p-16 rounded-lg"
  >
    <div className="flex justify-center">
      <p className="mb-6 text-lg sm:text-xl lg:text-2xl font-extrabold">Post Job</p>
    </div>

    <div className="flex justify-center items-center">
      <Form {...form}>
      <div className="w-full lg:w-[80%] xl:w-[70%]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Company Field */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold text-[#4b95bc]">Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position Field */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold text-[#4b95bc]">Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

                <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold text-[#4b95bc]">Salary Range</FormLabel>
                  <FormControl>
                    <Input placeholder="Salary Range" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Job Location Field */}
            <FormField
              control={form.control}
              name="jobLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold text-[#4b95bc]">Job Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Description Field */}
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold text-[#4b95bc]">Job Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder='jobDescription......' className="w-full h-80 sm:h-96 p-2 border rounded bg-transparent resize-none"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Type Field */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold text-[#4b95bc]">Job Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-2 border rounded bg-transparent"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="internship">Contract</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-6">
              <Button
                variant="outline"
                type="submit"
                className="bg-transparent text-[#4b95bc] w-full sm:w-96"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  </div>
);
}

export default EditJob;