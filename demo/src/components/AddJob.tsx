import React, { useReducer, useState } from 'react'

interface AddTodo{
  handleChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
  addTodo:()=>void
  inputValue:string
}

export default function AddJob({handleChange,addTodo,inputValue}:AddTodo) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };
  return (
    <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit}>
      <div className="form-outline flex-fill">
        <input onChange={handleChange} type="text" id="form2" className="form-control"  value={inputValue}/>
        <label className="form-label" htmlFor="form2">
          Nhập tên công việc
        </label>
      </div>
      <button type="submit" className="btn btn-info ms-2">
        Thêm
      </button>
    </form>
  )
}
