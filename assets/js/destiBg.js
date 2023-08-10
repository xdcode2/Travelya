// Full Background Slider
function DestinationBg({ id, title, image }) {
    return `
        <div class="destination-bg" data-id="${id}">
            <img src="${image}" alt="${title}" />
        </div>
    `;
}

export default DestinationBg;
