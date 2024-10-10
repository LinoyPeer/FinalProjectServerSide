const fs = require('fs');

// יצירת תיקייה
const mkdirpath = './users/mongodb';

fs.mkdir(mkdirpath, { recursive: true }, (err) => {
    if (err) {
        console.error('שגיאה ביצירת התיקייה:', err);
    } else {
        console.log('התיקייה נוצרה בהצלחה!');
    }
});

// יצירת דף
const writeFilePath = './posts/moodels/mongodb/Post';

fs.writeFile(writeFilePath, content, (err) => {
    if (err) {
        console.error('שגיאה ביצירת הקובץ:', err);
    } else {
        console.log('הקובץ נוצר בהצלחה!');
    }
});

