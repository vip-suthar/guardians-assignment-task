import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../Commons/Input";
import Button from "../Commons/Button";
import Card from "../Commons/Card";
import Validate from '../../utils/validations';
import { forgotPass } from "../../store/actions/userDataAction";

export default function ForgotPassword({ token }) {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            let { valid, msg } = Validate('email', email);
            if (!valid) {
                alert(msg);
                return;
            }

            setIsLoading(true);

            await forgotPass(email);

            setIsLoading(false);
            setEmailSent(true);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <Card title="Forgot Password">
                {emailSent ?
                    <>
                        <p className="block font-sans text-base text-center font-light leading-relaxed text-inherit antialiased mb-4">
                            An email has been sent to <b className="font-bold">&lt;{email}&gt;</b><br />
                            <Link to='/login'>
                                Sign in
                            </Link>
                        </p>
                    </> :
                    <>
                        <p className="block font-sans text-base text-center font-light leading-relaxed text-inherit antialiased mb-4">
                            Enter the email to send a password reset link
                        </p>
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
                        </div>
                        <div className="mt-6">
                            <Button text={
                                isLoading ?
                                    <p className='w-full h-max inline-flex justify-center text-center align-middle font-sans text-xs font-bold uppercase -mt-1'>
                                        <svg className="animate-spin h-4 w-4 mr-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending
                                    </p> : "Send Link"
                            }
                                handleClick={handleSubmit}
                                isDisabled={isLoading}
                            />
                        </div>
                    </>
                }
            </Card>
        </div>
    )
}