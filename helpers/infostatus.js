module.exports = (query) => {
  let infoButtons = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "unactive",
      class: ""
    }
  ]
  if(query.status) {
    const index = infoButtons.findIndex(item => item.status == query.status)
    infoButtons[index].class = "active"
  } else {
    const index = infoButtons.findIndex(item => item.status == "")
    infoButtons[index].class = "active"
  }
  return infoButtons;
}