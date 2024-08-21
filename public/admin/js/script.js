//Stastus
const buttonStatus = document.querySelectorAll("[button-status]")
 if(buttonStatus.length > 0) {
  let url = new URL(window.location.href)// có thể chỉnh sửa được các phần tử của URL
  buttonStatus.forEach(item => {
    item.addEventListener('click', () => {
      const status = item.getAttribute('button-status')//lấy trạng thái
      if(status) {
        url.searchParams.set('status', status)//sửa status trong url thành trạng thái tương ứng
      } else {
        url.searchParams.delete('status')//nếu ko có gì thì xóa status trên url
      }
      window.location.href = url.href//gán đường dẫn mới cho window để chạy đường dẫn đó
    })
  })
 }
// End status

//Form search
const formSearch = document.querySelector('#form-search')
if(formSearch) {
  let url = new URL(window.location.href)
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    const keyword = e.target.elements.keyword.value
    if(keyword) {
      url.searchParams.set('keyword', keyword)//sửa status trong url thành trạng thái tương ứng
    } else {
      url.searchParams.delete('keyword')//nếu ko có gì thì xóa status trên url
    }
    window.location.href = url.href//gán đường dẫn mới cho window để chạy đường dẫn đó
  })
}
//End form search

//Pagination
  const pagination = document.querySelectorAll("[page]")
  if(pagination) {
    const url = new URL(window.location.href)
    pagination.forEach((item) => {
      item.addEventListener('click', () => {
        const page = item.getAttribute("page")
        if(page) {
          url.searchParams.set('page', page)
        }
        window.location.href = url.href
      })
    })
  }
//End pagination

// Change Multi
const submitChangeStatus = document.querySelector("[form-change-multi]")
if(submitChangeStatus) {
  const checkAll = document.querySelector('[name="checkall"]')
  const inputId = document.querySelectorAll('[name="id"]')
  let arrId = []
  if(checkAll) {
    checkAll.addEventListener('click', () => {
      arrId = []
      if(checkAll.checked) {
        inputId.forEach(item => {
          item.checked = true
          arrId.push(item.value)
        })
      } else {
        inputId.forEach(item => {
          item.checked = false
        })
      }
    })
  }
  
  if(inputId) {
    inputId.forEach(item => {
      item.addEventListener("click", () => {
        if(item.checked) {
          arrId.push(item.value)
        } else {
          arrId = arrId.filter(i => i !== item.value)
        }
        let countChecked = 0;
        inputId.forEach(i => {
          countChecked += i.checked == true ? 1 : 0 
        })
        if(countChecked === 4) {
          checkAll.checked = true
        } else {
          checkAll.checked = false
        }
      })
    })
  }
  
  submitChangeStatus.addEventListener("submit", (e) => {
    if(arrId.length !== 0) {
      if(e.target.elements.type.value == "delete-all") {
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa các bản ghi này?")
        if(!isConfirm) {
          return;
        }
      }
      if(e.target.elements.type.value == "change-position") {
        let arrPosition = []
        inputId.forEach(item => {
          if(item.checked == true) {
            let position = item.closest("tr").querySelector('[name="position"]').value 
            arrPosition.push(`${item.value}-${position}`)
          }
        })
        document.querySelector('[name="ids"]').value = arrPosition.join(',')
        return;
      }
      const nameId = document.querySelector('[name="ids"]')
      nameId.value = arrId.join(',')
    } else {
      e.preventDefault()
      alert("Vui lòng chọn ít nhất một mục")
    }
    
  })
}
// End Change Multi

//Show alert(vd: như cập nhật thành công sản phẩm á=))
const showAlert = document.querySelector(".style-alert")
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"))
  const turnoffAlert = document.querySelector(".turnoff-alert")
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time)
  turnoffAlert.addEventListener('click', () => {
    showAlert.classList.add("alert-hidden")
  })
}
//End show alert

//Preview image before it is uploads
const uploadsImage = document.querySelector("[uploads-image]")
if(uploadsImage) {
  const uploadsImageInput = document.querySelector("[uploads-image-input]")
  const uploadsImagePreview = document.querySelector("[uploads-image-preview]")
  uploadsImageInput.addEventListener('change', (e) => {
    const [file] = uploadsImageInput.files//[file] = e.target.files
    //cách viết khác: const file = e.target.files[0]
    if(file) {
      uploadsImagePreview.src = URL.createObjectURL(file)
      //hiển thị kèm dấu nhân để tắt ảnh nếu ko chọn ảnh ấy
      const turnoffImagePreview = document.querySelector("[turnoff-image-preview]")
      turnoffImagePreview.classList.remove("hidden")
      turnoffImagePreview.addEventListener('click', () => {
        uploadsImagePreview.src = ""
        uploadsImageInput.value = ""
        turnoffImagePreview.classList.add("hidden")
      })
    }
  })
}

//End preview image before it is uploads