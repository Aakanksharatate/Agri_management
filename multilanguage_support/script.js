async function translateText(text, sourceLang, targetLang) {
    try {
        const response = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: "text"
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response:", errorText);
            throw new Error("Translation failed with status " + response.status);
        }

        const data = await response.json();
        console.log("Translated Text:", data.translatedText);
        return data.translatedText;
    } catch (error) {
        console.error("Translation Error:", error);
        return text;
    }
}
