import React, { useState } from "react";
import { useDispatch } from "react-redux";

import UserActions from "./userActions";
import Input from "../Commons/Input";
import Button from "../Commons/Button";
import Card from "../Commons/Card";
import { login } from "../../store/actions/userDataAction";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, SetRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        setIsLoading(true);
        try {
            dispatch(await login({ email, password, rememberMe }));
        } catch (err) {
            alert(err.message);
        }
        setIsLoading(false);
    }


    return (
        <div className="flex items-center justify-center">
            <Card title="Welcome Back!">
                <div className="flex flex-col gap-4">
                    <Input
                        id="email"
                        name="email"
                        labelText="Email"
                        type="email"
                        placeholder="Email"
                        handleChange={(val) => { setEmail(val) }}
                        isRequired={true}
                    />
                    <Input
                        id="password"
                        name="password"
                        labelText="Password"
                        type="password"
                        placeholder="Password"
                        handleChange={(val) => { setPassword(val) }}
                        isRequired={true}
                    />
                    <div className="-ml-2.5">
                        <UserActions onRememberMeChange={SetRememberMe} />
                    </div>
                </div>
                <div className="mt-6">
                    <Button text={
                        isLoading ?
                            <p className='w-full h-max inline-flex justify-center text-center align-middle font-sans text-xs font-bold uppercase -mt-1'>
                                <svg className="animate-spin h-4 w-4 mr-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in
                            </p> : "Sign In"
                    }
                    handleClick={handleSubmit}
                    isDisabled={isLoading}
                    />
                    <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                        Don't have an account?
                        <a
                            href="/signup"
                            className="ml-1 block font-sans text-sm font-bold leading-normal text-indigo-500 antialiased"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    )
}