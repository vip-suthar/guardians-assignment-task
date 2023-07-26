import React, { useState } from "react";
import Card from "../Commons/Card";
import Fields from "./field";
import Button from "../Commons/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/actions/userDataAction";

function titleCase(str) {
    str = str.replace(/([A-Z])/g, " $1");
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

export default function Profile() {

    const profileFields = useSelector(state => state.userData);
    const [profileInfo, setProfileInfo] = useState(profileFields || {});

    const fieldKeys = Object.keys(profileInfo);
    const initFieldState = {};
    fieldKeys.forEach(key => {
        initFieldState[key] = {
            'editing': false,
            'loading': false
        };
    })
    const [fieldState, setFieldState] = useState(initFieldState);

    const dispatch = useDispatch();

    const handleFieldChange = (fieldName, colName, value) => {
        setProfileInfo(state => {
            state = {
                ...state,
                [fieldName]: {
                    ...state[fieldName],
                    [colName]: value
                }
            }
            return state;
        })
    }

    const updateData = async () => {
        try {
            dispatch(await updateUserData(profileInfo));
        } catch (error) {
            alert('Some error occured; Please try again; profile');
            console.log(error)
            setProfileInfo(profileFields || {});
        }
    }

    const handleFieldEdit = async (fieldName) => {
        if (fieldState[fieldName].editing) {

            setFieldState(state => {
                state = {
                    ...state,
                    [fieldName]: {
                        ...state[fieldName],
                        loading: true
                    }
                }
                return state;
            })

            await updateData();

            setFieldState(state => {
                state = {
                    ...state,
                    [fieldName]: {
                        loading: false,
                        editing: false
                    }
                }
                return state;
            })
        } else {
            setFieldState(state => {
                state = {
                    ...state,
                    [fieldName]: {
                        ...state[fieldName],
                        editing: true
                    }
                }
                return state;
            })
        }
    }

    return (
        <div className="block w-full h-[calc(100%-100px)] overflow-auto no-scrollbar flex flex-row flex-wrap gap-12 justify-around items-center py-12">
            {
                fieldKeys
                    .map(key => {
                        return (
                            <Card key={key} title={titleCase(key)}>
                                <Fields fields={profileInfo[key]} handleFieldChange={handleFieldChange.bind(null, key)} editMode={fieldState[key].editing} />
                                <Button
                                    text={
                                        fieldState[key].editing ?
                                            fieldState[key].loading ?
                                                <p className='w-full h-max inline-flex justify-center text-center align-middle font-sans text-xs font-bold uppercase -mt-1'>
                                                    <svg className="animate-spin h-4 w-4 mr-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving
                                                </p>
                                                : "Save"
                                            : "Edit"
                                    }
                                    isDisabled={fieldState[key].loading}
                                    handleClick={handleFieldEdit.bind(null, key)}
                                />
                            </Card>
                        )
                    })
            }
        </div>

    )
}