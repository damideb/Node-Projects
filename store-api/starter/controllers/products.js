const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if(numericFilters){
    const operatorMap={
        '>': '$gt', // greater than
        '>=': '$gte',
        '<': '$lt',
        '<=': '$lte',
        '=':'$eq'
    };
     const regEx = /\b(<|>|>=|=|<|<=)\b/g;
     let filters = numericFilters.replace(
       regEx,
       (match) => `-${operatorMap[match]}-`
     );
     const options = ["price", "rating"];
     filters = filters.split(",").forEach((item) => {
       const [field, operator, value] = item.split("-");
       if (options.includes(field)) {
         queryObject[field] = { [operator]: Number(value) };
       }
     });
  }
  let result = Product.find(queryObject);

  // to sort the list by whatever property is provided in the params. negative value sort in descending ordder
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    // to show only the fields specified by the user
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit); // skips the first set of items by the number specified and limit the result to the limit number
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = getAllProducts;
