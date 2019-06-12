const Post = require("../models/Post");
const sharp = require("sharp");
const Path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },

  async store(req, res) {
    //const data = await Post.create(req.all);
    const { author, place, description, hastag } = req.body;
    const { filename: image } = req.file;
    const { name } = image.split(".");

    const filename = `${name}.jpg`;

    console.log(req.file);

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(Path.resolve(req.file.destination, "resized", filename));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hastag,
      filename
    });

    return res.json(post);
  }
};
