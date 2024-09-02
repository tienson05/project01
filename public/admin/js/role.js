//Delete
const buttonDeletes = document.querySelectorAll("[delete-button-role]")
if(buttonDeletes) {
  buttonDeletes.forEach(item => {
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