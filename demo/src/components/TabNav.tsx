import React from 'react'

export default function TabNav() {
  return (
    <div>
        {/* Tabs navs */}
        <ul className="nav nav-tabs mb-4 pb-2">
            <li className="nav-item" role="presentation">
              <a className="nav-link active">Tất cả</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link">Đã hoàn thành</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link">Chưa hoàn thành</a>
            </li>
        </ul>
        {/* Tabs navs */}
    </div>
  )
}
