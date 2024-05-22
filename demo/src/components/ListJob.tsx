import React, { useState } from 'react';

interface Todo {
  id: string;
  name: string;
  state: boolean;
}

interface ListJobProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export default function ListJob({ todos, deleteTodo, toggleTodo }: ListJobProps) {
  // Trạng thái cho modal xác nhận xóa
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  // Hiển thị modal xác nhận xóa
  const confirmDelete = (id: string) => {
    setTodoToDelete(id);
  };

  // Xác nhận xóa công việc
  const handleDelete = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete);
      setTodoToDelete(null);
    }
  };

  return (
    <>
      <div className="tab-content" id="ex1-content">
        <div className="tab-pane fade show active">
          <ul className="list-group mb-0">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                style={{ backgroundColor: "#f4f6f7" }}
              >
                <div>
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={todo.state}
                    onChange={() => toggleTodo(todo.id)}
                    readOnly
                  />
                  {todo.state ? <s>{todo.name}</s> : <span>{todo.name}</span>}
                </div>
                <div className="d-flex gap-3">
                  <i className="fas fa-pen-to-square text-warning" />
                  <i
                    className="far fa-trash-can text-danger"
                    onClick={() => confirmDelete(todo.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {todoToDelete && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i className="fas fa-xmark" onClick={() => setTodoToDelete(null)} style={{ cursor: 'pointer' }} />
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button className="btn btn-light" onClick={() => setTodoToDelete(null)}>Hủy</button>
              <button className="btn btn-danger" onClick={handleDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
