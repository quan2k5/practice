import React, { useEffect, useReducer, useState } from 'react';
import AddJob from './AddJob';
import TabNav from './TabNav';
import ListJob from './ListJob';
import { v4 as uuidv4 } from 'uuid';

// Định nghĩa interface Todo để quản lý kiểu dữ liệu của công việc
interface Todo {
  id: string;
  name: string;
  state: boolean;
}

// Định nghĩa interface State để quản lý kiểu dữ liệu của state
interface State {
  todos: Todo[];
  isLoading: boolean;
  todo: Todo;
}

// Khởi tạo state ban đầu
const initial: State = {
  todos: [], // Mảng các công việc
  isLoading: false, // Trạng thái tải
  todo: {
    id: uuidv4(), // ID của công việc hiện tại
    name: "", // Tên công việc hiện tại
    state: false, // Trạng thái của công việc hiện tại
  },
};

// Định nghĩa hàm reducer để xử lý các hành động và cập nhật state
const reducer = (state: State, action: { type: string; payload: any }): State => {
  switch (action.type) {
    case "CHANGE_INPUT":
      // Cập nhật giá trị name của công việc hiện tại
      return { ...state, todo: { ...state.todo, name: action.payload } };
    case "ADD_TODO":
      // Thêm công việc mới vào danh sách todos và reset name của công việc hiện tại
      return {
        ...state,
        todos: [
          ...state.todos,
          { ...action.payload, id: uuidv4() }
        ],
        todo: { ...state.todo, name: "" },
      };
    case "DELETE_TODO":
      // Xóa công việc khỏi danh sách todos
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, state: !todo.state } : todo
        ),
      };
    case "SET_TODOS":
      // Thiết lập lại todos từ local storage
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default function TodoList() {
  // Biến check valueInput
  const [checkValue, setCheckValue] = useState<boolean>(false);
  // Khai báo state và dispatch từ useReducer
  const [state, dispatch] = useReducer(reducer, initial);

  // Khai báo giá trị của input
  const [inputValue, setInputValue] = useState<string>("");

  // Khởi tạo từ local storage
  useEffect(() => {
    const jobLocal = localStorage.getItem("jobs");
    if (jobLocal) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(jobLocal) });
    }
  }, []);

  // Lưu vào local storage khi todos thay đổi
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(state.todos));
  }, [state.todos]);

  // Hàm xử lý khi thay đổi giá trị của input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value); // Lấy giá trị từ input
    dispatch({ type: "CHANGE_INPUT", payload: e.target.value }); // Dispatch hành động CHANGE_INPUT
  };

  // Hàm thêm công việc mới
  const addTodo = (): void => {
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", payload: { ...state.todo, name: inputValue } });
      setInputValue(""); // Reset input value
      setCheckValue(false);
    } else {
      setCheckValue(true);
    }
  };

  // Hàm xóa công việc
  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id }); // Dispatch hành động DELETE_TODO
  };

  // Hàm chuyển trạng thái công việc
  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id }); // Dispatch hành động TOGGLE_TODO
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  {/* Add job */}
                  <AddJob inputValue={inputValue} handleChange={handleChange} addTodo={addTodo}></AddJob>
                  {/* Tab Nav */}
                  <TabNav></TabNav>
                  {/* Tabs content */}
                  <ListJob toggleTodo={toggleTodo} todos={state.todos} deleteTodo={deleteTodo}></ListJob>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal cảnh báo lỗi */}
      {checkValue && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i onClick={() => setCheckValue(false)} className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-footer">
              <button onClick={() => setCheckValue(false)} className="btn btn-light">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
