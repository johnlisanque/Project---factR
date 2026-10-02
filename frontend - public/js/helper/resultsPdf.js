export function saveResultsPdf(element, filename) {
    if (!element || typeof window.html2pdf !== "function") {
        console.error("Unable to export quiz results: html2pdf is unavailable.");
        return;
    }

    return window.html2pdf()
        .set({
            margin: 0.4,
            filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        })
        .from(element)
        .save();
}