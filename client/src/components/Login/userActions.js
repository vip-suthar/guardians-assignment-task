import React from "react"
import Checkbox from "../Commons/Checkbox"

export default function UserActions({ onRememberMeChange }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Checkbox onChange={onRememberMeChange}/>
        <label className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="flex justify-center items-center font-sans text-sm font-light leading-normal text-inherit antialiased">
        <a
          href="/signup"
          className="ml-1 block font-sans text-sm leading-normal text-indigo-500 antialiased"
        >
          Forgot your password?
        </a>
      </div>
    </div>

  )
}