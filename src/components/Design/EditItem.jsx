import React from 'react'

function EditItem() {
  return (
    <>
        <button
        // onClick={() => { document.getElementById(`RemoveCategory${id}`).showModal(); }}
        className="btn btn-sm cursor-not-allowed">
        <i className="bi bi-pencil"></i>
      </button>
    </>
  )
}

export default EditItem