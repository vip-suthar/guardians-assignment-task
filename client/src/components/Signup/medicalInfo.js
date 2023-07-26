import React from "react";
import Input from "../Commons/Input";


export default function MedicalInfo({ handleChange }) {

    return (
        <div className="flex flex-col gap-4">
            <Input
                id="allergies"
                name="allergies"
                labelText="Allergies"
                type="text"
                placeholder="Allergies"
                handleChange={(val) => { handleChange("allergies", val) }}
                isRequired={true}
            />
            <Input
                id="currMedications"
                name="currMedications"
                labelText="Current Medications"
                type="text"
                placeholder="Current Medications"
                handleChange={(val) => { handleChange("currMedications", val) }}
                isRequired={true}
            />
            <Input
                id="medicalCondtns"
                name="medicalCondtns"
                labelText="Medical Conditions"
                type="text"
                placeholder="Medical Conditions"
                handleChange={(val) => { handleChange("medicalCondtns", val) }}
                isRequired={true}
            />
        </div>
    )
}