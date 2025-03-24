const axios = require('axios');
const fs = require('fs');

async function translateAndSave() {
    try {
        const response = await axios.post("http://127.0.0.1:5000/translate", {
            q: "Hello, how are you?",
            source: "en",
            target: "mr", // Marathi
            format: "text"
        });

        const marathiText = response.data.translatedText;
        console.log("Marathi Translation:", marathiText);

        // Save to file
        fs.writeFileSync('marathi_translation.txt', marathiText, 'utf8');
        console.log("Translation saved to marathi_translation.txt");
    } catch (error) {
        console.error("Error:", error);
    }
}

translateAndSave();
