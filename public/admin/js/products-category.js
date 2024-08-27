const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus) {
  const formChangeStatus = document.querySelector("#form-change-status")
  buttonChangeStatus.forEach(item => {
    item.addEventListener('click', () => {
      const currentStatus = item.getAttribute("status")
      const id = item.getAttribute("id")

      let changeStatus = currentStatus == "active" ? "unactive" : "active"
      const path = formChangeStatus.getAttribute("path")
      formChangeStatus.action = path + `/${changeStatus}/${id}?_method=PATCH`
      formChangeStatus.submit()
    })
  })
}

//Delete
const deleteButtons = document.querySelectorAll("[delete-button]")
if(deleteButtons) {
  deleteButtons.forEach(item => {
    item.addEventListener('click', () => {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?")
      if(isConfirm) {
        const id = item.getAttribute("data-id")
        const formDelete = document.querySelector("#form-delete")
        const path = formDelete.getAttribute("path")
        formDelete.action = path + `/${id}?_method=DELETE`
        formDelete.submit()
      }
    })
  })
}
//End delete