// // utils/cloudinaryStorage.js


// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'global-projects',
//       resource_type: file.mimetype.startsWith('application') ? 'raw' : 'image',
//     };
//   },
// });

// module.exports = multer({ storage });



// utils/cloudinaryStorage.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary');
// const path = require('path');

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const ext = path.extname(file.originalname); // get .jpg, .png, .pdf
//     return {
//       folder: 'global-projects',
//       resource_type: file.mimetype.startsWith('application') ? 'raw' : 'image',
//          type: 'upload', // 👈 MAKE FILE PUBLIC
//       public_id: `${Date.now()}-${file.fieldname}${ext}`, // 👈 force extension
//     };
//   },
// });

// module.exports = multer({ storage });

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname).replace('.', '');
    const filename = `${Date.now()}-${file.fieldname}.${ext}`;

    return {
      folder: 'global-projects',
      resource_type: 'auto', // ✅ use auto instead of raw
      public_id: filename,
      type: 'upload',
      access_mode: 'public', // ✅ ensure public access
    };
  },
});

module.exports = multer({ storage });
