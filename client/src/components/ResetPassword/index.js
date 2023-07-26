import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../Commons/Input";
import Button from "../Commons/Button";
import Card from "../Commons/Card";
import Validate from '../../utils/validations';
import { resetPassword } from "../../store/actions/userDataAction";

export default function ResetPassword({ token }) {
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            let { valid, msg } = Validate('password', password);
            if (!valid) {
                alert(msg);
                return;
            } else if (password != confPass) {
                alert("Password and Confirm Password does not matches");
            }

            setIsLoading(true);
            await resetPassword({ password, token });
            setIsLoading(false);
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <Card title="Reset Password">
                <div className="flex flex-col gap-4">
                    <Input
                        id="password"
                        name="password"
                        labelText="Password"
                        type="password"
                        placeholder="Password"
                        handleChange={(val) => { setPassword(val) }}
                        isRequired={true}
                    />
                    <Input
                        id="confirm-password"
                        name="confirm-password"
                        labelText="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        handleChange={(val) => { setConfPass(val) }}
                        isRequired={true}
                    />
                </div>
                <div className="mt-6">
                    <Button text={
                        isLoading ?
                            <p className='w-full h-max inline-flex justify-center text-center align-middle font-sans text-xs font-bold uppercase -mt-1'>
                                <svg className="animate-spin h-4 w-4 mr-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Resetting
                            </p> : "Reset Password"
                    }
                        handleClick={handleSubmit}
                        isDisabled={isLoading}
                    />
                </div>
            </Card>
        </div>
    )
}