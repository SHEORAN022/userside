const axios =
  require("axios");



// ======================================================
// UPLOAD TO BUNNY CDN
// ======================================================

const uploadToBunny =
  async (file) => {

    try {

      console.log(
        "FILE MIME =>",
        file.mimetype
      );



      // ==========================================
      // EXTENSION
      // ==========================================

      let ext = "jpg";



      if (
        file.mimetype.includes(
          "png"
        )
      ) {

        ext = "png";

      }



      if (
        file.mimetype.includes(
          "jpeg"
        )
      ) {

        ext = "jpeg";

      }



      if (
        file.mimetype.includes(
          "jpg"
        )
      ) {

        ext = "jpg";

      }



      // ==========================================
      // FILE NAME
      // ==========================================

      const fileName =
        `${Date.now()}.${ext}`;



      // ==========================================
      // STORAGE URL
      // ==========================================

      const url =
        `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/${fileName}`;



      console.log(
        "UPLOAD URL =>",
        url
      );



      // ==========================================
      // UPLOAD
      // ==========================================

      const response =
        await axios.put(

          url,

          file.buffer,

          {

            headers: {

              AccessKey:
                process.env.BUNNY_STORAGE_PASSWORD,

              "Content-Type":
                file.mimetype,

            },

            maxBodyLength:
              Infinity,

          }

        );



      console.log(
        "UPLOAD RESPONSE =>",
        response.status
      );



      // ==========================================
      // PUBLIC URL
      // ==========================================

      const fileUrl =
        `https://${process.env.BUNNY_CDN_HOSTNAME}/${fileName}`;



      console.log(
        "FILE URL =>",
        fileUrl
      );



      return {

        success: true,

        url:
          fileUrl,

      };

    } catch (error) {

      console.log(
        "BUNNY ERROR FULL =>",
        error.response?.data
      );

      console.log(
        "BUNNY ERROR MESSAGE =>",
        error.message
      );



      return {

        success: false,

        message:
          error.message,

      };

    }

  };

module.exports =
  uploadToBunny;