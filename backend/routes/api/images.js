// var express = require('express')
// const asyncHandler = require('express-async-handler');
// const fileUpload = require('express-fileupload');
// const app = express();
// const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')
// const { Event, Image} = require("../../db/models");
// const router = express.Router();

// router.use(fileUpload());


// var AWS = require('aws-sdk');


// router.post('/', singleMulterUpload('image'), asyncHandler(async (req, res) => {
//     console.log(req.files)
//   const imageUrl = await singlePublicFileUpload(req.files)
//   console.log('imageUrl')
//   const res1 = imageUrl.json()
//   console.log('res', res1)

// }))

// router.post('/', asyncHandler, async (req, res) => {
//     console.log('here'. answer)
//     AWS.config.update({
//         accessKeyId: "AKIAS4TSKLD6GNN4QOJN", // Access key ID
//         secretAccesskey: "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", // Secret access key
//         region: "us-east-1" //Region
//     })


//     const s3 = new AWS.S3();

//     // Binary data base64
//     const fileContent  = Buffer.from(req.files.uploadedFileName.data, 'binary');

//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: 'BUKET-NAME',
//         Key: "test.jpg", // File name you want to save as in S3
//         Body: fileContent 
//     };

//     // Uploading files to the bucket
//     const image = await s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         res.send({
//             "response_code": 200,
//             "response_message": "Success",
//             "response_data": data
//         });
//     });
//     const answer = image.json()
//     console.log('here'. answer)

// })
// module.exports = router