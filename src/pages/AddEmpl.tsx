import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import constants from '../constants'

const AddEmpl = () => {
  const [employee_name, setEmployee_name] = useState<string>()
  const [employee_salary, setEmployee_salary] = useState<string>()
  const [employee_age, setEmployee_age] = useState<string>()
  const [employee_image, setEmployee_image] = useState<string>()
  const [employee_id, setEmployee_id] = useState<string>()

  const navigate = useNavigate()

  const updateEmp = (event: any) => {
    event.preventDefault()

    const employee = {
      id: employee_id,
      employee_name: employee_name,
      employee_salary: employee_salary,
      employee_age: employee_age,
      profile_image: employee_image
    }
    axios
      .post(constants.ADD_EMPLOYEE, employee)
      .then((data) => {
        console.log(data.data)
        setTimeout(() => {
          navigate('/')
        }, 1000)
      })
      .catch((err) => console.log(err.message))
  }
  return (
    <div>
      <form
        onSubmit={updateEmp}
        className="border border-gray-50 rounded-xl p-20 shadow-xl"
      >
        Change details
        <br />
        <label htmlFor="id">Enter id</label>
        <br />
        <input
          type="number"
          id="id"
          className="rounded-full"
          onChange={(e) => setEmployee_id(e.target.value)}
        />
        <br />
        <label htmlFor="name">Enter name</label>
        <br />
        <input
          type="text"
          className="rounded-full"
          id="name"
          onChange={(e) => setEmployee_name(e.target.value)}
        />
        <br />
        <label htmlFor="salary">Enter salary</label>
        <br />
        <input
          type="number"
          id="salary"
          className="rounded-full"
          onChange={(e) => setEmployee_salary(e.target.value)}
        />
        <br />
        <label htmlFor="age">Enter age</label>
        <br />
        <input
          type="number"
          className="rounded-full"
          id="age"
          onChange={(e) => setEmployee_age(e.target.value)}
        />
        <br />
        <label htmlFor="img">Enter profile image link</label>
        <br />
        <input
          type="text"
          className="rounded-full"
          id="img"
          onChange={(e) => setEmployee_image(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 px-10 py-2 mt-10 text-white rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddEmpl
