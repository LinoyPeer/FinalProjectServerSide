const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidation");

// שינוי במודל Image: הוספת שדה 'path' לאחסון הנתיב המלא של התמונה
const Image = new mongoose.Schema({
    path: { type: String, required: true }, // שמירת הנתיב המלא של התמונה
    alt: DEFAULT_VALIDATION,
});

module.exports = Image;
