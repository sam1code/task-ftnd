import axios from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import constants from '../constants'
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Main(): ReactElement {
  const [employees, setEmployees] = useState<any>()
  const [options, setOptions] = useState(false)
  useEffect(() => {
    fetchThis()
  }, [])

  const fetchThis = () => {
    axios
      .get(constants.GET_EMPLOYEES)
      .then((data) => {
        setEmployees(data.data)
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  const empdel = (id: number) => {
    axios
      .delete(`${constants.DELETE_EMPLOYEE}/${id}`)
      .then(() => {
        fetchThis()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Link
        to={'/add'}
        className="my-10 bg-blue-600 hover:bg-blue-800 fixed top-0 right-0 text-white px-10 py-3"
      >
        Add employ
      </Link>
      <div className="top-0 absolute grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 left-0 ">
        {employees &&
          employees.map(
            (
              { employee_name, id, employee_salary, employee_age, _id },
              ind
            ) => {
              return (
                <div
                  className="border border-gray-50 rounded-xl p-20 shadow-xl "
                  onMouseEnter={() => setOptions(true)}
                  onMouseLeave={() => setOptions(false)}
                  key={ind}
                >
                  {options && (
                    <div className="relative mb-10">
                      <div
                        className="absolute top-0 right-0 cursor-pointer"
                        onClick={() => empdel(_id)}
                      >
                        <MdOutlineDelete size={30} />
                      </div>
                      <Link
                        to={`/${_id}`}
                        className="absolute top-0 right-10 cursor-pointer"
                      >
                        <FiEdit3 size={30} />
                      </Link>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <h1 className="text-xl mr-10">{employee_name}</h1>
                    <FaUserCircle size={30} />
                  </div>
                  id: {id}
                  <br />
                  employee_salary: {employee_salary}
                  <br />
                  employee_age: {employee_age}
                </div>
              )
            }
          )}
      </div>
    </div>
  )
}

export default Main
