import { login } from "@/api/userApi";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";


function LoginIndex() {

    const { control, handleSubmit } = useForm();
    const { push } = useRouter();
    const onSubmit = (data: any) => {
        login(data.username)
            .then(res => localStorage.setItem('user', JSON.stringify(res)))
            .then(() => push({ pathname: '/' }));
    }

    return (
        <>
            <div className="flex justify-center w-full text-center font-extrabold text-6xl mt-5">
                Login
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='ml-24'>
                <div className="mt-10">
                    <label> Username: </label>
                    <Controller
                        control={control}
                        name='username'
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                className='border border-black'
                            />
                        )}
                    />
                </div>
                <div>
                    <button type="submit" className="pt-1 pb-1 pl-2 pr-2 bg-blue-500 text-white rounded-lg shadow-lg hover:translate-y-1 transition-all duration-100">Submit</button>
                </div>
            </form>
        </>
    )
}

export default LoginIndex;