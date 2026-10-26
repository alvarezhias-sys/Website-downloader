document.addEventListener("DOMContentLoaded", function () {
    const platformButtons = document.querySelectorAll("[data-platform]");
    const videoUrl = document.getElementById("videoUrl");
    const quality = document.getElementById("quality");
    const downloadForm = document.getElementById("downloadForm");
    const status = document.getElementById("status");

    let selectedPlatform = "tiktok";

    // Pilih platform
    platformButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedPlatform = button.dataset.platform;

            platformButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (selectedPlatform === "tiktok") {
                videoUrl.placeholder = "Tempel link TikTok di sini...";
            } else {
                videoUrl.placeholder = "Tempel link Instagram di sini...";
            }

            status.textContent = "";
        });
    });

    // Periksa link
    downloadForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const url = videoUrl.value.trim();
        const selectedQuality = quality.value;

        if (url === "") {
            status.textContent = "Masukkan link terlebih dahulu!";
            return;
        }

        let parsedUrl;

        try {
            parsedUrl = new URL(url);
        } catch (error) {
            status.textContent = "Link tidak valid!";
            return;
        }

        const hostname = parsedUrl.hostname.toLowerCase();
        let validPlatform = false;

        if (selectedPlatform === "tiktok") {
            validPlatform =
                hostname === "tiktok.com" ||
                hostname.endsWith(".tiktok.com");
        } else {
            validPlatform =
                hostname === "instagram.com" ||
                hostname.endsWith(".instagram.com");
        }

        if (!validPlatform) {
            status.textContent = "Pilih platform yang sesuai dengan link!";
            return;
        }

        status.textContent =
            "Link valid! Kualitas: " + selectedQuality +
            ". Fitur unduh perlu dihubungkan ke API.";
    });
});