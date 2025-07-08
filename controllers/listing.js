const Listing = require("../models/listing.js");
const mapToken = process.env.MAP_TOKEN;

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let { title, description, image, location, price, country } = req.body;

  // Geocode the location
  const placeName = `${location}, ${country}`;
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const geoRes = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(placeName)}.json?key=${process.env.MAP_TOKEN}`
  );
  const geoData = await geoRes.json();
  let coordinates = [85.5013, 26.5887]; // fallback coordinates
  if (geoData.features && geoData.features.length > 0) {
    coordinates = geoData.features[0].center;
  }

  let newListing = new Listing({
    title,
    description,
    image: { url, filename },
    location,
    price: Number(price),
    country,
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
  });
  newListing.owner = req.user._id;
  await newListing.save();
  console.log(newListing);
  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImage });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let { title, description, location, price, country } = req.body;

  // Geocode the updated location
  const placeName = `${location}, ${country}`;
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const geoRes = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(placeName)}.json?key=${process.env.MAP_TOKEN}`
  );
  const geoData = await geoRes.json();
  let coordinates = [85.5013, 26.5887]; // fallback coordinates
  if (geoData.features && geoData.features.length > 0) {
    coordinates = geoData.features[0].center;
  }

  let updatedListing = await Listing.findByIdAndUpdate(id, {
    title,
    description,
    location,
    price: Number(price),
    country,
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
  }
  await updatedListing.save();

  req.flash("success", "Successfully updated listing");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted listing");
  res.redirect("/listings");
};