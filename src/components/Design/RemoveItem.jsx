import React from 'react'

function RemoveItem() {
  return (
    <>
      <button
        // onClick={() => { document.getElementById(`RemoveCategory${id}`).showModal(); }}
        className="btn btn-sm">
        <i className="bi bi-trash"></i>
      </button>
    </>
  )
}

export default RemoveItem