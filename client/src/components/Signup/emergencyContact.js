import React from "react";
import Input from "../Commons/Input";

export default function EmergencyContact({ handleChange }) {
    
    return (
        <div className="flex flex-col gap-4">
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
            <Input
                id="address"
                name="address"
                labelText="Address"
                type="text"
                placeholder="Address"
                handleChange={(val) => { handleChange("address", val) }}
                isRequired={true}
            />
        </div>
    )
}