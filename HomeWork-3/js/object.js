function stringToNum(priceString) {
  return parseInt(priceString.replace(" ", ""), 10);
}

class Dispatcher {
  constructor(view, data) {
    this.view = view;
    this.data = data;
  }

  updateView(event) {
    if (event !== undefined) {
      let sortType = event.target.id;
      if (sortType === "price") {
        if (this.data.sorted.priceAsc) this.data.sortByPriseDesc();
        else this.data.sortByPriseAsc();
      }
      if (sortType === "ratingReview") {
        if (this.data.sorted.reviewAsc) this.data.sortByRatingReviewDesc();
        else this.data.sortByRatingReviewAsc();
      }
    }
    this.view.updateView(this.data.getProductData());
  }
}


class Data {
  constructor(productData) {
    this.productData = this.copyAndReorganizeData(productData);
    this.sorted = {
      priceAsc: false,
      reviewAsc: false
    };
    this.sortByPriseAsc();
  }

  copyAndReorganizeData(data) {
    let reorganizedData = [];
    for (let i = 0; i < data.length; i++) {
      reorganizedData[i] = {};
      reorganizedData[i].name = data[i].name;
      reorganizedData[i].price = this.actualisePrise(data[i].price);
      reorganizedData[i].ratingReviews = data[i].ratingReviews;
    }
    return reorganizedData
  }
  actualisePrise(price) {
    if (typeof price === "object") {
      return price.newUan
    }
    return price
  }

  sortByPriseAsc() {
    this.productData.sort((prod1, prod2) => stringToNum(prod1.price) - stringToNum(prod2.price) );
    this.sorted.priceAsc = true;
    this.sorted.reviewAsc = false;
  }
  sortByPriseDesc() {
    this.productData.sort((prod1, prod2) => stringToNum(prod2.price) - stringToNum(prod1.price) );
    this.sorted.priceAsc = false;
    this.sorted.reviewAsc = false;
  }
  sortByRatingReviewAsc() {
    this.productData.sort((prod1, prod2) => stringToNum(prod1.ratingReviews) - stringToNum(prod2.ratingReviews) );
    this.sorted.priceAsc = false;
    this.sorted.reviewAsc = true;
  }
  sortByRatingReviewDesc() {
    this.productData.sort((prod1, prod2) => stringToNum(prod2.ratingReviews) - stringToNum(prod1.ratingReviews) );
    this.sorted.priceAsc = false;
    this.sorted.reviewAsc = false;
  }
  getProductData() { return this.productData }
}


class View {
  constructor(parent) {
    this.parent = document.getElementById(parent);
    this.tableBody = document.createElement("tbody");
  }
  createTableRow(dataRow) {
    let tableRow = document.createElement("tr");
    for (let cellDataKey in dataRow) {
      let cell = document.createElement("td");
      cell.innerText = dataRow[cellDataKey];
      tableRow.appendChild(cell);
    }
    return tableRow
  }
  createTableBody(data) {
    let tableBody = document.createElement("tbody");
    for (let dataRow of data) {
      let tableRow = this.createTableRow(dataRow);
      tableBody.appendChild(tableRow);
    }
    return tableBody
  }
  updateView(data) {
    this.tableBody.remove();
    this.tableBody = this.createTableBody(data);
    this.parent.appendChild(this.tableBody);
  }
}



let data = new Data(inputData);
let view = new View("products");
let dispatcher = new Dispatcher(view, data);
dispatcher.updateView();

let sort = document.getElementById("products-sort");
sort.addEventListener("click", (e) => dispatcher.updateView(e));