import React from "react";
import Input from "../Commons/Input";

export default function BasicInfo({ handleChange }) {

    return (
        <div className="flex flex-col gap-4">
            <Input
                id="email"
                name="email"
                labelText="Email"
                type="email"
                placeholder="Email"
                handleChange={(val) => { handleChange("email", val) }}
                isRequired={true}
            />

            <Input
                id="password"
                name="password"
                labelText="Password"
                type="password"
                placeholder="Password"
                handleChange={(val) => { handleChange("password", val) }}
                isRequired={true}
            />
            <Input
                id="name"
                name="name"
                labelText="Full Name"
                type="text"
                placeholder="Full Name"
                handleChange={(val) => { handleChange("name", val) }}
                isRequired={true}
            />

            <Input
                id="phone"
                name="phone"
                labelText="Phone Number"
                type="text"
                placeholder="Phone Number"
                handleChange={(val) => { handleChange("phoneNumber", val) }}
                isRequired={true}
            />
        </div>
    )
}