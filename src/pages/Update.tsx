import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import constants from '../constants'
const Update = () => {
  const [Emp, setEmp] = useState<any>()
  const [Err, setErr] = useState()
  const [employee_name, setEmployee_name] = useState<string>()
  const [employee_salary, setEmployee_salary] = useState<string>()
  const [employee_age, setEmployee_age] = useState<string>()
  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {
    fetchEmpl()
  }, [])
  const fetchEmpl = () => {
    axios
      .get(`${constants.GET_EMPLOYEE}${id}`)
      .then((data) => setEmp(data.data))
      .catch((err) => setErr(err.message))
  }
  const updateEmp = (event: any) => {
    event.preventDefault()

    const employee = {
      employee_name: employee_name || Emp.employee_name,
      employee_salary: employee_salary || Emp.employee_salary,
      employee_age: employee_age || Emp.employee_age
    }
    axios
      .put(`${constants.UPDATE_EMPLOYEE}/${id}`, employee)
      .then((data) => {
        console.log(data.data)
        navigate('/')
      })
      .catch((err) => console.log(err.message))
  }
  return (
    <div>
      {Err ? (
        Err === 'Request failed with status code 404' ? (
          <div>Employ not found</div>
        ) : (
          <div>Something went wrong</div>
        )
      ) : (
        <>
          {Emp && (
            <div className="border border-gray-50 rounded-xl p-20 shadow-xl ">
              <div className="flex justify-between">
                <h1 className="text-xl mr-10">{Emp.employee.employee_name}</h1>
                <FaUserCircle size={30} />
              </div>
              id: {Emp.employee.id}
              <br />
              employee_salary: {Emp.employee.employee_salary}
              <br />
              employee_age: {Emp.employee.employee_age}
            </div>
          )}
          <form
            onSubmit={updateEmp}
            className="border border-gray-50 rounded-xl p-20 shadow-xl"
          >
            Change details
            <br />
            <label htmlFor="name">Enter new name</label>
            <br />
            <input
              type="text"
              className="rounded-full"
              id="name"
              onChange={(e) => setEmployee_name(e.target.value)}
            />
            <br />
            <label htmlFor="salary">Enter new salary</label>
            <br />
            <input
              type="number"
              id="salary"
              className="rounded-full"
              onChange={(e) => setEmployee_salary(e.target.value)}
            />
            <br />
            <label htmlFor="age">Enter new age</label>
            <br />
            <input
              type="number"
              className="rounded-full"
              id="age"
              onChange={(e) => setEmployee_age(e.target.value)}
            />
            <br />
            <br />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 px-10 py-2 mt-10 text-white rounded-full"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Update
