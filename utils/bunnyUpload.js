const axios = require("axios");
const fs = require("fs");

const uploadToBunny = async (file) => {

  const fileName = `${Date.now()}-${file.originalname}`;

  const url = `${process.env.BUNNY_STORAGE}/${fileName}`;

  const response = await axios.put(
    url,
    fs.readFileSync(file.path),
    {
      headers: {
        AccessKey: process.env.BUNNY_API_KEY,
        "Content-Type": file.mimetype,
      },
    }
  );

  return {
    url: `${process.env.BUNNY_PULL_ZONE}/${fileName}`,
    publicId: fileName,
  };
};

module.exports = {
  uploadToBunny,
};