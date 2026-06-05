// // controllers/prescriptionController.js

// const Prescription =
//   require(
//     "../models/docsidePrescriptionModel"
//   );



// // =====================================================
// // USER - GET MY PRESCRIPTIONS
// // =====================================================

// exports.getMyPrescriptions =
//   async (req, res) => {

//     try {

//       // ================= CHECK USER =================

//       if (!req.user?._id) {

//         return res.status(401).json({

//           success: false,

//           message:
//             "User not authenticated",

//         });

//       }



//       // ================= FIND USER PRESCRIPTIONS =================

//       const prescriptions =
//         await Prescription.find({

//           userId:
//             req.user._id,

//         })

//           // DOCTOR DETAILS

//           .populate({

//             path: "doctorId",

//             select:
//               "name email speciality image",

//           })

//           // APPOINTMENT DETAILS

//           .populate({

//             path:
//               "appointmentId",

//           })

//           // LATEST FIRST

//           .sort({

//             createdAt: -1,

//           });



//       // ================= RESPONSE =================

//       res.status(200).json({

//         success: true,

//         message:
//           "My prescriptions fetched successfully",

//         total:
//           prescriptions.length,

//         data:
//           prescriptions,

//       });

//     } catch (error) {

//       console.log(
//         "GET MY PRESCRIPTIONS ERROR:",
//         error
//       );

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



// // =====================================================
// // USER - GET SINGLE PRESCRIPTION
// // =====================================================

// exports.getSinglePrescription =
//   async (req, res) => {

//     try {

//       // ================= FIND PRESCRIPTION =================

//       const prescription =
//         await Prescription.findById(

//           req.params.id

//         )

//           .populate({

//             path: "doctorId",

//             select:
//               "name email speciality image",

//           })

//           .populate({

//             path:
//               "appointmentId",

//           });



//       // ================= NOT FOUND =================

//       if (!prescription) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Prescription not found",

//         });

//       }



//       // ================= SECURITY CHECK =================

//       if (

//         prescription.userId.toString() !==
//         req.user._id.toString()

//       ) {

//         return res.status(403).json({

//           success: false,

//           message:
//             "Access denied",

//         });

//       }



//       // ================= RESPONSE =================

//       res.status(200).json({

//         success: true,

//         data:
//           prescription,

//       });

//     } catch (error) {

//       console.log(
//         "GET SINGLE PRESCRIPTION ERROR:",
//         error
//       );

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



const Prescription =
  require(
    "../models/docsidePrescriptionModel"
  );



// =====================================================
// GET MY PRESCRIPTIONS
// =====================================================

exports.getMyPrescriptions =
  async (req, res) => {

    try {

      // ================= CHECK USER =================

      if (!req.user?._id) {

        return res.status(401).json({

          success: false,

          message:
            "User not authenticated",

        });

      }



      // ================= FIND USER PRESCRIPTIONS =================

      const prescriptions =
        await Prescription.find({

          userId:
            req.user._id,

        })

          .populate({

            path: "doctorId",

            select:
              "name email speciality image",

          })

          .populate({

            path:
              "appointmentId",

          })

          .sort({

            createdAt: -1,

          });



      // ================= RESPONSE =================

      res.status(200).json({

        success: true,

        message:
          "My prescriptions fetched successfully",

        total:
          prescriptions.length,

        data:
          prescriptions,

      });

    } catch (error) {

      console.log(
        "GET MY PRESCRIPTIONS ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };