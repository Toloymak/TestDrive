const fs = require("fs");

function addService(alldata, newData) {
  newData.id = alldata.length;
  alldata.push(newData);
  updateData(alldata);
  return alldata;
}

function deleteService(alldata, id) {
  const filteredElement = alldata.filter(item => item.id !== id);
  const data = filteredElement.map((item, index) => {return {...item, id: index}});
  updateData(data);
  return data;
}

function updateService(alldata, newData) {
  const data = alldata.map(item => {
    if (item.id === newData.id) {
      return {...newData}
    }
    return item;
  });
  updateData(data);
  return data;
}

function updateData(newData) {
  fs.writeFileSync("./server/data.json", JSON.stringify(newData));
}


module.exports = {
  addService: addService,
  deleteService: deleteService,
  updateService: updateService
};