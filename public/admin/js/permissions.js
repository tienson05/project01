//Permissions
const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]")
  buttonSubmit.addEventListener('click', () => {
    let permissions = []
    const rows = tablePermissions.querySelectorAll("[data-name]")
  
    rows.forEach(row => {
      const name = row.getAttribute("data-name")
      const inputs = row.querySelectorAll("input")
      if(name == "id") {
        inputs.forEach(input => {
          permissions.push({
            id: input.value,
            permissions: []
          })
        })
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked
          if(checked) {
            permissions[index].permissions.push(name)
          }
        })
      }
    })
    if(permissions.length > 0) {
      const formPermissions = document.querySelector("[form-permissions]")
      const input = formPermissions.querySelector("input[name='permissions']")
      input.value = JSON.stringify(permissions)
      formPermissions.submit()
    }
  })
}
//End permissions

//Permissions Data Default
const dataRecords = document.querySelector("[data-records]")
if(dataRecords) {
  const data = JSON.parse(dataRecords.getAttribute("data-records"))
  const tablePermissions = document.querySelector("[table-permissions]")
  data.forEach((item, index) => {
    const permissions = item.permissions
    permissions.forEach(permission => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`)
      row.querySelectorAll("input")[index].checked = true
    })
  })
}
//End Permissions Data Default