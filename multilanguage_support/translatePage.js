async function translateText(text, sourceLang, targetLang) {
    const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            format: "text"
        })
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error:", errorData);
        return text; // Fallback to original
    }

    const data = await response.json();
    return data.translatedText;
}

async function translatePage() {
    const targetLang = document.getElementById("languageSelector").value;
    const elements = document.querySelectorAll("[data-translate]");

    for (let element of elements) {
        let originalText;

        // Handle input placeholders separately
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            originalText = element.getAttribute('data-original') || element.placeholder;
            if (!element.getAttribute('data-original')) {
                element.setAttribute('data-original', originalText);
            }
        } else {
            originalText = element.getAttribute('data-original') || element.innerText.trim();
            if (!element.getAttribute('data-original')) {
                element.setAttribute('data-original', originalText);
            }
        }

        if (!originalText) continue;  // Skip empty

        try {
            const translated = await translateText(originalText, "en", targetLang);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translated;
            } else {
                element.innerText = translated;
            }
        } catch (err) {
            console.error("Translation Error:", err);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("languageSelector").addEventListener("change", translatePage);
});
